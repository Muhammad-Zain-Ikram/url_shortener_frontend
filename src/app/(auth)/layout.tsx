import React from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-zinc-50/50 dark:bg-zinc-950/50">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Brand Header */}
      <div className="relative mb-8 flex items-center gap-2.5">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg font-bold text-xl tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Link2 className="size-5" />
          </div>
          <span>LinkCraft</span>
        </Link>
      </div>

      {/* Auth Content Card */}
      <div className="relative w-full max-w-md">{children}</div>

      {/* Footer Info */}
      <footer className="relative mt-8 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} LinkCraft. Production-grade URL infrastructure.
      </footer>
    </div>
  );
}
