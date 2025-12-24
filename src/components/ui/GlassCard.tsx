import { cn } from "@/lib/cn";

export default function GlassCard({
  children,
  className,
  accent = true,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-xl",
        className
      )}
    >
      {accent && (
        <div className="h-2 w-full rounded-t-3xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500" />
      )}
      <div className="p-6 sm:p-7">{children}</div>
    </div>
  );
}
