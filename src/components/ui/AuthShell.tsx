import { cn } from "@/lib/cn";

export default function AuthShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-fuchsia-100 to-emerald-100" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-300/50 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-300/50 blur-3xl" />
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
