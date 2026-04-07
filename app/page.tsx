export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_40%)]" />
      <main className="relative max-w-2xl space-y-8 text-center">
        <p className="inline-flex rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-400">
          SmartPulse
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50">
          Your AI Command Center for Freelance Revenue
        </h1>
        <p className="text-lg text-zinc-400">
          Track clients, invoice faster, and ask AI anything about your business in real time.
        </p>
        <a
          href="/auth"
          className="inline-flex rounded-md bg-indigo-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-400"
        >
          Start SmartPulse
        </a>
      </main>
    </div>
  );
}
