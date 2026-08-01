"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Theme configs matching Schematic design tokens                      */
/* ------------------------------------------------------------------ */

const DARK_THEME = {
  theme: "dark",
  themeVariables: {
    primaryColor: "#f2a93b",
    primaryTextColor: "#e8ecf2",
    primaryBorderColor: "#2a3644",
    lineColor: "#35d0c0",
    secondaryColor: "#10151f",
    tertiaryColor: "#1e2733",
    background: "#0a0e14",
    mainBkg: "#10151f",
    nodeBorder: "#2a3644",
    clusterBkg: "#10151f",
    clusterBorder: "#2a3644",
    titleColor: "#e8ecf2",
    edgeLabelBackground: "#0a0e14",
  },
};

const LIGHT_THEME = {
  theme: "default",
  themeVariables: {
    primaryColor: "#d97706",
    primaryTextColor: "#1a1f2e",
    primaryBorderColor: "#d1d5db",
    lineColor: "#0891b2",
    secondaryColor: "#f9fafb",
    tertiaryColor: "#f3f4f6",
    background: "#ffffff",
    mainBkg: "#f9fafb",
    nodeBorder: "#d1d5db",
    clusterBkg: "#f9fafb",
    clusterBorder: "#d1d5db",
    titleColor: "#1a1f2e",
    edgeLabelBackground: "#ffffff",
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function getThemeConfig() {
  if (typeof document === "undefined") return LIGHT_THEME;
  return document.documentElement.classList.contains("dark")
    ? DARK_THEME
    : LIGHT_THEME;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

interface Props {
  source: string;
}

export function MermaidDiagram({ source }: Props) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const mountedRef = useRef(true);
  const renderRef = useRef<(() => Promise<void>) | undefined>(undefined);

  const doRender = async () => {
    const mermaid = (window as unknown as Record<string, unknown>).mermaid as
      | { initialize: (c: unknown) => void; render: (id: string, src: string) => Promise<{ svg: string }> }
      | undefined;

    if (!mermaid) {
      // Library hasn't loaded yet – retry after a short delay.
      // This can happen if the <Script> loads after the component mounts.
      setTimeout(() => { if (mountedRef.current) doRender(); }, 200);
      return;
    }

    try {
      mermaid.initialize({ startOnLoad: false, ...getThemeConfig() });

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      const { svg: result } = await mermaid.render(id, source.trim());

      if (mountedRef.current) {
        setSvg(result);
        setError(false);
      }
    } catch (err) {
      console.error("[MermaidDiagram] render failed", err);
      if (mountedRef.current) setError(true);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    renderRef.current = doRender;

    // Initial render
    doRender();

    // Re-render when theme toggles
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "class") {
          renderRef.current?.();
          break;
        }
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      mountedRef.current = false;
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  /* ---- Error state ---- */
  if (error) {
    return (
      <pre className="my-10 overflow-x-auto rounded-lg border border-border bg-background-elevated p-6">
        <code className="language-mermaid text-sm">{source}</code>
      </pre>
    );
  }

  /* ---- Loading state ---- */
  if (!svg) {
    return (
      <div className="my-10 overflow-hidden rounded-lg border border-border bg-background-elevated px-5 py-10 text-center">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          Rendering diagram&hellip;
        </span>
      </div>
    );
  }

  /* ---- Rendered diagram ---- */
  return (
    <figure className="my-10 overflow-hidden rounded-lg border border-border bg-background-elevated">
      <div className="flex items-center justify-between border-b border-border px-5 py-2.5">
        <span
          className="font-mono text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--accent-secondary)" }}
        >
          Diagram
        </span>
        <span className="font-mono text-[10px]" style={{ color: "var(--muted)" }}>
          Mermaid
        </span>
      </div>
      <div
        className="overflow-x-auto p-6 flex justify-center"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  MermaidPre – intercepts <pre> in MDX, routes mermaid blocks        */
/* ------------------------------------------------------------------ */

/**
 * Drop-in replacement for the <pre> element in MDX rendering.
 * When the child <code> has class "language-mermaid", it renders
 * a MermaidDiagram instead of a raw code block.
 */
export function MermaidPre({ children, ...props }: Record<string, unknown>) {
  const codeChild = (children as { props?: { className?: string; children?: unknown } })?.props;

  if (typeof codeChild?.className === "string" && codeChild.className.includes("language-mermaid")) {
    const source = String(codeChild.children ?? "").replace(/\n$/, "");
    return <MermaidDiagram source={source} />;
  }

  return <pre {...props}>{children as React.ReactNode}</pre>;
}

export default MermaidDiagram;
