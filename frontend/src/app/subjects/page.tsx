"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { apiGet, ApiError } from "@/lib/api";
import { Skeleton } from "@/components/ui/Skeleton";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const COURSE_IMAGES = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=225&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=225&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
];

type Subject = {
  id: number;
  title: string;
  slug: string;
  description: string;
  isPublished: boolean;
};

export default function SubjectsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    apiGet<{ subjects: Subject[] }>(`/api/subjects?page=1&pageSize=50`)
      .then((data) => setSubjects(data.subjects))
      .catch((err) => {
        if (err instanceof ApiError) setError(err.status === 401 ? "Please login." : err.message);
        else setError("Failed to load subjects.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <AnimateOnScroll variant="fade-up" className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">A broad selection of courses</h1>
        <p className="mt-1 text-sm text-zinc-600">Choose a course to start learning. Complete lessons in order to unlock the next ones.</p>
      </AnimateOnScroll>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 text-red-800 p-4 text-sm">{error}</div>
      ) : subjects.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-sm text-zinc-600">
          No courses found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((s, i) => (
            <AnimateOnScroll key={s.id} variant="fade-up" delay={i * 50}>
            <Link href={`/subjects/${s.id}`} className="group block">
              <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden hover:shadow-lg hover:border-[#a435f0]/30 hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-36 overflow-hidden bg-zinc-100">
                  <Image
                    src={COURSE_IMAGES[i % COURSE_IMAGES.length]}
                    alt={s.title}
                    width={400}
                    height={225}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-md bg-amber-500/90 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                    <span>★</span> Bestseller
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-zinc-900 group-hover:text-[#a435f0] transition-colors">{s.title}</h2>
                  <p className="mt-1.5 text-sm text-zinc-600 line-clamp-2">{s.description}</p>
                  <div className="mt-3 text-sm font-medium text-[#a435f0] group-hover:gap-2 flex items-center gap-1 transition-all">
                    View curriculum <span className="group-hover:translate-x-0.5 inline-block transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
            </AnimateOnScroll>
          ))}
        </div>
      )}
    </div>
  );
}

