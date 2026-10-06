import Link from "next/link";
import {
  Link2,
  ShieldCheck,
  Zap,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight transition-opacity hover:opacity-80"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Link2 className="size-4" />
            </div>
            <span>LinkCraft</span>
          </Link>

          <nav className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Hero Placeholder */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="container mx-auto max-w-5xl px-4 text-center sm:px-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-medium text-muted-foreground shadow-sm mb-6">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Authentication Module Live</span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1 text-foreground">
                <Sparkles className="size-3 text-amber-500" />
                Landing Page Placeholder
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground max-w-3xl mx-auto">
              Lightning-Fast URLs.{" "}
              <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
                Enterprise Scalability.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Craft short, trackable links with sub-millisecond redirects.
              Backed by Redis-session authentication, strict validation, and
              modular feature-driven architecture.
            </p>

            {/* CTA Actions */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" className="w-full sm:w-auto font-semibold px-6" asChild>
                <Link href="/register">
                  Create Free Account
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6"
                asChild
              >
                <Link href="/login">Sign In to Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid (Placeholder previews) */}
        <section className="border-t border-border/40 bg-muted/20 py-20">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">
                  Session & Cookie Auth
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Complete authentication with HTTP-only cookies, Redis session
                  store, and Next.js Edge route guards.
                </p>
                <div className="mt-4 inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Ready & Integrated
                </div>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <Zap className="size-5" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">
                  URL Shortening Engine
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  High-throughput short code generation with collision detection,
                  caching, and instant 301/302 redirects.
                </p>
                <div className="mt-4 inline-flex items-center text-xs font-semibold text-muted-foreground">
                  Pending Implementation
                </div>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <BarChart3 className="size-5" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">
                  Real-time Analytics
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Geographic tracking, referrer headers, user agent parsing, and
                  detailed click performance metrics.
                </p>
                <div className="mt-4 inline-flex items-center text-xs font-semibold text-muted-foreground">
                  Pending Implementation
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:text-left sm:px-6">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <Link2 className="size-4" />
            <span>LinkCraft</span>
          </div>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} LinkCraft. Production-grade URL infrastructure.
          </p>
          <div className="flex gap-4 text-xs">
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
