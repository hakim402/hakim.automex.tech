import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Award, Star, Trophy } from "lucide-react";
import Timeline from "./_components/Timeline";
import { getAllContent, getCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Awards, honors, and milestones from my academic and professional journey.",
};

export default function AchievementsPage() {
  const achievements = getAllContent("achievements");
  const categories = getCategories("achievements");
  const featuredCount = achievements.filter((a) => a.meta.featured).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 reveal">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent-secondary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-12 reveal">
        <span className="mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent-secondary">
          Milestones
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Achievements
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Awards, honors, and milestones from my academic and professional
          journey.
        </p>
      </div>

      {/* Stats banner */}
      {achievements.length > 0 && (
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-background-elevated p-5">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
              <Trophy className="h-4.5 w-4.5 text-accent" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">
              {achievements.length}
            </p>
            <p className="mt-0.5 text-xs text-muted">Total Achievements</p>
          </div>
          <div className="rounded-xl border border-border bg-background-elevated p-5">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-secondary/10">
              <Star className="h-4.5 w-4.5 text-accent-secondary" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">
              {featuredCount}
            </p>
            <p className="mt-0.5 text-xs text-muted">Featured Honors</p>
          </div>
          <div className="rounded-xl border border-border bg-background-elevated p-5">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
              <Award className="h-4.5 w-4.5 text-accent" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">
              {categories.length}
            </p>
            <p className="mt-0.5 text-xs text-muted">Categories</p>
          </div>
        </div>
      )}

      {/* Trace-rule divider */}
      <div className="trace-rule mx-auto mb-12 h-px w-full max-w-5xl" />

      {achievements.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border-strong bg-background-elevated p-16 text-center">
          <Award className="mx-auto h-10 w-10 text-muted" />
          <p className="mt-4 text-muted">
            No achievements yet. Add .mdx files to src/content/achievements/.
          </p>
        </div>
      ) : (
        <Timeline
          items={achievements}
          categories={categories}
          basePath="/achievements"
        />
      )}
    </div>
  );
}
