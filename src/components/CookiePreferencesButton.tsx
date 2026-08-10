"use client";

import { useConsent } from "@/lib/consent-context";

export default function CookiePreferencesButton() {
  const { openPreferences } = useConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="link-underline text-left hover:text-white"
    >
      Preferências de cookies
    </button>
  );
}
