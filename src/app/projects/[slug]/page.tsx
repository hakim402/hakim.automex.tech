import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock, Globe, Tag } from "lucide-react";
import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { ProjectImage, Callout, MermaidPre } from "@/components/mdx";
import { SITE } from "@/lib/constants";

interface Props { params: Promise<{ slug: string }>; }

const mdxComponents = { ProjectImage, Callout, pre: MermaidPre };

export async function generateStaticParams() {
  const slugs = getContentSlugs("projects");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug("projects", slug);
  if (!item) return { title: "Not Found" };

  const title = `${item.meta.title} | Case Study`;
  const description = item.meta.description || item.meta.summary;

  return {
    title,
    description,
    keywords: item.meta.keywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: item.meta.date,
      url: `${SITE.url}/projects/${slug}`,
      images: item.meta.ogImage ? [{ url: item.meta.ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: item.meta.ogImage ? [item.meta.ogImage] : [],
    },
    alternates: {
      canonical: item.meta.canonicalUrl || `${SITE.url}/projects/${slug}`,
    },
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug("projects", slug);
  if (!item) notFound();

  const { meta, mdxSource } = item;
  const subtitle = meta.description || meta.summary;

  return (
    <>
      {/* JSON-LD structured data */}
      {meta.jsonLd && meta.jsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(meta.jsonLd) }}
        />
      )}

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        {/* Breadcrumb */}
        <nav className="mb-8 reveal">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent-secondary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Projects
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

          {subtitle && (
            <p className="mt-3 text-base leading-relaxed text-muted">{subtitle}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
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
            {meta.readingTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {meta.readingTime} min read
              </span>
            )}
            {meta.url && (
              <Link
                href={meta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-secondary"
              >
                <Globe className="h-3.5 w-3.5" /> Live Demo
              </Link>
            )}
            {meta.repo && (
              <Link
                href={meta.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-secondary"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                Repository
              </Link>
            )}
          </div>
        </header>

        {/* Tags */}
        {meta.tags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
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

        {/* Hero image */}
        {meta.image && (
          <div className="mb-12">
            <div className="glow-border relative overflow-hidden rounded-2xl border border-border/50 bg-background-elevated">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={meta.image}
                alt={meta.title}
                className="aspect-video w-full object-cover"
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
        <div className="trace-rule mx-auto mb-12 h-px w-full max-w-2xl" />

        {/* MDX Content */}
        <div className="case-study-prose">
          <MDXRemote
            source={mdxSource}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>

        {/* Footer nav */}
        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            View all case studies
          </Link>
        </div>
      </article>
    </>
  );
}
