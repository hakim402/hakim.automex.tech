import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, BookOpen, Users } from "lucide-react";
import PublicationList from "./_components/PublicationList";
import { getAllContent, getCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Academic publications, research papers, and scholarly articles.",
};

export default function PublicationsPage() {
  const publications = getAllContent("publications");
  const categories = getCategories("publications");

  const featuredCount = publications.filter((p) => p.meta.featured).length;
  const totalAuthors = new Set(
    publications.flatMap((p) => p.meta.authors || [])
  ).size;

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
          Research
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Publications
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Academic publications, conference papers, workshop papers, and
          research contributions.
        </p>
      </div>

      {/* Stats banner */}
      {publications.length > 0 && (
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-background-elevated p-5">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
              <FileText className="h-4.5 w-4.5 text-accent" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">
              {publications.length}
            </p>
            <p className="mt-0.5 text-xs text-muted">Total Publications</p>
          </div>
          <div className="rounded-xl border border-border bg-background-elevated p-5">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-secondary/10">
              <BookOpen className="h-4.5 w-4.5 text-accent-secondary" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">
              {categories.length}
            </p>
            <p className="mt-0.5 text-xs text-muted">Venue Types</p>
          </div>
          <div className="rounded-xl border border-border bg-background-elevated p-5">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
              <Users className="h-4.5 w-4.5 text-accent" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">
              {totalAuthors}
            </p>
            <p className="mt-0.5 text-xs text-muted">Co-Authors</p>
          </div>
        </div>
      )}

      <PublicationList items={publications} categories={categories} />
    </div>
  );
}
