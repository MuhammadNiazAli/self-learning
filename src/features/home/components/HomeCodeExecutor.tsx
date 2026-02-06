"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { OnMount } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-130 items-center justify-center rounded-3xl border border-white/10 bg-black text-sm text-white/70">
        Loading editor…
      </div>
    ),
  },
);

type TabKey = "html" | "css" | "js";

const STARTER_HTML = `<div class="card">
  <h2 class="title">Hello</h2>
  <p class="sub">Edit HTML, CSS, JS and see changes instantly.</p>

  <div class="row">
    <button id="btn">Click me</button>
    <span class="hint">Try changing colors, text, or layout.</span>
  </div>

  <p id="out" class="out"></p>
</div>`;

const STARTER_CSS = `:root{
  --bg:#0b0c10;
  --panel: rgba(255,255,255,.04);
  --border: rgba(255,255,255,.12);
  --text: rgba(255,255,255,.92);
  --muted: rgba(255,255,255,.72);
}

*{ box-sizing:border-box; }

body{
  margin:0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  padding:24px;
}

.card{
  max-width: 560px;
  border:1px solid var(--border);
  background: var(--panel);
  border-radius: 16px;
  padding: 16px;
}

.title{ margin:0 0 10px 0; font-size: 22px; letter-spacing: -.2px; }
.sub{ margin:0 0 12px 0; color: var(--muted); }

.row{
  display:flex;
  align-items:center;
  gap:12px;
  flex-wrap: wrap;
}

button{
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.08);
  color: #fff;
  cursor: pointer;
}

button:hover{ background: rgba(255,255,255,.12); }

.hint{
  font-size: 12px;
  color: rgba(255,255,255,.65);
}

.out{
  margin:12px 0 0 0;
  opacity:.9;
  font-size: 13px;
}`;

const STARTER_JS = `const btn = document.getElementById("btn");
const out = document.getElementById("out");

btn?.addEventListener("click", () => {
  out.textContent = "Button clicked at: " + new Date().toLocaleTimeString();
});`;

function buildSrcDoc(html: string, css: string, js: string) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Live Preview</title>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch (e) {
      const pre = document.createElement("pre");
      pre.style.whiteSpace = "pre-wrap";
      pre.style.padding = "12px";
      pre.style.border = "1px solid rgba(255,255,255,.18)";
      pre.style.borderRadius = "12px";
      pre.style.background = "rgba(255,255,255,.06)";
      pre.style.color = "rgba(255,255,255,.92)";
      pre.textContent = "JS Error: " + (e?.message || e);
      document.body.appendChild(pre);
    }
  </script>
