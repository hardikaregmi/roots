import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Roots",
  description: "Stories of leaving, becoming, and belonging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-warm-200 bg-warm-50">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
            <p className="text-sm text-warm-400">
              Roots &mdash; Stories of leaving, becoming, and belonging.
            </p>
            <div className="flex items-center gap-6 text-sm text-warm-400">
              <Link
                href="/about"
                className="transition-colors duration-200 hover:text-warm-700"
              >
                About
              </Link>
              <Link
                href="/share"
                className="transition-colors duration-200 hover:text-warm-700"
              >
                Share a story
              </Link>
              <Link
                href="/stories"
                className="transition-colors duration-200 hover:text-warm-700"
              >
                Read stories
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
