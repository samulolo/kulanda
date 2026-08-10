"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/lib/consent-context";

// Só injeta o script do Google Analytics depois de a pessoa aceitar
// cookies de análise no banner de consentimento — nunca antes disso.
export default function AnalyticsLoader({ gaId }: { gaId?: string }) {
  const { status } = useConsent();

  if (!gaId || status !== "accepted") return null;

  return <GoogleAnalytics gaId={gaId} />;
}
