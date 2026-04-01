"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/api";

const storySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Story must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  isAnonymous: z.boolean(),
  authorName: z.string().optional(),
  originCountry: z.string().optional(),
  currentCountry: z.string().optional(),
});

type StoryFormData = z.infer<typeof storySchema>;

export default function SharePage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StoryFormData>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      isAnonymous: false,
      authorName: "",
      originCountry: "",
      currentCountry: "",
    },
  });

  const isAnonymous = watch("isAnonymous");

  const onSubmit = async (data: StoryFormData) => {
    setStatus("idle");
    setErrorMessage("");

    try {
      const payload = {
        ...data,
        authorName: data.isAnonymous ? "" : data.authorName,
      };

      const res = await fetch(`${API_BASE_URL}/api/stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit story");
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong while sharing your story. Please try again."
      );
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-warm-200 bg-white px-4 py-3 text-warm-800 placeholder-warm-300 outline-none transition-colors duration-200 focus:border-warm-400 focus:ring-1 focus:ring-warm-300";

  if (status === "success") {
    return (
      <main className="min-h-screen px-6 py-14">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-warm-200 bg-white/70 p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-warm-100">
              <svg
                className="h-6 w-6 text-warm-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-warm-900">
              Your story was shared
            </h2>
            <p className="mb-6 text-warm-500">
              Thank you for sharing. Your story helps others feel less alone.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/stories"
                className="rounded-xl border border-warm-300 px-6 py-3 text-sm font-medium text-warm-700 transition-colors duration-200 hover:bg-warm-100"
              >
                Read stories
              </Link>
              <button
                onClick={() => setStatus("idle")}
                className="rounded-xl bg-warm-800 px-6 py-3 text-sm font-medium text-warm-50 transition-colors duration-200 hover:bg-warm-700"
              >
                Share another story
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-warm-900">
          Share your story
        </h1>
        <p className="mb-10 text-warm-500">
          Roots is a space for stories of leaving, becoming, and belonging.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-2xl border border-warm-200 bg-white/70 p-8 shadow-sm"
        >
          {status === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Title
            </label>
            <input
              {...register("title")}
              className={inputClasses}
              placeholder="Give your story a title"
            />
            {errors.title && (
              <p className="mt-1.5 text-sm text-red-600/80">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Story
            </label>
            <textarea
              {...register("content")}
              rows={8}
              className={inputClasses}
              placeholder="Write your story here..."
            />
            {errors.content && (
              <p className="mt-1.5 text-sm text-red-600/80">
                {errors.content.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Category
            </label>
            <select {...register("category")} className={inputClasses}>
              <option value="">Select a category</option>
              <option value="Student life">Student life</option>
              <option value="Loneliness">Loneliness</option>
              <option value="Identity">Identity</option>
              <option value="Language barriers">Language barriers</option>
              <option value="Family sacrifice">Family sacrifice</option>
              <option value="Career journey">Career journey</option>
              <option value="Hope">Hope</option>
            </select>
            {errors.category && (
              <p className="mt-1.5 text-sm text-red-600/80">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("isAnonymous")}
              className="h-4 w-4 rounded border-warm-300 accent-warm-700"
            />
            <label className="text-sm text-warm-600">Share anonymously</label>
          </div>

          {!isAnonymous && (
            <div>
              <label className="mb-2 block text-sm font-medium text-warm-700">
                Your name
              </label>
              <input
                {...register("authorName")}
                className={inputClasses}
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Origin country
            </label>
            <input
              {...register("originCountry")}
              className={inputClasses}
              placeholder="Where are you from?"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Current country
            </label>
            <input
              {...register("currentCountry")}
              className={inputClasses}
              placeholder="Where are you now?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-warm-800 px-6 py-3 text-sm font-medium text-warm-50 transition-colors duration-200 hover:bg-warm-700 disabled:opacity-50"
          >
            {isSubmitting ? "Sharing..." : "Share story"}
          </button>
        </form>
      </div>
    </main>
  );
}
