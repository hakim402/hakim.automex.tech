"use client";

import { useState } from "react";
import { Award } from "lucide-react";
import CertificationCard from "./CertificationCard";
import type { ContentItem } from "@/lib/content";

interface Props {
  items: ContentItem[];
  categories: string[];
}

export default function CertificationGrid({ items, categories }: Props) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? items
      : items.filter((i) => i.meta.category === active);

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

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border-strong bg-background-elevated p-12 text-center">
          <Award className="mx-auto h-8 w-8 text-muted" />
          <p className="mt-3 text-sm text-muted">
            No certifications match this category.
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
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((cert) => (
            <CertificationCard
              key={cert.slug}
              slug={cert.slug}
              meta={cert.meta}
            />
          ))}
        </div>
      )}
    </>
  );
}
