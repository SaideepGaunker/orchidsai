"use client";

import { useEffect, useRef } from "react";

type ReporterProps = {
  /*  ⎯⎯ props are only provided on the global-error page ⎯⎯ */
  error?: Error & { digest?: string };
  reset?: () => void;
};

export default function ErrorReporter({ error, reset }: ReporterProps) {
  /* ─ instrumentation shared by every route ─ */
  const lastOverlayMsg = useRef("");
  const pollRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const inIframe = window.parent !== window;
    if (!inIframe) return;

    const send = (payload: unknown) => window.parent.postMessage(payload, "*");

    const onError = (e: ErrorEvent) =>
      send({
        type: "ERROR_CAPTURED",
        error: {
          message: e.message,
          stack: e.error?.stack,
          filename: e.filename,
          lineno: e.lineno,
          colno: e.colno,
          source: "window.onerror",
        },
        timestamp: Date.now(),
      });

    const onReject = (e: PromiseRejectionEvent) =>
      send({
        type: "ERROR_CAPTURED",
        error: {
          message: e.reason?.message ?? String(e.reason),
          stack: e.reason?.stack,
          source: "unhandledrejection",
        },
        timestamp: Date.now(),
      });

    const pollOverlay = () => {
      const overlay = document.querySelector("[data-nextjs-dialog-overlay]");
      const node =
        overlay?.querySelector(
          "h1, h2, .error-message, [data-nextjs-dialog-body]"
        ) ?? null;
      const txt = node?.textContent ?? node?.innerHTML ?? "";
      if (txt && txt !== lastOverlayMsg.current) {
        lastOverlayMsg.current = txt;
        send({
          type: "ERROR_CAPTURED",
          error: { message: txt, source: "nextjs-dev-overlay" },
          timestamp: Date.now(),
        });
      }
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onReject);
    pollRef.current = setInterval(pollOverlay, 1000);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onReject);
      pollRef.current && clearInterval(pollRef.current);
    };
  }, []);

  /* ─ extra postMessage when on the global-error route ─ */
  useEffect(() => {
    if (!error) return;
    window.parent.postMessage(
      {
        type: "global-error-reset",
        error: {
          message: error.message,
          stack: error.stack,
          digest: error.digest,
          name: error.name,
        },
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      },
      "*"
    );
  }, [error]);

  /* ─ ordinary pages render nothing ─ */
  if (!error) return null;

  /* ─ global-error UI ─ */
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-4 bg-[#050510] bg-grid">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)" }} />

        <div className="max-w-md w-full relative">
          <div className="glass-card rounded-[32px] p-10 border border-red-500/10 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">!</div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Something went wrong!</h1>
            <p className="text-sm text-white/40 mb-8 leading-relaxed">
              We encountered an unexpected error. Our engineers have been notified.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => reset?.()}
                className="w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-black transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #ef4444, #b91c1c)", boxShadow: "0 8px 24px rgba(239,68,68,0.2)" }}
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white/30 hover:text-white transition-all glass-card glass-card-hover border border-white/5"
              >
                Go to Homepage
              </button>
            </div>

            {process.env.NODE_ENV === "development" && error && (
              <details className="mt-8 text-left group">
                <summary className="cursor-pointer text-[10px] font-bold text-white/20 uppercase tracking-[2px] hover:text-white/40 transition-colors list-none text-center">
                  Technical Details
                </summary>
                <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5 overflow-auto max-h-48 scrollbar-hide">
                  <pre className="text-[10px] text-red-300/60 font-mono leading-relaxed">
                    {error.name}: {error.message}
                    {error.stack && `\n\n${error.stack}`}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
