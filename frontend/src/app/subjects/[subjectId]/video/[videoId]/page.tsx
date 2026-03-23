import { VideoPageClient } from "./VideoPageClient";

// GitHub Pages uses static export; we don't pre-render dynamic video IDs there.
export const dynamicParams = false;
export async function generateStaticParams() {
  // Static export needs at least one path generated for dynamic routes.
  // This app fetches real data client-side, so we generate a minimal placeholder.
  return [{ subjectId: "1", videoId: "1" }];
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ subjectId: string; videoId: string }> | { subjectId: string; videoId: string };
}) {
  const p = await Promise.resolve(params);
  return <VideoPageClient subjectId={p.subjectId} videoId={p.videoId} />;
}

