import { cn } from "@/lib/cn";

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-zinc-700">{children}</label>;
}

export function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1 text-xs text-red-600">{children}</p>;
}

export function FieldWrap({
  children,
  ringClass = "group-focus-within:ring-indigo-300/60",
}: {
  children: React.ReactNode;
  ringClass?: string;
}) {
  return (
    <div className="mt-1 group relative">
      {children}
      <div className={cn("pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent", ringClass)} />
    </div>
  );
}
