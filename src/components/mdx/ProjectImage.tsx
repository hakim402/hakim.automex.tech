"use client";

interface ProjectImageProps {
  title: string;
  src: string;
  alt?: string;
  caption?: string;
}

export default function ProjectImage({ title, src, alt, caption }: ProjectImageProps) {
  return (
    <figure className="my-10 overflow-hidden rounded-lg border border-border bg-background-elevated">
      <div className="relative flex aspect-video items-center justify-center bg-background">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || title}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            // Show placeholder on load failure
            const el = e.currentTarget;
            el.style.display = "none";
            const placeholder = el.nextElementSibling as HTMLElement | null;
            if (placeholder) placeholder.style.display = "flex";
          }}
        />
        <div
          className="absolute inset-0 hidden flex-col items-center justify-center gap-3 bg-background-elevated"
        >
          <div className="rounded-md border border-border-strong bg-background px-4 py-2 font-mono text-xs text-muted">
            {title}
          </div>
          <span className="text-xs text-muted">Image placeholder replace with screenshot</span>
        </div>
      </div>
      {(caption || title) && (
        <figcaption className="border-t border-border px-5 py-3">
          <p className="text-sm font-medium text-foreground">{title}</p>
          {caption && <p className="mt-0.5 text-xs text-muted">{caption}</p>}
        </figcaption>
      )}
    </figure>
  );
}
