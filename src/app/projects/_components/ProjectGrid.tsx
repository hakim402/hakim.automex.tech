"use client";

import { useState } from "react";
import { FolderCode } from "lucide-react";
import ProjectCard from "@/components/shared/ProjectCard";
import type { ContentItem } from "@/lib/content";

interface Props {
  projects: ContentItem[];
  categories: string[];
}

export default function ProjectGrid({ projects, categories }: Props) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.meta.category === active);

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

      {/* Trace-rule divider */}
      <div className="trace-rule mb-12" />

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border-strong bg-background-elevated p-16 text-center">
          <FolderCode className="mx-auto h-10 w-10 text-muted" />
          <p className="mt-4 text-muted">
            No case studies yet. Add .mdx files to src/content/projects/.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              meta={project.meta}
            />
          ))}
        </div>
      )}
    </>
  );
}
