import Link from "next/link";
import { notFound } from "next/navigation";
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

async function getStory(id: string): Promise<Story | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/stories/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = await getStory(id);

  if (!story) {
    notFound();
  }

  const formattedDate = new Date(story.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/stories"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-warm-400 transition-colors duration-200 hover:text-warm-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to stories
        </Link>

        <article className="rounded-2xl border border-warm-200 bg-white/70 shadow-sm">
          <div className="p-8 sm:p-10">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-warm-100 px-3 py-1 text-xs font-medium text-warm-600">
                {story.category}
              </span>
              {story.isAnonymous && (
                <span className="rounded-full bg-warm-100 px-3 py-1 text-xs font-medium text-warm-400">
                  Anonymous
                </span>
              )}
            </div>

            <h1 className="mb-6 text-3xl font-bold tracking-tight text-warm-900 sm:text-4xl">
              {story.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-warm-400">
              <span>
                {story.isAnonymous
                  ? "Anonymous"
                  : story.authorName || "Unknown"}
              </span>
              {story.originCountry && (
                <>
                  <span className="text-warm-300">&middot;</span>
                  <span>From {story.originCountry}</span>
                </>
              )}
              {story.currentCountry && (
                <>
                  <span className="text-warm-300">&middot;</span>
                  <span>Now in {story.currentCountry}</span>
                </>
              )}
              <span className="text-warm-300">&middot;</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="border-t border-warm-200" />

          <div className="p-8 sm:p-10">
            <div className="whitespace-pre-line text-[17px] leading-8 text-warm-700">
              {story.content}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
