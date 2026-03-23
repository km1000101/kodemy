"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

type Variant = "fade-up" | "fade-in" | "scale-in";

export function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base = "transition-all duration-700 ease-out";
  const variants = {
    "fade-up": visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    "fade-in": visible ? "opacity-100" : "opacity-0",
    "scale-in": visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
  };

  return (
    <div
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
