import StoryList from "@/components/StoryList";

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

async function getStories(): Promise<Story[]> {
  try {
    const res = await fetch("http://localhost:8080/api/stories", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch stories");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <main className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-warm-900">
          Stories
        </h1>
        <p className="mb-10 text-warm-500">
          Read stories of leaving, becoming, and belonging.
        </p>

        <StoryList stories={stories} />
      </div>
    </main>
  );
}
