"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid place-content-center w-full h-screen">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-slate-300">
          Error en el formulari
        </h2>
        <p className="text-slate-400">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-600"
        >
          Torna-ho a provar
        </button>
      </div>
    </div>
  );
}
