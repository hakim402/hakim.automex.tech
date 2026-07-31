"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

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

/** Subtle floating particle dots on a canvas backdrop */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }[] = [];

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    function draw() {
      if (!canvas || !ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);
      const style = getComputedStyle(document.documentElement);
      const color =
        style.getPropertyValue("--accent-secondary").trim() || "#35d0c0";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > cw) p.vx *= -1;
        if (p.y < 0 || p.y > ch) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.globalAlpha = 0.3;
        ctx!.fill();
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = color;
            ctx!.globalAlpha = 0.06 * (1 - dist / 100);
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-blueprint-grid px-6 pb-24 pt-14 sm:pb-36 sm:pt-24">
      {/* Particle field */}
      <ParticleField />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-60 left-1/2 h-150 w-225 -translate-x-1/2 rounded-full bg-accent/5 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-75 w-100 rounded-full bg-accent-secondary/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-20">
          {/* Text column */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left stagger-children">
            {/* Heading with shimmer accent */}
            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Building{" "}
              <span className="shimmer">tomorrow&apos;s infrastructure</span>,
              one system at a time
            </h1>

            {/* Trace underline */}
            <div className="trace-rule mt-4 h-0.5 w-24" />

            {/* Subtitle */}
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              Full-stack engineer crafting scalable systems, ML pipelines, and
              cloud infrastructure. Pursuing graduate studies in Canada to push
              the boundaries of distributed systems and applied machine
              learning.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent-secondary hover:text-background hover:shadow-accent-secondary/30 hover:-translate-y-0.5"
              >
                View Case Studies
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background-elevated px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent-secondary hover:text-accent-secondary hover:-translate-y-0.5"
              >
                Get in Touch
              </Link>
              <a
                href="/cv/Hakimullah_Rahimi_Safi_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>

            {/* Social + location */}
            <div className="flex items-center gap-5 pt-5">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <span className="inline-flex items-center gap-1 text-xs text-muted">
                <MapPin className="h-3 w-3 text-accent-secondary" />
                Afghanistan
              </span>
            </div>
          </div>

          {/* Visual column */}
          <div className="relative flex-1">
            {/* Glow-border card */}
            <div className="float glow-border relative mx-auto aspect-square max-w-95 overflow-hidden rounded-2xl border border-border/50 bg-background-elevated p-1">
              {/* Blueprint SVG overlay */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 380 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="24"
                  y="24"
                  width="332"
                  height="332"
                  rx="12"
                  className="trace-line"
                  stroke="var(--accent-secondary)"
                  strokeWidth="1"
                  strokeOpacity="0.35"
                  strokeDasharray="1100"
                />
                <line
                  x1="24"
                  y1="24"
                  x2="356"
                  y2="356"
                  className="trace-line"
                  stroke="var(--border-strong)"
                  strokeWidth="0.5"
                  strokeOpacity="0.25"
                  strokeDasharray="850"
                  style={{ animationDelay: "0.3s" }}
                />
                <line
                  x1="356"
                  y1="24"
                  x2="24"
                  y2="356"
                  className="trace-line"
                  stroke="var(--border-strong)"
                  strokeWidth="0.5"
                  strokeOpacity="0.25"
                  strokeDasharray="850"
                  style={{ animationDelay: "0.3s" }}
                />
                {/* Center hub */}
                <circle
                  cx="190"
                  cy="190"
                  r="45"
                  className="trace-line"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeOpacity="0.45"
                  strokeDasharray="650"
                  fill="var(--accent)"
                  fillOpacity="0.04"
                />
                {/* Radial connections */}
                <line
                  x1="190"
                  y1="145"
                  x2="190"
                  y2="72"
                  className="trace-line"
                  stroke="var(--accent-secondary)"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  strokeDasharray="450"
                  style={{ animationDelay: "0.6s" }}
                />
                <line
                  x1="190"
                  y1="235"
                  x2="190"
                  y2="308"
                  className="trace-line"
                  stroke="var(--accent-secondary)"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  strokeDasharray="450"
                  style={{ animationDelay: "0.6s" }}
                />
                <line
                  x1="145"
                  y1="190"
                  x2="72"
                  y2="190"
                  className="trace-line"
                  stroke="var(--accent-secondary)"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  strokeDasharray="450"
                  style={{ animationDelay: "0.6s" }}
                />
                <line
                  x1="235"
                  y1="190"
                  x2="308"
                  y2="190"
                  className="trace-line"
                  stroke="var(--accent-secondary)"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  strokeDasharray="450"
                  style={{ animationDelay: "0.6s" }}
                />
                {/* Node points */}
                <circle
                  cx="190"
                  cy="72"
                  r="3"
                  fill="var(--accent-secondary)"
                  fillOpacity="0.6"
                />
                <circle
                  cx="190"
                  cy="308"
                  r="3"
                  fill="var(--accent-secondary)"
                  fillOpacity="0.6"
                />
                <circle
                  cx="72"
                  cy="190"
                  r="3"
                  fill="var(--accent-secondary)"
                  fillOpacity="0.6"
                />
                <circle
                  cx="308"
                  cy="190"
                  r="3"
                  fill="var(--accent-secondary)"
                  fillOpacity="0.6"
                />
                {/* Labels */}
                <text
                  x="190"
                  y="64"
                  textAnchor="middle"
                  className="mono"
                  fill="var(--muted)"
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                >
                  CLOUD
                </text>
                <text
                  x="190"
                  y="322"
                  textAnchor="middle"
                  className="mono"
                  fill="var(--muted)"
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                >
                  DATA
                </text>
                <text
                  x="64"
                  y="194"
                  textAnchor="middle"
                  className="mono"
                  fill="var(--muted)"
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                >
                  API
                </text>
                <text
                  x="316"
                  y="194"
                  textAnchor="middle"
                  className="mono"
                  fill="var(--muted)"
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                >
                  ML
                </text>
                <text
                  x="190"
                  y="194"
                  textAnchor="middle"
                  className="mono"
                  fill="var(--accent)"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                >
                  SYS
                </text>
              </svg>

              {/* Profile image with hover reveal */}
              <img
                src="/images/hakim/hakimrs.jpeg"
                alt="Profile"
                className="relative z-10 h-full w-full rounded-xl object-cover opacity-0 mix-blend-luminosity grayscale transition-all duration-1000 hover:opacity-100 hover:mix-blend-normal hover:grayscale-0"
                loading="eager"
              />
            </div>

            {/* Floating stat card — top right */}
            <div
              className="absolute -right-4 -top-4 rounded-xl border border-border bg-background-elevated px-5 py-4 shadow-2xl reveal"
              style={{ animationDelay: "1s" }}
            >
              <p className="mono text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
                Projects
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-foreground">
                3+
              </p>
              <p className="mt-0.5 text-[11px] text-muted">
                Production systems
              </p>
            </div>

            {/* Floating stat card — bottom left */}
            <div
              className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-background-elevated px-5 py-4 shadow-2xl reveal"
              style={{ animationDelay: "1.3s" }}
            >
              <p className="mono text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
                Target
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-foreground">
                M.Sc.
              </p>
              <p className="mt-0.5 text-[11px] text-muted">Computer Science</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
