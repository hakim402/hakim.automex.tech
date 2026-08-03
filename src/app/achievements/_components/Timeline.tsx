"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Award } from "lucide-react";
import type { ContentItem } from "@/lib/content";

interface TimelineProps {
  items: ContentItem[];
  categories: string[];
  basePath: string;
}

export default function Timeline({ items, categories }: TimelineProps) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? items : items.filter((i) => i.meta.category === active);

  return (
    <>
      {/* Category filters */}
      {categories.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive("All")}
            className={`rounded-full border px-3 py-1 font-mono text-xs font-medium transition-colors ${
              active === "All"
                ? "border-accent/50 bg-accent/10 text-accent"
                : "border-border bg-background-elevated text-muted hover:border-accent-secondary/40 hover:text-accent-secondary"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                active === cat
                  ? "border-accent/50 bg-accent/10 font-medium text-accent"
                  : "border-border bg-background-elevated text-muted hover:border-accent-secondary/40 hover:text-accent-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Trace-rule */}
      <div className="trace-rule mx-auto mb-12 h-px w-full max-w-5xl" />

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border-strong bg-background-elevated p-12 text-center">
          <Award className="mx-auto h-8 w-8 text-muted" />
          <p className="mt-3 text-sm text-muted">
            No achievements match this category.
          </p>
          <button
            type="button"
            onClick={() => setActive("All")}
            className="mt-2 text-xs text-accent underline underline-offset-4 transition-colors hover:text-accent-secondary"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4.75 top-2 h-[calc(100%-1rem)] w-px bg-border sm:left-6.75" />

          <ul className="space-y-8">
            {filtered.map((item, idx) => (
              <li key={item.slug} className="relative pl-14 sm:pl-16">
                {/* Timeline dot */}
                <div
                  className={`absolute left-2.75 top-2.5 h-4 w-4 rounded-full border-2 sm:left-4.75 ${
                    item.meta.featured
                      ? "border-accent-secondary bg-background-elevated ring-4 ring-accent-secondary/10"
                      : "border-accent/60 bg-background-elevated"
                  }`}
                />

                {/* Card */}
                <Link
                  href={`/achievements/${item.slug}`}
                  className="group block rounded-xl border border-border bg-background-elevated p-5 transition-all hover:border-accent-secondary/30"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="mono text-[11px] font-medium uppercase tracking-[0.15em] text-accent-secondary">
                      {item.meta.category}
                    </span>
                    {item.meta.date && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.meta.date).toLocaleDateString("en-CA", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                    {item.meta.featured && (
                      <span className="rounded-full border border-accent-secondary/20 bg-accent-secondary/10 px-2 py-0.5 text-[10px] font-medium text-accent-secondary">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground">
                    {item.meta.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {item.meta.summary}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors group-hover:text-accent-secondary">
                    Read more
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
