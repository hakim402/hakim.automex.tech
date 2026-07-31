/**
 * Mermaid Diagram Renderer for static export.
 *
 * Loaded via next/script with afterInteractive strategy.
 * Uses MutationObserver to catch code blocks after React
 * hydrates the RSC payload into real DOM elements.
 *
 * Theme-aware: respects .dark / .light class on <html>,
 * re-renders diagrams when the theme toggles.
 */
(function () {
  "use strict";

  if (typeof mermaid === "undefined") {
    console.warn("[mermaid-renderer] mermaid not loaded");
    return;
  }

  /** Theme configs matching Schematic design tokens */
  var DARK_THEME = {
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

  var LIGHT_THEME = {
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

  function isDark() {
    return document.documentElement.classList.contains("dark");
  }

  function getThemeConfig() {
    return isDark() ? DARK_THEME : LIGHT_THEME;
  }

  /**
   * Re-initialize mermaid with the current theme and re-process all blocks.
   * Safe to call multiple times — processed blocks are tracked via
   * data-mermaid-done and rendered figures via data-mermaid-rendered.
   */
  function renderAll() {
    mermaid.initialize(getThemeConfig());

    var blocks = document.querySelectorAll(
      "code.language-mermaid:not([data-mermaid-done])"
    );

    for (var i = 0; i < blocks.length; i++) {
      processBlock(blocks[i]);
    }
  }

  /**
   * Replace a single <code class="language-mermaid"> block (inside a <pre>)
   * with a styled <figure> containing the rendered SVG.
   */
  function processBlock(el) {
    var pre = el.closest("pre");
    if (!pre) return;
    var raw = el.textContent || "";
    el.setAttribute("data-mermaid-done", "true");

    var id = "mermaid-" + Math.random().toString(36).slice(2, 9);
    mermaid
      .render(id, raw.trim())
      .then(function (result) {
        var figure = document.createElement("figure");
        figure.className =
          "my-10 overflow-hidden rounded-lg border border-border bg-background-elevated";
        // Store the raw mermaid source + render id so we can re-render
        figure.setAttribute("data-mermaid-rendered", id);
        figure.setAttribute("data-mermaid-source", raw.trim());

        var header = document.createElement("div");
        header.className =
          "flex items-center justify-between border-b border-border px-5 py-2.5";
        header.innerHTML =
          '<span class="font-mono text-xs font-medium uppercase tracking-wider" style="color:var(--accent-secondary)">Diagram</span>' +
          '<span class="font-mono text-[10px]" style="color:var(--muted)">Mermaid</span>';

        var body = document.createElement("div");
        body.className = "overflow-x-auto p-6 flex justify-center";
        body.innerHTML = result.svg;

        figure.appendChild(header);
        figure.appendChild(body);
        pre.replaceWith(figure);
      })
      .catch(function () {
        // leave raw block visible on render failure
      });
  }

  /**
   * Tear down all rendered diagrams back to raw <pre><code> blocks,
   * then re-render with the current theme.
   */
  function reRenderAll() {
    var rendered = document.querySelectorAll("[data-mermaid-rendered]");
    for (var r = 0; r < rendered.length; r++) {
      var figure = rendered[r];
      var source = figure.getAttribute("data-mermaid-source") || "";

      var pre = document.createElement("pre");
      var code = document.createElement("code");
      code.className = "language-mermaid";
      code.textContent = source;
      pre.appendChild(code);

      figure.replaceWith(pre);
    }

    renderAll();
  }

  // === Initial render ===
  renderAll();

  // === Watch for blocks that appear later (React hydration) ===
  var contentObserver = new MutationObserver(function (mutations) {
    for (var m = 0; m < mutations.length; m++) {
      var addedNodes = mutations[m].addedNodes;
      for (var n = 0; n < addedNodes.length; n++) {
        var node = addedNodes[n];
        if (node.nodeType !== 1) continue;

        if (
          node.matches &&
          node.matches("code.language-mermaid:not([data-mermaid-done])")
        ) {
          processBlock(node);
        }

        if (node.querySelectorAll) {
          var nested = node.querySelectorAll(
            "code.language-mermaid:not([data-mermaid-done])"
          );
          for (var k = 0; k < nested.length; k++) {
            processBlock(nested[k]);
          }
        }
      }
    }
  });

  contentObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // === Watch for theme changes on <html> ===
  var themeObserver = new MutationObserver(function () {
    reRenderAll();
  });

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
})();
