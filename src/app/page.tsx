export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white font-sans">
      <div className="flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
          Welcome to Next.js
        </h1>
        <p className="text-base leading-7 text-neutral-600 sm:text-lg">
          Start editing <code className="rounded bg-neutral-100 px-2 py-1">src/app/page.tsx</code> to
          build your app.
        </p>
      </div>
    </main>
  );
}
