import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";

type Story = {
  id: number;
  title: string;
  content: string;
  category: string;
  isAnonymous: boolean;
  authorName: string;
  originCountry: string;
  currentCountry: string;
  createdAt: string;
};

async function getRecentStories(): Promise<Story[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/stories`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const stories: Story[] = await res.json();
    return stories.slice(-3).reverse();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const recentStories = await getRecentStories();

  return (
    <main>
      {/* Hero */}
      <section className="px-6 pb-20 pt-24 sm:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium tracking-widest uppercase text-warm-400">
            A storytelling platform for immigrants
          </p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-warm-900 sm:text-6xl">
            Stories of leaving,
            <br />
            becoming, and belonging.
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-warm-500">
            A calm space where immigrants can share their stories — anonymously
            or publicly — so others feel seen, understood, and less alone.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/share"
              className="rounded-xl bg-warm-800 px-8 py-3.5 text-sm font-medium text-warm-50 shadow-sm transition-all duration-200 hover:bg-warm-700 hover:shadow-md"
            >
              Share your story
            </Link>
            <Link
              href="/stories"
              className="rounded-xl border border-warm-300 px-8 py-3.5 text-sm font-medium text-warm-700 transition-all duration-200 hover:border-warm-400 hover:bg-warm-100"
            >
              Read stories
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-warm-200 bg-white/50 px-6 py-16">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-warm-100">
              <svg className="h-5 w-5 text-warm-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h3 className="mb-1 text-sm font-semibold text-warm-800">Real stories</h3>
            <p className="text-sm leading-relaxed text-warm-500">
              Authentic experiences shared by people who&apos;ve lived them.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-warm-100">
              <svg className="h-5 w-5 text-warm-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="mb-1 text-sm font-semibold text-warm-800">Safe space</h3>
            <p className="text-sm leading-relaxed text-warm-500">
              Share anonymously or publicly — you&apos;re in control.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-warm-100">
              <svg className="h-5 w-5 text-warm-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="mb-1 text-sm font-semibold text-warm-800">Community</h3>
            <p className="text-sm leading-relaxed text-warm-500">
              Read others&apos; stories and feel less alone in yours.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Stories */}
      {recentStories.length > 0 && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-bold tracking-tight text-warm-900">
                  Recent stories
                </h2>
                <p className="text-sm text-warm-400">
                  The latest from the Roots community.
                </p>
              </div>
              <Link
                href="/stories"
                className="hidden text-sm font-medium text-warm-600 transition-colors duration-200 hover:text-warm-900 sm:block"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {recentStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.id}`}
                  className="group flex flex-col rounded-2xl border border-warm-200 bg-white/70 p-6 shadow-sm transition-all duration-200 hover:border-warm-300 hover:shadow-md"
                >
                  <span className="mb-3 w-fit rounded-full bg-warm-100 px-3 py-1 text-xs font-medium text-warm-600">
                    {story.category}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-warm-900 transition-colors duration-200 group-hover:text-warm-700">
                    {story.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-warm-500">
                    {story.content}
                  </p>
                  <p className="text-xs text-warm-400">
                    {story.isAnonymous ? "Anonymous" : story.authorName || "Unknown"}
                    {story.originCountry ? ` \u00b7 From ${story.originCountry}` : ""}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/stories"
                className="text-sm font-medium text-warm-600 transition-colors duration-200 hover:text-warm-900"
              >
                View all stories &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-warm-200 bg-white/70 p-10 text-center shadow-sm sm:p-14">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-warm-900">
            Every story matters
          </h2>
          <p className="mb-8 leading-relaxed text-warm-500">
            Your experience could be the one that makes someone else feel seen.
            Share it here.
          </p>
          <Link
            href="/share"
            className="inline-block rounded-xl bg-warm-800 px-8 py-3.5 text-sm font-medium text-warm-50 shadow-sm transition-all duration-200 hover:bg-warm-700 hover:shadow-md"
          >
            Share your story
          </Link>
        </div>
      </section>
    </main>
  );
}
