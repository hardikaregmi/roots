"use client";

import Link from "next/link";
import { useState } from "react";

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

const categories = [
  "All",
  "Student life",
  "Loneliness",
  "Identity",
  "Language barriers",
  "Family sacrifice",
  "Career journey",
  "Hope",
];

export default function StoryList({ stories }: { stories: Story[] }) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? stories
      : stories.filter((s) => s.category === active);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
              active === cat
                ? "bg-warm-800 text-warm-50"
                : "bg-warm-100 text-warm-600 hover:bg-warm-200 hover:text-warm-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-warm-200 bg-white/70 p-10 text-center shadow-sm">
          {stories.length === 0 ? (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-warm-100">
                <svg
                  className="h-6 w-6 text-warm-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <p className="mb-2 text-lg font-medium text-warm-700">
                No stories yet
              </p>
              <p className="mb-6 text-sm text-warm-400">
                Be the first to share your story and help others feel less
                alone.
              </p>
              <Link
                href="/share"
                className="inline-block rounded-xl bg-warm-800 px-6 py-3 text-sm font-medium text-warm-50 transition-all duration-200 hover:bg-warm-700 hover:shadow-md"
              >
                Share your story
              </Link>
            </>
          ) : (
            <>
              <p className="mb-2 text-lg font-medium text-warm-700">
                No stories in this category
              </p>
              <p className="text-sm text-warm-400">
                Try selecting a different category, or{" "}
                <Link
                  href="/share"
                  className="font-medium text-warm-600 underline underline-offset-4 transition-colors duration-200 hover:text-warm-800"
                >
                  share one yourself
                </Link>
                .
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid gap-5">
          {filtered.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="group block rounded-2xl border border-warm-200 bg-white/70 p-6 shadow-sm transition-all duration-200 hover:border-warm-300 hover:shadow-md sm:p-7"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-warm-100 px-3 py-1 text-xs font-medium text-warm-600">
                  {story.category}
                </span>
                {story.isAnonymous && (
                  <span className="rounded-full bg-warm-100 px-3 py-1 text-xs font-medium text-warm-400">
                    Anonymous
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="mb-2 text-xl font-semibold text-warm-900 transition-colors duration-200 group-hover:text-warm-700">
                    {story.title}
                  </h2>

                  <p className="mb-4 line-clamp-2 leading-relaxed text-warm-500">
                    {story.content}
                  </p>

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
                  </div>
                </div>

                <svg
                  className="mt-1 hidden h-5 w-5 flex-shrink-0 text-warm-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-warm-500 sm:block"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
