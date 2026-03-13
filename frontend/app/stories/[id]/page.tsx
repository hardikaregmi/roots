import Link from "next/link";
import { notFound } from "next/navigation";

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
    const res = await fetch(`http://localhost:8080/api/stories/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(error);
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

  return (
    <main className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/stories"
          className="mb-8 inline-block text-sm text-warm-400 transition-colors duration-200 hover:text-warm-700"
        >
          &larr; Back to stories
        </Link>

        <article className="rounded-2xl border border-warm-200 bg-white/70 p-8 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-warm-100 px-3 py-1 text-xs font-medium text-warm-600">
              {story.category}
            </span>
            <span className="rounded-full bg-warm-100 px-3 py-1 text-xs font-medium text-warm-600">
              {story.isAnonymous ? "Anonymous" : "Public"}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-warm-900">
            {story.title}
          </h1>

          <div className="mb-8 space-y-1.5 text-sm text-warm-400">
            <p>
              <span className="font-medium text-warm-500">Shared by:</span>{" "}
              {story.isAnonymous ? "Anonymous" : story.authorName || "Unknown"}
            </p>
            <p>
              <span className="font-medium text-warm-500">From:</span>{" "}
              {story.originCountry || "Not shared"}
            </p>
            <p>
              <span className="font-medium text-warm-500">Now in:</span>{" "}
              {story.currentCountry || "Not shared"}
            </p>
          </div>

          <div className="whitespace-pre-line text-[17px] leading-8 text-warm-700">
            {story.content}
          </div>
        </article>
      </div>
    </main>
  );
}
