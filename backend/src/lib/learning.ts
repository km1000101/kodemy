import { prisma } from "./prisma";

export type SubjectTreeResponse = {
  subjectId: number;
  sections: Array<{
    id: number;
    title: string;
    orderIndex: number;
    videos: Array<{
      id: number;
      title: string;
      orderIndex: number;
      locked: boolean;
      unlockReason: string | null;
      isCompleted: boolean;
    }>;
  }>;
};

export type VideoPageResponse = {
  id: number;
  title: string;
  description: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  sectionId: number;
  sectionTitle: string;
  subjectId: number;
  durationSeconds: number | null;

  locked: boolean;
  unlockReason: string | null;

  previousVideoId: number | null;
  nextVideoId: number | null;
  isCompleted: boolean;
  lastPositionSeconds: number;
};

type FlattenedVideo = {
  videoId: number;
  title: string;
  description: string;
  youtubeVideoId: string;
  orderIndex: number;
  durationSeconds: number | null;
  sectionId: number;
  sectionTitle: string;
};

export async function buildSubjectTree(subjectId: number, userId: number): Promise<SubjectTreeResponse> {
  const sections = await prisma.section.findMany({
    where: { subjectId },
    orderBy: { orderIndex: "asc" },
    select: {
      id: true,
      title: true,
      orderIndex: true,
      videos: {
        orderBy: { orderIndex: "asc" },
        select: {
          id: true,
          title: true,
          orderIndex: true,
          description: true,
          youtubeVideoId: true,
          durationSeconds: true,
        },
      },
    },
  });

  const flattened: FlattenedVideo[] = [];
  for (const s of sections) {
    for (const v of s.videos) {
      flattened.push({
        videoId: v.id,
        title: v.title,
        description: v.description,
        youtubeVideoId: v.youtubeVideoId,
        orderIndex: v.orderIndex,
        durationSeconds: v.durationSeconds,
        sectionId: s.id,
        sectionTitle: s.title,
      });
    }
  }

  const videoIds = flattened.map((v) => v.videoId);
  const progressRows = await prisma.videoProgress.findMany({
    where: { userId, videoId: { in: videoIds.length ? videoIds : [0] } },
    select: { videoId: true, lastPositionSeconds: true, isCompleted: true, completedAt: true },
  });

  const progressMap = new Map<number, { lastPositionSeconds: number; isCompleted: boolean }>(
    progressRows.map((r) => [r.videoId, { lastPositionSeconds: r.lastPositionSeconds, isCompleted: r.isCompleted }])
  );

  function computeLocked(index: number) {
    if (index === 0) {
      return { locked: false, unlockReason: null as string | null };
    }
    const prereq = flattened[index - 1];
    const prereqCompleted = progressMap.get(prereq.videoId)?.isCompleted === true;
    if (prereqCompleted) return { locked: false, unlockReason: null as string | null };
    return {
      locked: true,
      unlockReason: `Complete previous video: "${prereq.title}"`,
    };
  }

  // Build per-section shape in the same order.
  let globalIndex = 0;
  const responseSections = sections.map((s) => {
    const responseVideos = s.videos.map((v) => {
      const idx = globalIndex++;
      const lockedState = computeLocked(idx);
      const isCompleted = progressMap.get(v.id)?.isCompleted === true;
      return {
        id: v.id,
        title: v.title,
        orderIndex: v.orderIndex,
        locked: lockedState.locked,
        unlockReason: lockedState.unlockReason,
        isCompleted,
      };
    });
    return { id: s.id, title: s.title, orderIndex: s.orderIndex, videos: responseVideos };
  });

  return { subjectId, sections: responseSections };
}

export async function buildVideoPage(videoId: number, userId: number): Promise<VideoPageResponse> {
  const video = await prisma.video.findUnique({
    where: { id: videoId },
    select: {
      id: true,
      title: true,
      description: true,
      youtubeVideoId: true,
      orderIndex: true,
      durationSeconds: true,
      sectionId: true,
      section: { select: { title: true, subjectId: true } },
    },
  });

  if (!video) throw new Error("Not found");

  const subjectId = video.section.subjectId;

  const tree = await buildSubjectTree(subjectId, userId);
  const flattened: FlattenedVideo[] = [];
  for (const s of tree.sections) {
    for (const v of s.videos) {
      // Tree doesn’t include description/youtubeVideoId, so we re-fetch just for the flattened list.
      // Keep it simple for MVP: we’ll rely on a second query below.
      flattened.push({
        videoId: v.id,
        title: v.title,
        description: "", // placeholder, overwritten by second query
        youtubeVideoId: "", // placeholder
        orderIndex: v.orderIndex,
        durationSeconds: null,
        sectionId: s.id,
        sectionTitle: s.title,
      });
    }
  }

  // Fetch full fields for the subject’s videos (needed for response payload).
  const subjectVideos = await prisma.video.findMany({
    where: { section: { subjectId } },
    select: {
      id: true,
      title: true,
      description: true,
      youtubeVideoId: true,
      orderIndex: true,
      durationSeconds: true,
      sectionId: true,
      section: { select: { title: true } },
    },
  });

  // Deterministic ordering: sections.orderIndex asc, videos.orderIndex asc.
  const sectionsOrdered = await prisma.section.findMany({
    where: { subjectId },
    orderBy: { orderIndex: "asc" },
    select: { id: true, title: true, orderIndex: true, videos: { orderBy: { orderIndex: "asc" }, select: { id: true } } },
  });
  const sequenceIds: number[] = [];
  for (const s of sectionsOrdered) {
    for (const v of s.videos) sequenceIds.push(v.id);
  }

  const byId = new Map<number, typeof subjectVideos[number]>();
  for (const sv of subjectVideos) byId.set(sv.id, sv);

  const index = sequenceIds.indexOf(videoId);
  const previousVideoId = index > 0 ? sequenceIds[index - 1] : null;
  const nextVideoId = index >= 0 && index < sequenceIds.length - 1 ? sequenceIds[index + 1] : null;

  // Recompute lock based on prerequisite completion, using the same rule as buildSubjectTree.
  const progress = await prisma.videoProgress.findUnique({
    where: { userId_videoId: { userId, videoId } },
    select: { isCompleted: true, lastPositionSeconds: true },
  });

  const isCompleted = progress?.isCompleted === true;
  const lastPositionSeconds = progress?.lastPositionSeconds ?? 0;

  let locked = false;
  let unlockReason: string | null = null;
  if (index === 0) {
    locked = false;
  } else if (index > 0) {
    const prereqId = sequenceIds[index - 1];
    const prereqProgress = await prisma.videoProgress.findUnique({
      where: { userId_videoId: { userId, videoId: prereqId } },
      select: { isCompleted: true },
    });
    const prereqCompleted = prereqProgress?.isCompleted === true;
    locked = !prereqCompleted;
    unlockReason = prereqCompleted ? null : `Complete previous video: "${byId.get(prereqId)?.title ?? "previous video"}"`;
  }

  const full = byId.get(videoId)!;
  return {
    id: full.id,
    title: full.title,
    description: full.description,
    youtubeVideoId: full.youtubeVideoId,
    youtubeUrl: `https://www.youtube.com/watch?v=${full.youtubeVideoId}`,
    sectionId: full.sectionId,
    sectionTitle: full.section.title,
    subjectId,
    durationSeconds: full.durationSeconds ?? null,

    locked,
    unlockReason,

    previousVideoId,
    nextVideoId,
    isCompleted,
    lastPositionSeconds,
  };
}

