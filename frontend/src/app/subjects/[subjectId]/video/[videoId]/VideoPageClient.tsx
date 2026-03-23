"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import YouTube from "react-youtube";
import Link from "next/link";

import { apiGet, apiPost, ApiError } from "@/lib/api";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";

type Video = {
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

const YT_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

export function VideoPageClient({
  subjectId,
  videoId,
}: {
  subjectId: string;
  videoId: string;
}) {
  const router = useRouter();

  const [numericSubjectId, setSubjectId] = useState<number | null>(null);
  const [numericVideoId, setVideoId] = useState<number | null>(null);

  useEffect(() => {
    setSubjectId(Number(subjectId));
    setVideoId(Number(videoId));
  }, [subjectId, videoId]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [video, setVideo] = useState<Video | null>(null);

  const playerRef = useRef<unknown>(null);
  const intervalRef = useRef<number | null>(null);
  const lastWatchSentRef = useRef<number>(-1);

  async function sendProgress(seconds: number, isCompleted: boolean) {
    const rounded = Math.max(0, Math.floor(seconds));
    if (rounded === lastWatchSentRef.current && !isCompleted) return;
    lastWatchSentRef.current = rounded;
    await apiPost(`/api/progress/videos/${numericVideoId}`, {
      lastPositionSeconds: rounded,
      isCompleted,
    });
  }

  useEffect(() => {
    if (numericSubjectId == null || numericVideoId == null) return;

    apiGet<{ video: Video }>(`/api/videos/${numericVideoId}`)
      .then((data) => setVideo(data.video))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.push(
            `/auth/login?next=${encodeURIComponent(`/subjects/${numericSubjectId}/video/${numericVideoId}`)}`
          );
          return;
        }
        setError("Failed to load video.");
      })
      .finally(() => setLoading(false));
  }, [numericVideoId, router, numericSubjectId]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      const p = playerRef.current as { getCurrentTime?: () => unknown } | null;
      if (p?.getCurrentTime && typeof p.getCurrentTime === "function") {
        const t = p.getCurrentTime();
        if (typeof t === "number") sendProgress(t, false).catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericVideoId]);

  if (numericSubjectId == null || numericVideoId == null) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Skeleton className="h-[520px]" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-5">
          <Skeleton className="h-[520px]" />
          <Skeleton className="h-[520px]" />
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 text-red-800 p-4 text-sm">
          {error ?? "Video not found."}
        </div>
        <div className="mt-4">
          <Link href={`/subjects/${numericSubjectId}`}>
            <Button variant="secondary">Back to curriculum</Button>
          </Link>
        </div>
      </div>
    );
  }

  const startSeconds = video.lastPositionSeconds ? Math.max(0, video.lastPositionSeconds - 2) : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center gap-3 flex-wrap">
        <Link href={`/subjects/${numericSubjectId}`}>
          <Button variant="secondary">Back</Button>
        </Link>
        <div className="text-sm text-zinc-600">
          {video.sectionTitle} · Lesson {video.id}
        </div>
        {video.isCompleted ? (
          <div className="ml-auto text-xs font-medium rounded-full bg-[#a435f0]/10 text-[#a435f0] border border-[#a435f0]/30 px-3 py-1">
            ✓ Completed
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-5">
        <aside className="rounded-xl border border-zinc-200 bg-white shadow-sm p-4">
          <div className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Quick actions</div>
          <div className="mt-3 space-y-3">
            {video.previousVideoId ? (
              <Link href={`/subjects/${numericSubjectId}/video/${video.previousVideoId}`}>
                <Button variant="secondary" className="w-full">
                  Previous
                </Button>
              </Link>
            ) : (
              <div className="text-sm text-zinc-500">No previous lesson</div>
            )}

            {video.nextVideoId ? (
              <Link href={`/subjects/${numericSubjectId}/video/${video.nextVideoId}`}>
                <Button className="w-full">Next</Button>
              </Link>
            ) : (
              <div className="text-sm text-zinc-500">End of course</div>
            )}
          </div>

          <div className="mt-5 text-sm text-zinc-600">
            <div className="font-medium text-zinc-950">Resume</div>
            <div className="mt-1">
              Last watched: <span className="font-semibold">{video.lastPositionSeconds}s</span>
            </div>
          </div>
        </aside>

        <main className="rounded-xl border border-zinc-200 bg-white shadow-sm p-6 min-h-[520px]">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-xl font-semibold text-zinc-950">{video.title}</h2>
              {video.description ? <p className="mt-2 text-sm text-zinc-600">{video.description}</p> : null}
            </div>
            <div className="text-xs text-zinc-500">{video.durationSeconds ? `${video.durationSeconds}s` : "Duration unknown"}</div>
          </div>

          <div className="mt-5">
            {video.locked ? (
              <Alert variant="info">
                <div className="font-semibold text-sm text-zinc-900">Locked</div>
                <div className="mt-1 text-sm text-zinc-700">
                  {video.unlockReason ?? "Complete previous video to unlock this lesson."}
                </div>
              </Alert>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-zinc-200">
                <YouTube
                  videoId={video.youtubeVideoId}
                  key={`${video.id}-${startSeconds}`}
                  opts={{
                    width: "100%",
                    playerVars: {
                      start: startSeconds,
                      rel: 0,
                      modestbranding: 1,
                    },
                  }}
                  onReady={(event) => {
                    playerRef.current = event.target;
                    if (video.lastPositionSeconds) {
                      sendProgress(video.lastPositionSeconds, false).catch(() => {});
                    }
                  }}
                  onStateChange={(event) => {
                    if (!playerRef.current) playerRef.current = event.target;
                    const state = event.data;

                    const p = playerRef.current as { getCurrentTime?: () => unknown } | null;
                    const getTime = () => {
                      if (!p?.getCurrentTime || typeof p.getCurrentTime !== "function") return 0;
                      const t = p.getCurrentTime();
                      return typeof t === "number" ? t : 0;
                    };

                    if (state === YT_STATES.PLAYING) {
                      if (intervalRef.current) return;
                      intervalRef.current = window.setInterval(() => {
                        const t = getTime();
                        sendProgress(t, false).catch(() => {});
                      }, 5000);
                    }

                    if (state === YT_STATES.PAUSED) {
                      if (intervalRef.current) window.clearInterval(intervalRef.current);
                      intervalRef.current = null;
                      const t = getTime();
                      sendProgress(t, false).catch(() => {});
                    }

                    if (state === YT_STATES.ENDED) {
                      if (intervalRef.current) window.clearInterval(intervalRef.current);
                      intervalRef.current = null;
                      const t = getTime();
                      sendProgress(t, true)
                        .then(() => setVideo((v) => (v ? { ...v, isCompleted: true } : v)))
                        .catch(() => {});
                    }
                  }}
                />
              </div>
            )}

            {video.locked ? null : (
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-600">
                <Spinner />
                Progress will be saved every few seconds.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

