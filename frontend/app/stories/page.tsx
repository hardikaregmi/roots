import Link from "next/link";
import StoryList from "@/components/StoryList";
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

type FetchResult =
  | { ok: true; stories: Story[] }
  | { ok: false; error: string };

async function getStories(): Promise<FetchResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/stories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { ok: false, error: "We couldn't load stories right now." };
    }

    const stories: Story[] = await res.json();
    return { ok: true, stories };
  } catch {
    return {
      ok: false,
      error: "Unable to connect to the server. Please try again later.",
    };
  }
}

export default async function StoriesPage() {
  const result = await getStories();

  return (
    <main className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-warm-900">
          Stories
        </h1>
        <p className="mb-10 text-warm-500">
          Real experiences from the immigrant community.
        </p>

        {result.ok ? (
          <StoryList stories={result.stories} />
        ) : (
          <div className="rounded-2xl border border-warm-200 bg-white/70 p-10 text-center shadow-sm">
            <p className="mb-4 text-warm-500">{result.error}</p>
            <Link
              href="/stories"
              className="text-sm font-medium text-warm-700 underline underline-offset-4 transition-colors duration-200 hover:text-warm-900"
            >
              Try again
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
