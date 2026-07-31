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
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-accent">
            Portfolio
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Case Studies
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Deep dives into software architecture, system design, and engineering decisions behind real-world applications.
        </p>
      </div>

      <ProjectGrid projects={projects} categories={categories} />
    </div>
  );
}
