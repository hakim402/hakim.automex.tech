import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Award, GraduationCap, Globe } from "lucide-react";
import CertificationGrid from "./_components/CertificationGrid";
import { getAllContent, getCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Professional certifications, online courses, and university credentials.",
};

export default function CertificationsPage() {
  const certifications = getAllContent("certifications");
  const categories = getCategories("certifications");

  const featuredCount = certifications.filter((c) => c.meta.featured).length;
  const uniqueIssuers = new Set(
    certifications.map((c) => c.meta.issuer).filter(Boolean)
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
          Credentials
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Certifications
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Professional certifications, online courses from Coursera &amp; edX,
          and university credentials.
        </p>
      </div>

      {/* Stats banner */}
      {certifications.length > 0 && (
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-background-elevated p-5">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
              <Award className="h-4.5 w-4.5 text-accent" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">
              {certifications.length}
            </p>
            <p className="mt-0.5 text-xs text-muted">Total Certifications</p>
          </div>
          <div className="rounded-xl border border-border bg-background-elevated p-5">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-secondary/10">
              <GraduationCap className="h-4.5 w-4.5 text-accent-secondary" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">
              {uniqueIssuers}
            </p>
            <p className="mt-0.5 text-xs text-muted">Platforms &amp; Issuers</p>
          </div>
          <div className="rounded-xl border border-border bg-background-elevated p-5">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
              <Globe className="h-4.5 w-4.5 text-accent" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">
              {featuredCount}
            </p>
            <p className="mt-0.5 text-xs text-muted">Featured Credentials</p>
          </div>
        </div>
      )}

      <CertificationGrid
        items={certifications}
        categories={categories}
      />
    </div>
  );
}
