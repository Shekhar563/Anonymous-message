interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({ loading, children, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="inline-flex items-center justify-center rounded-xl bg-zinc-900 text-white px-4 py-2 font-medium
                 hover:bg-zinc-800 disabled:opacity-50 transition"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
