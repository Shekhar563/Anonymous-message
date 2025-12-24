export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-zinc-300 px-4 py-2
                 focus:outline-none focus:ring-2 focus:ring-zinc-900"
    />
  );
}
