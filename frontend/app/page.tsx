import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl">
          Roots
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-warm-500">
          Stories of leaving, becoming, and belonging.
        </p>

        <div className="rounded-2xl border border-warm-200 bg-white/70 p-10 shadow-sm">
          <p className="mb-8 leading-relaxed text-warm-600">
            A calm space where immigrants can share their stories — anonymously
            or publicly — so others feel seen, understood, and less alone.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/share"
              className="rounded-xl bg-warm-800 px-6 py-3 text-sm font-medium text-warm-50 transition-colors duration-200 hover:bg-warm-700"
            >
              Share your story
            </Link>

            <Link
              href="/stories"
              className="rounded-xl border border-warm-300 px-6 py-3 text-sm font-medium text-warm-700 transition-colors duration-200 hover:bg-warm-100"
            >
              Read stories
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
