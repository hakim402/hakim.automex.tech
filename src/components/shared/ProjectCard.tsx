import Link from "next/link";
import { Calendar, Clock, Globe } from "lucide-react";
import type { ContentMeta } from "@/lib/content";

interface ProjectCardProps {
  slug: string;
  meta: ContentMeta;
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ProjectCard({ slug, meta }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group glow-border block overflow-hidden rounded-lg border border-border bg-background-elevated p-5 transition-all hover:-translate-y-0.5"
    >
      {meta.image && (
        <div className="mb-4 overflow-hidden rounded-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={meta.image}
            alt={meta.title}
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex items-center gap-2 text-xs font-medium text-accent">
        <span className="font-mono uppercase tracking-wider">
          {meta.category}
        </span>
        {meta.featured && (
          <span className="rounded-full border border-accent-secondary/20 bg-accent-secondary/10 px-2 py-0.5 text-accent-secondary">
            Featured
          </span>
        )}
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground">
        {meta.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
        {meta.summary}
      </p>

      {/* Metadata row */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        {meta.date && (
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(meta.date).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "short",
            })}
          </span>
        )}
        {meta.readingTime && (
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {meta.readingTime} min
          </span>
        )}
      </div>

      {meta.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {meta.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="max-w-35 truncate rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
          {meta.tags.length > 4 && (
            <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted">
              +{meta.tags.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Quick links */}
      {(meta.repo || meta.url) && (
        <div className="mt-3 flex items-center gap-3 border-t border-border/50 pt-3">
          {meta.repo && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(meta.repo, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-xs text-muted transition-colors hover:text-foreground"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              Repository
            </button>
          )}
          {meta.url && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(meta.url, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-xs text-muted transition-colors hover:text-foreground"
            >
              <Globe className="h-3.5 w-3.5" />
              Live Demo
            </button>
          )}
        </div>
      )}
    </Link>
  );
}
