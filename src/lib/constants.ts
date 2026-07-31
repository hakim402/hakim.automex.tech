export const SITE = {
  name: "Hakim Rahimi Safi Portfolio",
  title: "Hakimullah Rahimi Safi - Portfolio",
  description: "Showcasing skills, project case studies, certifications, publications, and achievements from my master's degree journey in Canada with Hakimullah Rahimi Safi.",
  url: "https://hakim.automex.tech",
  locale: "en-CA",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/publications", label: "Publications" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
];

export const SKILLS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Tailwind CSS", "Python", "SQL", "Git", "Docker",
  "REST APIs", "GraphQL", "MongoDB", "PostgreSQL", "AWS",
];

export const SOCIAL_LINKS = {
  github: "https://github.com/hakim402",
  linkedin: "https://www.linkedin.com/in/hakim-rahimi-safi-a88791255",
  email: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hakim@automex.tech"}`,
};

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hakim@automex.tech";
