"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { apiGet, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

type Tree = {
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

export default function SubjectPage({ params }: { params: { subjectId: string } }) {
  const router = useRouter();
  const subjectId = useMemo(() => Number(params.subjectId), [params.subjectId]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tree, setTree] = useState<Tree | null>(null);

  useEffect(() => {
    if (!Number.isFinite(subjectId)) return;

    apiGet<{ tree: Tree }>(`/api/subjects/${subjectId}/tree`)
      .then((data) => setTree(data.tree))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.push(`/auth/login?next=${encodeURIComponent(`/subjects/${subjectId}`)}`);
          return;
        }
        setError("Failed to load curriculum. Try logging in again.");
      })
      .finally(() => setLoading(false));
  }, [subjectId, router]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-950">Curriculum</h1>
          <p className="mt-1 text-sm text-zinc-600">Complete lessons to unlock the next ones.</p>
        </div>
        <Link href="/subjects">
          <Button variant="secondary">Back to subjects</Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-5">
          <Skeleton className="h-[520px]" />
          <Skeleton className="h-[520px]" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 text-red-800 p-4 text-sm">{error}</div>
      ) : !tree ? null : (
        <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-5">
          <aside className="rounded-xl border border-zinc-200 bg-white shadow-sm p-4 lg:sticky lg:top-20 self-start">
            <div className="space-y-5">
              {tree.sections.map((section) => (
                <div key={section.id}>
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">
                    {section.title}
                  </div>
                  <div className="space-y-1">
                    {section.videos.map((v) => {
                      const itemLocked = v.locked;
                      return (
                        <Link
                          key={v.id}
                          href={`/subjects/${subjectId}/video/${v.id}`}
                          className={[
                            "block rounded-lg border px-3 py-2.5 text-sm transition-colors",
                            itemLocked
                              ? "border-zinc-200 bg-zinc-50 text-zinc-500"
                              : "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300",
                            v.isCompleted ? "border-[#a435f0]/30 bg-[#a435f0]/5" : "",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="font-medium">{v.title}</div>
                            <div className={`text-xs font-medium ${v.isCompleted ? "text-[#a435f0]" : "text-zinc-500"}`}>
                              {v.isCompleted ? "✓ Done" : itemLocked ? "Locked" : "Start"}
                            </div>
                          </div>
                          {itemLocked && v.unlockReason ? (
                            <div className="mt-1 text-xs text-zinc-500">Hint: {v.unlockReason}</div>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className="rounded-xl border border-zinc-200 bg-white shadow-sm p-6 min-h-[520px]">
            <div className="text-sm text-zinc-600">
              Select a lesson from the sidebar to start learning.
            </div>
            <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-sm font-semibold text-zinc-950">How unlocking works</div>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                Each video is locked until you complete the previous one in the global order
                (sections sorted, then videos sorted). Your watch progress is stored per video.
              </p>
              <div className="mt-4 text-xs text-zinc-500">This MVP uses the demo curriculum for testing.</div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

