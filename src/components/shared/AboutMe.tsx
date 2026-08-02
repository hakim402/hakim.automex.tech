"use client";

import { useEffect, useRef, useState } from "react";
import {
  Code2,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Award,
  Star,
  Briefcase,
  Rocket,
  Target,
  Cpu,
} from "lucide-react";

/** Fades a block up into place the first time it scrolls into view. */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const strengths = [
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    desc: "Next.js, React, Laravel, Django end-to-end platforms from database to deployment.",
  },
  {
    icon: Sparkles,
    title: "Applied AI & NLP",
    desc: "Recommendation engines, automated text generation, and conversational agents shipped to production.",
  },
  {
    icon: ShieldCheck,
    title: "Application Security",
    desc: "OWASP Top 10 audits, JWT/RBAC authentication, and CI/CD vulnerability scanning.",
  },
];

const stats = [
  { value: "4+", label: "Years building" },
  { value: "3", label: "Companies / roles led" },
  { value: "9+", label: "Milestones & certs" },
];

type MilestoneCategory =
  | "Education"
  | "Career"
  | "Startup"
  | "Achievement"
  | "Future";

interface Milestone {
  year: string;
  title: string;
  desc: string;
  category: MilestoneCategory;
  status: "completed" | "current" | "future";
  highlighted?: boolean;
  icon: React.ElementType;
}

const categoryMeta: Record<
  MilestoneCategory,
  { icon: React.ElementType; className: string }
> = {
  Education: {
    icon: GraduationCap,
    className:
      "border-accent-secondary/20 bg-accent-secondary/5 text-accent-secondary",
  },
  Career: {
    icon: Briefcase,
    className: "border-accent/20 bg-accent/5 text-accent",
  },
  Startup: {
    icon: Rocket,
    className: "border-accent/20 bg-accent/5 text-accent",
  },
  Achievement: {
    icon: Award,
    className:
      "border-accent-secondary/20 bg-accent-secondary/5 text-accent-secondary",
  },
  Future: {
    icon: Rocket,
    className: "border-border bg-background text-muted",
  },
};

const milestones: Milestone[] = [
  {
    year: "2020",
    title: "Began IT Education",
    desc: "Started studying Database Systems & Information Systems at CTI Institute.",
    category: "Education",
    status: "completed",
    icon: GraduationCap,
  },
  {
    year: "2022",
    title: "Graduated from CTI Institute",
    desc: "Earned First Position with approximately 90% overall score in Information Systems.",
    category: "Achievement",
    status: "completed",
    highlighted: true,
    icon: Award,
  },
  {
    year: "2023",
    title: "Kabul University Admission",
    desc: "Passed the Afghan National Kankor Exam with 170/200 and enrolled in Information Systems at Kabul University.",
    category: "Achievement",
    status: "completed",
    icon: Star,
  },
  {
    year: "2023",
    title: "Started Freelancing on Upwork",
    desc: "Built end-to-end web and mobile apps with React, Django, Laravel, Next.js, and Flutter, integrating AI/ML solutions for clients.",
    category: "Career",
    status: "completed",
    icon: Code2,
  },
  {
    year: "2025",
    title: "Bachelor's Graduation",
    desc: "Graduated from Kabul University with a Bachelor's degree in Information Systems.",
    category: "Education",
    status: "completed",
    icon: GraduationCap,
  },
  {
    year: "2025",
    title: "Chief Technology Officer",
    desc: "Joined IDWE as CTO, leading software architecture, full-stack development, AI integration, and engineering teams.",
    category: "Career",
    status: "completed",
    highlighted: true,
    icon: Briefcase,
  },
  {
    year: "2026",
    title: "Joined JAHEZ Trade Co",
    desc: "Full-Stack Developer & Digital Operations Specialist, designing and maintaining full-stack applications and internal tools.",
    category: "Career",
    status: "completed",
    icon: Briefcase,
  },
  {
    year: "2026",
    title: "Founded Infinity Enterprise",
    desc: "Established Infinity Enterprise Solution in Afghanistan, focused on enterprise software and digital transformation.",
    category: "Startup",
    status: "completed",
    highlighted: true,
    icon: Rocket,
  },
  {
    year: "2026",
    title: "Founded AUTOMEX",
    desc: "Launched AUTOMEX in the United States, building AI-powered enterprise software and intelligent automation solutions.",
    category: "Startup",
    status: "completed",
    highlighted: true,
    icon: Sparkles,
  },
  {
    year: "2026\u20132027",
    title: "Master's in Computer Science",
    desc: "Preparing for graduate studies in Computer Science at a Canadian or American university.",
    category: "Future",
    status: "current",
    highlighted: true,
    icon: Target,
  },
  {
    year: "Future",
    title: "Global Agentic AI Company",
    desc: "Expand AUTOMEX into a global Agentic AI company focused on enterprise AI, multi-agent systems, and intelligent automation.",
    category: "Future",
    status: "future",
    icon: Cpu,
  },
];

