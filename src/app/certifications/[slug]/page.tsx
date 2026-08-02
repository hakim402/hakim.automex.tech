import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Building2, ExternalLink, Tag } from "lucide-react";
import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { SITE } from "@/lib/constants";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  const slugs = getContentSlugs("certifications");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug("certifications", slug);
  if (!item) return { title: "Not Found" };

  const title = `${item.meta.title} | Certification`;
  const description = item.meta.description || item.meta.summary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: item.meta.date,
      url: `${SITE.url}/certifications/${slug}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical:
        item.meta.canonicalUrl || `${SITE.url}/certifications/${slug}`,
    },
  };
}

export default async function CertificationDetail({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug("certifications", slug);
  if (!item) notFound();

  const { meta, html } = item;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 reveal">
        <Link
          href="/certifications"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent-secondary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Certifications
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent-secondary">
            {meta.category}
          </span>
          {meta.featured && (
            <span className="rounded-full border border-accent-secondary/20 bg-accent-secondary/10 px-2 py-0.5 text-[10px] font-medium text-accent-secondary">
              Featured
            </span>
          )}
        </div>

        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {meta.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
          {meta.issuer && (
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              {meta.issuer}
            </span>
          )}
          {meta.date && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(meta.date).toLocaleDateString("en-CA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        {meta.url && (
          <a
            href={meta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-secondary"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Verify Credential
          </a>
        )}
      </header>

      {/* Image */}
      {meta.image && (
        <div className="mb-10">
          <div className="glow-border relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-border/50 bg-background-elevated">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={meta.image}
              alt={meta.title}
              className="max-h-[420px] w-full object-contain"
            />
            {/* Blueprint corner ticks */}
            <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-accent-secondary/60" />
            <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-accent-secondary/60" />
            <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-accent-secondary/60" />
            <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-accent-secondary/60" />
          </div>
        </div>
      )}

      {/* Trace-rule divider */}
      <div className="trace-rule mb-10" />

      {/* Content */}
      <div
        className="case-study-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Tags */}
      {meta.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
          <Tag className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-background-elevated px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer nav */}
      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          View all certifications
        </Link>
      </div>
    </article>
  );
}
