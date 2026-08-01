"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { ArrowRight, Download, ExternalLink, Mail, MapPin } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

const ROLES = [
  "Full-Stack Developer",
  "Chief Technology Officer",
  "Founder",
  "Aspiring AI/Security Researcher",
];

const COMPANIES: { name: string; href?: string; favicon?: string }[] = [
  {
    name: "JAHEZ TRADE CO",
    href: "https://jahez.online/en",
    favicon: "https://www.google.com/s2/favicons?domain=jahez.online&sz=64",
  },
  {
    name: "IDWE",
    href: "https://idwe.tech/",
    favicon: "https://www.google.com/s2/favicons?domain=idwe.tech&sz=64",
  },
  {
    name: "AUTOMEX",
    href: "https://automex.tech/en",
    favicon: "https://www.google.com/s2/favicons?domain=automex.tech&sz=64",
  },
  {
    name: "Infinity Enterprise Solutions",
    href: "https://infinity-solutions.pro/",
    favicon:
      "https://www.google.com/s2/favicons?domain=infinity-solutions.pro&sz=64",
  },
];

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

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/** Photo card that tilts gently toward the cursor — disabled for prefers-reduced-motion */
function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.01)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
  }

  return (
    <div
      className="float w-full max-w-sm"
      style={{ perspective: "900px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="glow-border relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/50 bg-background-elevated transition-transform duration-200 ease-out will-change-transform"
      >
        <img
          src="/images/hakim/hakim2.png"
          alt="Hakimullah Rahimi Safi"
          className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />

        {/* Blueprint corner ticks */}
        <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-accent-secondary/60" />
        <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-accent-secondary/60" />
        <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-accent-secondary/60" />
        <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-accent-secondary/60" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-14 sm:pt-20">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          <div className="flex flex-1 flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Text column */}
            <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left stagger-children">
              <span className="mono text-[11px] uppercase tracking-[0.2em] text-accent-secondary">
                Hello, I&apos;m
              </span>

              <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                Hakimullah <span className="shimmer">Rahimi Safi</span>
              </h1>

              {/* Mobile-only role line */}
              <p className="mono mt-3 text-xs uppercase tracking-wide text-muted lg:hidden">
                {ROLES.join(" · ")}
              </p>

              <div className="trace-rule mt-5 h-0.5 w-16" />

              <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                4+ years shipping enterprise platforms and secure web
                applications as a CTO and founder now preparing for graduate
                research in Artificial Intelligence and Cybersecurity.
              </p>

              {/* CTAs — one primary, one secondary text link */}
              <div className="flex items-center gap-3 pt-6">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent-secondary hover:text-background sm:px-6 sm:py-3 sm:text-sm"
                >
                  Explore Case Studies
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="/cv/Hakimullah_Rahimi_Safi_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-2.5 text-xs font-medium text-muted transition-colors hover:text-foreground sm:px-3 sm:py-3 sm:text-sm"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </div>

              <span className="mt-5 inline-flex items-center gap-1 text-xs text-muted">
                <MapPin className="h-3 w-3 text-accent-secondary" />
                Kabul, Afghanistan
              </span>
            </div>

            {/* Role rail — divider between text and photo, desktop only */}
            <div className="hidden shrink-0 flex-col justify-center gap-5 lg:flex">
              {ROLES.map((role, i) => (
                <div key={role} className="flex items-center gap-3">
                  <span
                    className={`h-px w-6 ${i === 0 ? "bg-accent" : "bg-border"}`}
                  />
                  <span
                    className={`mono whitespace-nowrap text-[11px] uppercase tracking-[0.15em] ${
                      i === 0 ? "text-accent" : "text-muted"
                    }`}
                  >
                    {role}
                  </span>
                </div>
              ))}
            </div>

            {/* Photo column with connector badges + status pill */}
            <div className="relative flex flex-1 justify-center pb-8 lg:justify-end lg:pb-0">
              <TiltCard />

              {/* Connector — GitHub, top-left */}
              <div className="absolute -left-2 top-8 hidden items-center gap-2 sm:flex">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background-elevated text-muted transition-colors hover:border-accent-secondary hover:text-accent-secondary"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <span className="h-px w-8 bg-border" />
              </div>

              {/* Connector — LinkedIn, mid-right */}
              <div className="absolute -right-2 top-1/3 hidden items-center gap-2 sm:flex">
                <span className="h-px w-8 bg-border" />
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background-elevated text-muted transition-colors hover:border-accent-secondary hover:text-accent-secondary"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>

              {/* Connector — Email, bottom-left */}
              <div className="absolute -left-2 bottom-24 hidden items-center gap-2 sm:flex">
                <a
                  href={SOCIAL_LINKS.email}
                  aria-label="Email"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background-elevated text-muted transition-colors hover:border-accent-secondary hover:text-accent-secondary"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <span className="h-px w-8 bg-border" />
              </div>

              {/* Status pill */}
              <div
                className="relative mt-4 w-full max-w-sm rounded-xl border border-border bg-background-elevated px-5 py-4 shadow-2xl reveal lg:absolute lg:-bottom-6 lg:-right-6 lg:mt-0 lg:w-72"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent-secondary" />
                  <p className="mono text-[10px] uppercase tracking-[0.15em] text-accent-secondary">
                    Open to
                  </p>
                </div>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Research collaborations &amp; grad programs
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  Applying Fall 2026 · Canada / USA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Proof strip */}
        <div className="trace-rule mt-20 border-t border-border pt-8 sm:mt-24">
          <p className="mono mb-4 text-center text-[10px] uppercase tracking-[0.2em] text-muted lg:text-left">
            Built for / founded
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-start mb-2">
            {COMPANIES.map((company) =>
              company.href ? (
                <a
                  key={company.name}
                  href={company.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono group flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-secondary"
                >
                  {company.favicon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={company.favicon}
                      alt=""
                      className="h-4 w-4 rounded-sm"
                      loading="lazy"
                    />
                  )}
                  {company.name}
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ) : (
                <span key={company.name} className="mono text-sm text-muted/70">
                  {company.name}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-14 flex flex-col items-center gap-2">
          <span className="mono text-[10px] uppercase tracking-[0.3em] text-muted">
            Scroll
          </span>
          <span className="h-8 w-px animate-pulse bg-border-strong" />
        </div>
      </div>
    </section>
  );
}
