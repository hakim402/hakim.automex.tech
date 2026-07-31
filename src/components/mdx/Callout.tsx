import { AlertTriangle, Info, Lightbulb, CheckCircle2 } from "lucide-react";

type CalloutType = "info" | "warning" | "tip" | "success";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  info: {
    icon: Info,
    color: "text-accent-secondary",
    bg: "bg-accent-secondary/5",
    border: "border-accent-secondary/20",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-accent",
    bg: "bg-accent/5",
    border: "border-accent/20",
  },
  tip: {
    icon: Lightbulb,
    color: "text-accent",
    bg: "bg-accent/5",
    border: "border-accent/20",
  },
  success: {
    icon: CheckCircle2,
    color: "text-accent-secondary",
    bg: "bg-accent-secondary/5",
    border: "border-accent-secondary/20",
  },
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon: Icon, color, bg, border } = config[type];

  return (
    <aside className={`my-8 rounded-lg border ${border} ${bg} p-5`}>
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${color}`} />
        <div className="min-w-0 space-y-1">
          {title && <p className={`text-sm font-semibold ${color}`}>{title}</p>}
          <div className="text-sm leading-relaxed text-muted [&>p]:my-0">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
