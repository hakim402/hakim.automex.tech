export default function SkillBadge({ skill, variant = "default" }: { skill: string; variant?: "default" | "primary" }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${variant === "primary" ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}`}>{skill}</span>;
}
