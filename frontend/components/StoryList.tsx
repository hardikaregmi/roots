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
        <div className="rounded-2xl border border-warm-200 bg-white/70 p-10 text-center text-warm-400 shadow-sm">
          {stories.length === 0
            ? "No stories have been shared yet."
            : "No stories in this category yet."}
        </div>
      ) : (
        <div className="grid gap-5">
          {filtered.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="group block rounded-2xl border border-warm-200 bg-white/70 p-6 shadow-sm transition-all duration-200 hover:border-warm-300 hover:shadow-md"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-warm-100 px-3 py-1 text-xs font-medium text-warm-600">
                  {story.category}
                </span>

                <span className="rounded-full bg-warm-100 px-3 py-1 text-xs font-medium text-warm-600">
                  {story.isAnonymous ? "Anonymous" : "Public"}
                </span>
              </div>

              <h2 className="mb-2 text-xl font-semibold text-warm-900 transition-colors duration-200 group-hover:text-warm-700">
                {story.title}
              </h2>

              <p className="mb-4 line-clamp-3 leading-relaxed text-warm-600">
                {story.content}
              </p>

              <div className="space-y-1 text-sm text-warm-400">
                <p>
                  <span className="font-medium text-warm-500">From:</span>{" "}
                  {story.originCountry || "Not shared"}
                </p>
                <p>
                  <span className="font-medium text-warm-500">Now in:</span>{" "}
                  {story.currentCountry || "Not shared"}
                </p>
                <p>
                  <span className="font-medium text-warm-500">
                    Shared by:
                  </span>{" "}
                  {story.isAnonymous
                    ? "Anonymous"
                    : story.authorName || "Unknown"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
