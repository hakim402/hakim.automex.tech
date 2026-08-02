import type { Metadata } from "next";
import ProjectGrid from "./_components/ProjectGrid";
import { getAllContent, getCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "In-depth engineering case studies — software architecture, system design, AI integration, and enterprise development.",
};

export default function ProjectsPage() {
  const projects = getAllContent("projects");
  const categories = getCategories("projects");

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="mb-12 reveal">
        <span className="mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent-secondary">
          Portfolio
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Case Studies
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Deep dives into software architecture, system design, and engineering decisions behind real-world applications.
        </p>
      </div>

      <ProjectGrid projects={projects} categories={categories} />
    </div>
  );
}
