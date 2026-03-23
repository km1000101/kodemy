import { SubjectPageClient } from "./SubjectPageClient";

// GitHub Pages uses static export; we don't pre-render dynamic subject IDs there.
export const dynamicParams = false;
export async function generateStaticParams() {
  // Static export needs at least one path generated for dynamic routes.
  // This app fetches real data client-side, so we generate a minimal placeholder.
  return [{ subjectId: "1" }];
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subjectId: string }> | { subjectId: string };
}) {
  const p = await Promise.resolve(params);
  return <SubjectPageClient subjectId={p.subjectId} />;
}

