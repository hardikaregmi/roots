"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/share", label: "Share" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="border-b border-warm-200 bg-warm-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-warm-900"
        >
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Roots logo"
              width={32}
              height={32}
              className="object-contain"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-warm-800 text-sm font-bold text-warm-50"
              aria-hidden="true"
            >
              R
            </span>
          )}
          <span>Roots</span>
        </Link>

        <div className="flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 transition-colors duration-200 ${
                  isActive
                    ? "bg-warm-800 text-warm-50"
                    : "text-warm-600 hover:bg-warm-100 hover:text-warm-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}