export default function AboutMe() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Subtle background dots */}
      <div className="pointer-events-none absolute inset-0 bg-particle-dots" />

      {/* Giant faded section numeral — depth, not clutter */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none font-display text-[9rem] font-bold text-foreground/3 sm:text-[13rem]"
      >
        01
      </span>

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <Reveal className="mb-20 text-center">
          <span className="mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent-secondary">
            About Me
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Engineer. Researcher.{" "}
            <span className="text-accent">Future Grad Student.</span>
          </h2>
          <div className="trace-rule mx-auto mt-5 h-px w-20" />
        </Reveal>

        {/* Photo + bio */}
        <div className="mb-24 flex flex-col items-center gap-14 lg:flex-row lg:items-start lg:gap-16">
          {/* Photo, glow-blob treatment, floating tag */}
          <Reveal className="relative w-full max-w-70 shrink-0">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-full bg-accent-secondary/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-8 -right-8 -z-10 h-32 w-32 rounded-full bg-accent/10 blur-3xl"
            />
            <div className="glow-border relative aspect-4/5 overflow-hidden rounded-2xl border border-border/60 bg-background-elevated shadow-2xl">
              <img
                src="/images/hakim/hakim3.png"
                alt="Hakimullah Rahimi Safi"
                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />
            </div>

            {/* Floating role tag */}
            <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-xl border border-border bg-background-elevated px-4 py-3 text-center shadow-xl">
              <p className="mono text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-secondary">
                CTO &amp; Founder
              </p>
              <p className="mt-0.5 text-[11px] text-muted">
                Kabul, Afghanistan
              </p>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal delay={100} className="flex-1 space-y-6 pt-2">
            <p className="font-display text-xl font-medium leading-snug text-foreground sm:text-2xl">
              I build enterprise software and secure systems by day{" "}
              <span className="text-accent">
                and I&apos;m preparing to research the AI and security
                problems behind them
              </span>{" "}
              by trade.
            </p>

            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                Over the past four years I&apos;ve designed and shipped
                production-ready web platforms, enterprise software,
                intelligent automation tools, and secure backend systems using
                Next.js, TypeScript, PostgreSQL, Prisma, and AI APIs as a
                CTO, a two-time founder, and a full-stack developer.
              </p>
              <p>
                I&apos;m now preparing for graduate studies in Computer
                Science in Canada or the United States, to advance my research
                in{" "}
                <strong className="text-foreground">Agentic AI</strong>,{" "}
                <strong className="text-foreground">
                  Software Engineering
                </strong>
                ,{" "}
                <strong className="text-foreground">
                  Distributed Systems
                </strong>
                , and{" "}
                <strong className="text-foreground">
                  Enterprise AI Applications
                </strong>{" "}
                bridging academic research and industry practice.
              </p>
            </div>

            {/* Big stat row */}
            <div className="flex divide-x divide-border pt-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex-1 px-6 text-center first:pl-0 last:pr-0"
                >
                  <p className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mono mt-1 text-[10px] uppercase tracking-widest text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Strengths — horizontal row, cascading in */}
        <div className="mb-24 grid gap-4 sm:grid-cols-3">
          {strengths.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="group h-full rounded-2xl border border-border bg-background-elevated p-6 transition-all hover:-translate-y-1 hover:border-accent-secondary/40 hover:shadow-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-secondary/10 transition-colors group-hover:bg-accent-secondary/20">
                  <Icon className="h-5 w-5 text-accent-secondary" />
                </div>
                <p className="mt-4 text-sm font-semibold text-foreground">
                  {title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Academic & Professional Journey */}
        <div>
          <Reveal className="mb-10 text-center">
            <span className="mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent-secondary">
              Journey
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
              Academic &amp; Professional Timeline
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
              From IT education to founding AI companies a path of
              continuous growth.
            </p>
          </Reveal>

          <div className="relative mx-auto max-w-2xl">
            {/* Vertical line */}
            <div className="absolute left-5.75 top-0 h-full w-px bg-border" />

            <div className="space-y-0">
              {milestones.map((item, i) => {
                const cat = categoryMeta[item.category];
                const CatIcon = cat.icon;

                const isCompleted = item.status === "completed";
                const isCurrent = item.status === "current";
                const isFuture = item.status === "future";

                return (
                  <Reveal
                    key={item.year + item.title}
                    delay={Math.min(i, 6) * 80}
                    className="relative flex gap-5 pb-10 last:pb-0"
                  >
                    {/* Node */}
                    <div className="relative z-10 flex shrink-0 flex-col items-center pt-0.5">
                      <div
                        className={`flex h-11.5 w-11.5 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isCompleted
                            ? item.highlighted
                              ? "border-accent bg-accent/10 text-accent ring-4 ring-accent/5"
                              : "border-accent-secondary/40 bg-accent-secondary/5 text-accent-secondary"
                            : isCurrent
                              ? "border-accent bg-accent/10 text-accent ring-4 ring-accent/10"
                              : "border-border bg-background-elevated text-muted"
                        }`}
                      >
                        {isCurrent && (
                          <span className="absolute inset-0 animate-ping rounded-full border-2 border-accent/30" />
                        )}
                        <item.icon className="relative h-4.5 w-4.5" />
                      </div>
                    </div>

                    {/* Card */}
                    <div
                      className={`min-w-0 flex-1 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                        item.highlighted
                          ? "border-accent/20 bg-accent/5 hover:border-accent/40"
                          : isCompleted
                            ? "border-border bg-background-elevated hover:border-accent-secondary/30"
                            : isCurrent
                              ? "border-accent/30 bg-accent/5 hover:border-accent/50"
                              : "border-border bg-background-elevated opacity-70 hover:opacity-100"
                      }`}
                    >
                      {/* Top row: year + category badge */}
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="mono text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-secondary">
                          {item.year}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium ${cat.className}`}
                        >
                          <CatIcon className="h-2.5 w-2.5" />
                          {item.category}
                        </span>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-medium text-accent">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                            Current Goal
                          </span>
                        )}
                        {isFuture && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted">
                            Vision
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}