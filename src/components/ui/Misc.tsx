export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/60 border border-white/60">
      {children}
    </span>
  );
}

export function Divider({ label = "or" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-zinc-300/60" />
      <span className="text-xs text-zinc-600">{label}</span>
      <div className="h-px flex-1 bg-zinc-300/60" />
    </div>
  );
}
