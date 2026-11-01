type ToastProps = {
  message: string | null;
};

export default function Toast({ message }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="animate-rise pointer-events-none absolute bottom-24 left-1/2 z-50 w-[80%] -translate-x-1/2">
      <div className="glass mx-auto w-fit max-w-full rounded-full px-4 py-2.5 text-center text-[12.5px] font-medium leading-snug text-white/90">
        {message}
      </div>
    </div>
  );
}
