/**
 * Sentry Error Tracking — Frontend
 * Initializes once on app load. Captures unhandled errors,
 * promise rejections, and console.error calls automatically.
 */
import * as Sentry from "@sentry/react";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || "";

export function initSentry() {
  if (!SENTRY_DSN) {
    console.warn("⚠️ Sentry DSN not set — frontend error tracking is DISABLED.");
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: `olakunle-ims-frontend@${process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0"}`,

    // Capture 100% of errors, sample 20% of performance traces
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,

    // Don't send PII (NDPA compliance)
    sendDefaultPii: false,

    // Filter out noisy browser errors
    beforeSend(event) {
      // Ignore ResizeObserver errors (browser noise)
      if (event.exception?.values?.[0]?.value?.includes("ResizeObserver")) {
        return null;
      }
      return event;
    },
  });

  console.info("🛡️ Sentry frontend error tracking initialized.");
}

// Re-export Sentry for manual error capture anywhere in the app
export { Sentry };
