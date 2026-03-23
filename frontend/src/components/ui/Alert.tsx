"use client";

export function Alert({
  variant = "error",
  children,
}: {
  variant?: "error" | "success" | "info";
  children: React.ReactNode;
}) {
  const styles =
    variant === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : variant === "info"
      ? "border-blue-200 bg-blue-50 text-blue-900"
      : "border-red-200 bg-red-50 text-red-900";

  return <div className={`rounded-xl border px-4 py-3 text-sm ${styles}`}>{children}</div>;
}