</body>
</html>`;
}

const TABS: Array<{
  key: TabKey;
  label: string;
  file: string;
  dotClass: string;
}> = [
  { key: "html", label: "HTML", file: "index.html", dotClass: "bg-orange-400" },
  { key: "css", label: "CSS", file: "styles.css", dotClass: "bg-sky-400" },
  { key: "js", label: "JS", file: "app.js", dotClass: "bg-yellow-300" },
];

const MODEL_URIS: Record<TabKey, string> = {
  html: "inmemory://live-code/index.html",
  css: "inmemory://live-code/styles.css",
  js: "inmemory://live-code/app.js",
};

export default function HomeCodeExecutor() {
  const [activeTab, setActiveTab] = useState<TabKey>("html");
  const [autoRun, setAutoRun] = useState<boolean>(true);
  const [fullPreview, setFullPreview] = useState(false);

  const [srcDoc, setSrcDoc] = useState<string>(() =>
    buildSrcDoc(STARTER_HTML, STARTER_CSS, STARTER_JS),
  );

  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);

  const modelsRef = useRef<Partial<Record<TabKey, Monaco.editor.ITextModel>>>(
    {},
  );
  const disposablesRef = useRef<Monaco.IDisposable[]>([]);

  const timerRef = useRef<number | null>(null);
  const autoRunRef = useRef<boolean>(true);

  const codeRef = useRef<{ html: string; css: string; js: string }>({
    html: STARTER_HTML,
    css: STARTER_CSS,
    js: STARTER_JS,
  });

  const runNow = useCallback(() => {
    const { html, css, js } = codeRef.current;
    setSrcDoc(buildSrcDoc(html, css, js));
  }, []);

  const scheduleAutoPreview = useCallback(() => {
    if (!autoRunRef.current) return;

    if (timerRef.current) window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      runNow();
    }, 250);
  }, [runNow]);

  const attachModelListeners = useCallback(
    (monaco: typeof import("monaco-editor"), tab: TabKey) => {
      const model = modelsRef.current[tab];
      if (!model) return;

     
      const disposable = model.onDidChangeContent(() => {
        const value = model.getValue();
        if (tab === "html") codeRef.current.html = value;
        if (tab === "css") codeRef.current.css = value;
        if (tab === "js") codeRef.current.js = value;

        scheduleAutoPreview();
      });

      disposablesRef.current.push(disposable);
    },
    [scheduleAutoPreview],
  );

  const createModelsOnce = useCallback(
    (monaco: typeof import("monaco-editor")) => {
      const existing = modelsRef.current;
      if (existing.html && existing.css && existing.js) return;

      const mkUri = (u: string) => monaco.Uri.parse(u);

      const htmlModel =
        existing.html ??
        monaco.editor.createModel(
          STARTER_HTML,
          "html",
          mkUri(MODEL_URIS.html),
        );

      const cssModel =
        existing.css ??
        monaco.editor.createModel(
          STARTER_CSS,
          "css",
          mkUri(MODEL_URIS.css),
        );

      const jsModel =
        existing.js ??
        monaco.editor.createModel(
          STARTER_JS,
          "javascript",
          mkUri(MODEL_URIS.js),
        );

      modelsRef.current.html = htmlModel;
      modelsRef.current.css = cssModel;
      modelsRef.current.js = jsModel;

      attachModelListeners(monaco, "html");
      attachModelListeners(monaco, "css");
      attachModelListeners(monaco, "js");
    },
    [attachModelListeners],
  );

  const onMonacoMount: OnMount = useCallback(
    (editor, monaco) => {
      editorRef.current = editor;
      monacoRef.current = monaco;

      createModelsOnce(monaco);

      // Set initial model.
      const model = modelsRef.current.html;
      if (model) editor.setModel(model);

      // Ctrl+S => Run
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        runNow();
      });

      // Ctrl+Enter => Insert new line at cursor
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        const pos = editor.getPosition();
        if (!pos) return;

        const range = new monaco.Range(
          pos.lineNumber,
          pos.column,
          pos.lineNumber,
          pos.column,
        );

        editor.executeEdits("ctrl-enter-newline", [
          { range, text: "\n", forceMoveMarkers: true },
        ]);

        editor.focus();
      });
    },
    [createModelsOnce, runNow],
  );

  useEffect(() => {
    autoRunRef.current = autoRun;
    if (autoRun) runNow();
  }, [autoRun, runNow]);

  useEffect(() => {
    const editor = editorRef.current;
    const model = modelsRef.current[activeTab];
    if (!editor || !model) return;

    editor.setModel(model);
    editor.focus();
  }, [activeTab]);

  const reset = useCallback(() => {
    const monaco = monacoRef.current;
    if (!monaco) return;

    codeRef.current = {
      html: STARTER_HTML,
      css: STARTER_CSS,
      js: STARTER_JS,
    };

    modelsRef.current.html?.setValue(STARTER_HTML);
    modelsRef.current.css?.setValue(STARTER_CSS);
    modelsRef.current.js?.setValue(STARTER_JS);

    setActiveTab("html");
    runNow();
  }, [runNow]);

  useEffect(() => {
    if (!fullPreview) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullPreview(false);
    };

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [fullPreview]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);

      for (const d of disposablesRef.current) d.dispose();
      disposablesRef.current = [];

      modelsRef.current.html?.dispose();
      modelsRef.current.css?.dispose();
      modelsRef.current.js?.dispose();
      modelsRef.current = {};

      editorRef.current = null;
      monacoRef.current = null;
    };
  }, []);

  const headerText = autoRun ? "Auto preview is ON" : "Auto preview is OFF";
  const activeFile = useMemo(
    () => TABS.find((t) => t.key === activeTab)?.file ?? "",
    [activeTab],
  );

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-labelledby="live-code-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-black blur-3xl" />
        <div className="absolute -bottom-48 -right-30 h-130 w-130 rounded-full bg-black blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-size-[22px_22px] opacity-40" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="inline-flex items-center rounded-full border border-white/10 bg-black px-3 py-1 text-sm text-white/80">
              HTML CSS JavaScript Playground
            </p>

            <h2
              id="live-code-title"
              className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Live Code Editor with Instant Preview
            </h2>

            <p className="mt-2 text-sm text-white/70">
              {headerText} • Ctrl+S Run • Ctrl+Enter New line
            </p>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Editor actions">
            <button
              onClick={() => setAutoRun((v) => !v)}
              aria-pressed={autoRun}
              className="rounded-xl border border-white/15 bg-black/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
              type="button"
            >
              {autoRun ? "Turn Auto Off" : "Turn Auto On"}
            </button>

            <button
              onClick={runNow}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
              type="button"
            >
              Run
            </button>

            <button
              onClick={reset}
              className="rounded-xl border border-white/15 bg-black/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
              type="button"
            >
              Reset
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Editor */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>

                <div className="hidden text-xs text-white/60 sm:block">
                  {activeFile}
                </div>
              </div>

              <div className="text-xs text-white/60">VSCode style editor</div>
            </div>

            <div
              className="flex items-center gap-1 border-b border-white/10 bg-black/40 px-2 py-2"
              role="tablist"
              aria-label="Code tabs"
            >
              {TABS.map((t) => {
                const active = t.key === activeTab;
                return (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(t.key)}
                    className={[
                      "flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition",
                      active
                        ? "border border-white/15 bg-white/10 text-white"
                        : "border border-transparent bg-transparent text-white/60 hover:bg-white/5 hover:text-white/85",
                    ].join(" ")}
                  >
                    <span className={["h-2 w-2 rounded-full", t.dotClass].join(" ")} />
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="relative h-130 bg-black">
              <MonacoEditor
                theme="vs-dark"
                onMount={onMonacoMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineHeight: 22,
                  padding: { top: 14, bottom: 14 },
                  wordWrap: "on",
                  smoothScrolling: true,
                  cursorSmoothCaretAnimation: "on",
                  bracketPairColorization: { enabled: true },
                  autoClosingBrackets: "always",
                  autoClosingQuotes: "always",
                  renderLineHighlight: "line",
                  roundedSelection: true,
                  scrollBeyondLastLine: false,
                  overviewRulerBorder: false,
                  automaticLayout: true,
                  lineNumbers: "on",
                  folding: true,
                  tabSize: 2,

                  renderWhitespace: "none",
                  renderControlCharacters: false,
                  occurrencesHighlight: "singleFile",
                  selectionHighlight: false,
                  quickSuggestions: { strings: true, comments: false, other: false },
                  parameterHints: { enabled: false },
                  codeLens: false,
                }}
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black to-transparent" />
            </div>
          </div>

          {/* Preview */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <p className="text-sm font-semibold text-white">Live Preview</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFullPreview(true)}
                  className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-black"
                  aria-label="Open preview in full screen"
                >
                  Resize
                </button>

                <p className="text-xs text-white/60">Preview</p>
              </div>
            </div>

            <iframe
              title="Live HTML CSS JavaScript Preview"
              className="h-130 w-full bg-white"
              sandbox="allow-scripts allow-forms allow-modals"
              srcDoc={srcDoc}
            />
          </div>
        </div>
      </div>

     
      {fullPreview ? (
        <div className="fixed inset-0 z-9999 bg-black/70 backdrop-blur-sm">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
            <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <p className="text-sm font-semibold text-white">Full Preview</p>
                <p className="text-xs text-white/60">Esc to close</p>
              </div>

              <button
                type="button"
                onClick={() => setFullPreview(false)}
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-hidden rounded-3xl border border-white/10 bg-black">
              <iframe
                title="Full Screen Live Preview"
                className="h-full w-full bg-white"
                sandbox="allow-scripts allow-forms allow-modals"
                srcDoc={srcDoc}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
