"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { apiGet, ApiError } from "@/lib/api";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

type Subject = { id: number; title: string };
type Progress = { totalVideos: number; completedVideos: number; isCompleted: boolean };

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<
    Array<Subject & { progress: Progress }>
  >([]);

  useEffect(() => {
    async function run() {
      try {
        const subjectsData = await apiGet<{ subjects: Subject[] }>(`/api/subjects?page=1&pageSize=50`);
        const subjects = subjectsData.subjects;

        const progressRows = await Promise.all(
          subjects.map(async (s) => {
            const p = await apiGet<Progress>(`/api/progress/subjects/${s.id}`);
            return { ...s, progress: p };
          })
        );
        setRows(progressRows);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          router.push("/auth/login");
          return;
        }
        setError("Failed to load profile progress.");
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [router]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-950">Profile</h1>
          <p className="mt-1 text-sm text-zinc-600">Your progress across subjects.</p>
        </div>
        <Link href="/subjects">
          <Button variant="secondary">Browse subjects</Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      ) : error ? (
        <Alert>{error}</Alert>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          No progress yet. Start a video from a subject.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map((r) => {
            const { totalVideos, completedVideos, isCompleted } = r.progress;
            const pct = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
            return (
              <div key={r.id} className="rounded-xl border border-zinc-200 bg-white shadow-sm p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-zinc-600">Subject</div>
                    <div className="mt-1 text-lg font-semibold text-zinc-950">{r.title}</div>
                  </div>
                  <div className="text-xs rounded-full px-3 py-1 border border-zinc-200 bg-zinc-50 text-zinc-700">
                    {isCompleted ? "Completed" : `${pct}%`}
                  </div>
                </div>

                <div className="mt-3 text-sm text-zinc-600">
                  Completed {completedVideos} of {totalVideos} videos
                </div>

                <div className="mt-4">
                  <Link href={`/subjects/${r.id}`}>
                    <Button className="w-full">Continue</Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

