import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

export interface ContentMeta {
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  summary: string;
  description?: string;
  keywords?: string;
  url?: string;
  repo?: string;
  issuer?: string;
  journal?: string;
  authors?: string[];
  ogImage?: string;
  readingTime?: number;
  canonicalUrl?: string;
  jsonLd?: Record<string, unknown>[];
}

export interface ContentItem {
  slug: string;
  meta: ContentMeta;
  html: string;
  mdxSource: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export function getContentSlugs(type: string): string[] {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md")).map((f) => f.replace(/\.mdx?$/, ""));
}

export function getContentBySlug(type: string, slug: string): ContentItem | null {
  const dir = path.join(CONTENT_ROOT, type);
  let filePath = path.join(dir, slug + ".mdx");
  if (!fs.existsSync(filePath)) {
    filePath = path.join(dir, slug + ".md");
    if (!fs.existsSync(filePath)) return null;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const processor = remark().use(remarkGfm).use(remarkHtml, { sanitize: false });
  const html = processor.processSync(content).toString();
  return {
    slug,
    meta: {
      title: data.title || slug,
      slug: data.slug || slug,
      date: data.date || "",
      category: data.category || "general",
      tags: data.tags || [],
      image: data.image || "",
      featured: data.featured || false,
      summary: data.summary || "",
      description: data.description,
      keywords: data.keywords,
      url: data.url,
      repo: data.repo,
      issuer: data.issuer,
      journal: data.journal,
      authors: data.authors,
      ogImage: data.ogImage,
      readingTime: data.readingTime,
      canonicalUrl: data.canonicalUrl,
      jsonLd: data.jsonLd,
    },
    html,
    mdxSource: content,
  };
}

export function getAllContent(type: string): ContentItem[] {
  const slugs = getContentSlugs(type);
  return slugs.map((slug) => getContentBySlug(type, slug)).filter((item): item is ContentItem => item !== null).sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export function getFeaturedContent(type: string, limit = 3): ContentItem[] {
  return getAllContent(type).filter((item) => item.meta.featured).slice(0, limit);
}

export function getCategories(type: string): string[] {
  const cats = new Set(getAllContent(type).map((item) => item.meta.category));
  return Array.from(cats).sort();
}
