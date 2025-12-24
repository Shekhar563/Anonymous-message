import { cn } from "@/lib/cn";

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function PrimaryButton({ className, loading, children, ...props }: BtnProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={cn(
        "w-full rounded-2xl px-4 py-3 font-semibold text-white",
        "bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-emerald-600",
        "hover:brightness-110 transition shadow-lg shadow-indigo-500/20",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 rounded-full border-2 border-white/60 border-t-white animate-spin" />
          Please wait...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export function SecondaryButton({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "w-full text-center rounded-2xl px-4 py-3 font-semibold",
        "border border-zinc-300 bg-white/60 hover:bg-white transition",
        className
      )}
    >
      {children}
    </button>
  );
}
