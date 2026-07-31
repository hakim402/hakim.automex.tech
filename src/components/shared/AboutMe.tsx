import {
  Code2,
  Database,
  Cloud,
  Cpu,
  FlaskConical,
  Layers,
  GraduationCap,
  MapPin,
  Globe2,
  Building2,
  Award,
  Star,
  Briefcase,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";

const strengths = [
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    desc: "TypeScript, React, Next.js, Node.js — end-to-end ownership from pixel to database.",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    desc: "AWS, Docker, Kubernetes, Terraform — multi-cloud CI/CD at production scale.",
  },
  {
    icon: Cpu,
    title: "Machine Learning",
    desc: "Python, scikit-learn, XGBoost — shipped models that saved $1.2M annually.",
  },
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
    icon: Globe2,
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

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent-secondary">
            About Me
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Engineer. Researcher.{" "}
            <span className="text-accent">Future Grad Student.</span>
          </h2>
          <div className="trace-rule mx-auto mt-5 h-px w-20" />
        </div>

        {/* Two-column bio + image */}
        <div className="mb-20 flex flex-col items-center gap-16 lg:flex-row lg:items-start">
          {/* Bio */}
          <div className="flex-1 space-y-5 text-base leading-relaxed text-muted">
            <p>
              {" "}
              I&apos;m a full-stack software engineer, software architect, and
              entrepreneur passionate about building enterprise applications,
              AI-powered solutions, and scalable cloud systems. Over the past
              four years, I&apos;ve designed and developed production-ready web
              platforms, enterprise software, intelligent automation tools, and
              secure backend systems using modern technologies such as Next.js,
              TypeScript, PostgreSQL, Prisma, and AI APIs. My focus is on
              creating reliable, maintainable, and user-centric software that
              solves real-world business challenges.{" "}
            </p>{" "}
            <p>
              {" "}
              I&apos;m currently preparing for graduate studies in Computer
              Science in Canada or the United States, where I aim to advance my
              research in{" "}
              <strong className="text-foreground">Agentic AI</strong>,{" "}
              <strong className="text-foreground">Software Engineering</strong>,{" "}
              <strong className="text-foreground">Distributed Systems</strong>,
              and{" "}
              <strong className="text-foreground">
                Enterprise AI Applications
              </strong>
              . My long-term vision is to bridge academic research and industry
              by building intelligent systems that automate business operations
              and deliver meaningful real-world impact.{" "}
            </p>{" "}
            <p>
              {" "}
              This portfolio documents my journey from Information Systems
              student to CTO, founder, and software engineer, showcasing the
              projects I&apos;ve built, the challenges I&apos;ve solved, and my
              continued pursuit of innovation, technical excellence, and
              lifelong learning.{" "}
            </p>
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: GraduationCap, label: "Target", value: "M.Sc. CS" },
                { icon: MapPin, label: "Location", value: "Canada" },
                { icon: Globe2, label: "Focus", value: "Systems + ML" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-background-elevated p-4 text-center transition-colors hover:border-accent-secondary/50"
                >
                  <Icon className="mx-auto mb-1 h-4 w-4 text-accent-secondary" />
                  <p className="mono text-[9px] font-medium uppercase tracking-wider text-muted">
                    {label}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-foreground">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image + strengths */}
          <div className="flex-1 space-y-6">
            {/* Profile image */}
            <div className="glow-border relative overflow-hidden rounded-2xl border border-border">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
                alt="Workspace"
                className="h-56 w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-accent-secondary animate-pulse" />
                <span className="mono text-[10px] font-medium uppercase tracking-[0.15em] text-accent-secondary">
                  Canada &middot; MST
                </span>
              </div>
            </div>

            {/* Strengths cards */}
            <div className="space-y-3">
              {strengths.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-xl border border-border bg-background-elevated p-4 transition-all hover:border-accent-secondary/40 hover:-translate-y-0.5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-secondary/10">
                    <Icon className="h-5 w-5 text-accent-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic & Professional Journey */}
        <div>
          <div className="mb-10 text-center">
            <span className="mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent-secondary">
              Journey
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
              Academic &amp; Professional Timeline
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
              From IT education to founding AI companies a path of continuous
              growth.
            </p>
          </div>

          <div className="relative mx-auto max-w-2xl">
            {/* Vertical line */}
            <div className="absolute left-5.75 top-0 h-full w-px bg-border" />

            <div className="space-y-0">
              {milestones.map((item) => {
                const cat = categoryMeta[item.category];
                const CatIcon = cat.icon;

                const isCompleted = item.status === "completed";
                const isCurrent = item.status === "current";
                const isFuture = item.status === "future";

                return (
                  <div
                    key={item.year + item.title}
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
