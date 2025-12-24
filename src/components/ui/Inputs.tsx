import { cn } from "@/lib/cn";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-2",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500",
        props.className
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-2",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500",
        props.className
      )}
    />
  );
}
