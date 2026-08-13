import type { Metadata } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { ConsentProvider } from "@/lib/consent-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FavoritesDrawer from "@/components/FavoritesDrawer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import { getCategories } from "@/lib/products";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Carteiras Magnéticas, Microfones e Ring Lights`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "carteira magnética iphone",
    "capa magsafe carteira",
    "microfone de lapela sem fio",
    "ring light magnético",
    "tripé selfie stick com luz",
    "acessórios iphone premium",
    "kulanda-store",
    "kulanda"
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Carteiras Magnéticas, Microfones e Ring Lights`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Carteiras Magnéticas, Microfones e Ring Lights`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const categories = await getCategories();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    sameAs: [],
  };

  return (
    <html lang="pt-PT" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)] font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConsentProvider>
          <CartProvider>
            <FavoritesProvider>
              <Header categories={categories} />
              <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:px-8">
                {children}
              </main>
              <Footer />
              <FavoritesDrawer />
            </FavoritesProvider>
          </CartProvider>
          <CookieConsentBanner />
          <AnalyticsLoader gaId={process.env.NEXT_PUBLIC_GA_ID} />
          <Analytics/>
        </ConsentProvider>
      </body>
    </html>
  );
}
