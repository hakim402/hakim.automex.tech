export default function SkillBadge({
  skill,
  variant = "default",
}: {
  skill: string;
  variant?: "default" | "primary";
}) {
  return (
    <span
      className={`mono inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
        variant === "primary"
          ? "border-accent/30 bg-accent/10 text-accent hover:border-accent/60"
          : "border-border bg-background-elevated text-muted hover:border-accent-secondary/50 hover:text-accent-secondary"
      }`}
    >
      {variant === "primary" && (
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      )}
      {skill}
    </span>
  );
}