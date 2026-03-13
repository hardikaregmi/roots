"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
  const [message, setMessage] = useState("");

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
    try {
      const payload = {
        ...data,
        authorName: data.isAnonymous ? "" : data.authorName,
      };

      const res = await fetch("http://localhost:8080/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit story");
      }

      setMessage("Your story was shared successfully.");
      reset();
    } catch (error) {
      setMessage("Something went wrong while sharing your story.");
      console.error(error);
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-warm-200 bg-white px-4 py-3 text-warm-800 placeholder-warm-300 outline-none transition-colors duration-200 focus:border-warm-400 focus:ring-1 focus:ring-warm-300";

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

          {message && <p className="text-sm text-warm-600">{message}</p>}
        </form>
      </div>
    </main>
  );
}
