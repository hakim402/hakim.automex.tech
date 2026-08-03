import Link from "next/link";
import { Calendar, BookOpen, ExternalLink, Users } from "lucide-react";
import type { ContentMeta } from "@/lib/content";

interface Props {
  slug: string;
  meta: ContentMeta;
}

export default function PublicationCard({ slug, meta }: Props) {
  return (
    <Link
      href={`/publications/${slug}`}
      className="group block rounded-xl border border-border bg-background-elevated p-5 transition-all hover:border-accent-secondary/30"
    >
      <div className="min-w-0 flex-1">
        {/* Category + journal badges */}
        <div className="mb-2.5 flex flex-wrap items-center gap-2">
          <span className="mono text-[11px] font-medium uppercase tracking-[0.15em] text-accent-secondary">
            {meta.category}
          </span>
          {meta.journal && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-muted">
              <BookOpen className="h-3 w-3" />
              {meta.journal}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold leading-snug text-foreground">
          {meta.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
          {meta.summary}
        </p>

        {/* Authors */}
        {meta.authors && meta.authors.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
            <Users className="h-3 w-3 shrink-0" />
            <span className="truncate">{meta.authors.join(", ")}</span>
          </div>
        )}

        {/* Bottom row: date + link + featured */}
        <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
          <div className="flex items-center gap-3 text-xs text-muted">
            {meta.date && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(meta.date).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
            )}
            {meta.url && (
              <span className="inline-flex items-center gap-1 text-accent transition-colors group-hover:text-accent-secondary">
                <ExternalLink className="h-3 w-3" />
                View paper
              </span>
            )}
          </div>
          {meta.featured && (
            <span className="rounded-full border border-accent-secondary/20 bg-accent-secondary/10 px-2 py-0.5 text-[10px] font-medium text-accent-secondary">
              Featured
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
