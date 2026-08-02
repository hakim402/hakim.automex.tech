import Link from "next/link";
import { Calendar, Building2, ExternalLink } from "lucide-react";
import type { ContentMeta } from "@/lib/content";

interface Props { slug: string; meta: ContentMeta; }

export default function CertificationCard({ slug, meta }: Props) {
  return (
    <Link
      href={`/certifications/${slug}`}
      className="group block rounded-xl border border-border bg-background-elevated p-5 transition-all hover:border-accent-secondary/30"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {/* Issuer badge */}
          {meta.issuer && (
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-accent-secondary/20 bg-accent-secondary/5 px-2.5 py-0.5 text-[11px] font-medium text-accent-secondary">
              <Building2 className="h-3 w-3" />
              {meta.issuer}
            </div>
          )}

          <h3 className="text-base font-semibold leading-snug text-foreground">
            {meta.title}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {meta.summary}
          </p>

          {/* Metadata */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[11px]">
              {meta.category}
            </span>
            {meta.date && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(meta.date).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
            )}
          </div>
        </div>

        {meta.image && (
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={meta.image}
              alt={meta.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Bottom row: verification link + featured tag */}
      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
        {meta.url ? (
          <span className="inline-flex items-center gap-1 text-xs text-accent transition-colors group-hover:text-accent-secondary">
            <ExternalLink className="h-3 w-3" />
            Verify credential
          </span>
        ) : (
          <span />
        )}
        {meta.featured && (
          <span className="rounded-full border border-accent-secondary/20 bg-accent-secondary/10 px-2 py-0.5 text-[10px] font-medium text-accent-secondary">
            Featured
          </span>
        )}
      </div>
    </Link>
  );
}
