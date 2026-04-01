import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-warm-900">
          About Roots
        </h1>
        <p className="mb-10 text-warm-500">
          Why this platform exists.
        </p>

        <div className="space-y-6">
          <div className="rounded-2xl border border-warm-200 bg-white/70 p-8 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-warm-800">
              Our purpose
            </h2>
            <p className="text-[17px] leading-8 text-warm-600">
              Roots is a storytelling platform for immigrants to share personal
              experiences, struggles, and moments of hope; either anonymously or
              publicly; so others can feel seen, understood, and less alone.
            </p>
          </div>

          <div className="rounded-2xl border border-warm-200 bg-white/70 p-8 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-warm-800">
              What we believe
            </h2>
            <p className="mb-4 text-[17px] leading-8 text-warm-600">
              Every immigrant story is worth telling. Whether it's about
              the first winter away from home, learning a new language, or
              finding community in an unfamiliar place, these experiences
              connect us.
            </p>
            <p className="text-[17px] leading-8 text-warm-600">
              Roots is a calm and respectful space for stories of leaving,
              becoming, identity, family, language, and belonging.
            </p>
          </div>

          <div className="rounded-2xl border border-warm-200 bg-white/70 p-8 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-warm-800">
              How it works
            </h2>
            <ul className="space-y-3 text-[17px] leading-8 text-warm-600">
              <li className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-warm-100 text-xs font-semibold text-warm-600">
                  1
                </span>
                <span>Write your story: give it a title, pick a category, and share what matters to you.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-warm-100 text-xs font-semibold text-warm-600">
                  2
                </span>
                <span>Choose to share anonymously or with your name; you're always in control.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-warm-100 text-xs font-semibold text-warm-600">
                  3
                </span>
                <span>Your story joins the community, where others can read it and feel less alone.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-warm-200 bg-white/70 p-8 text-center shadow-sm">
            <p className="mb-5 text-[17px] leading-8 text-warm-600">
              Ready to share your experience?
            </p>
            <Link
              href="/share"
              className="inline-block rounded-xl bg-warm-800 px-8 py-3.5 text-sm font-medium text-warm-50 shadow-sm transition-all duration-200 hover:bg-warm-700 hover:shadow-md"
            >
              Share your story
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
