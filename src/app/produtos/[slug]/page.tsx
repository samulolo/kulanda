import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductBySlug,
  getCategoryLabel,
  getVariants,
  getAllProducts,
} from "@/lib/products";
import { formatPrice } from "@/lib/format";
import ProductZoom from "@/components/ProductZoom";
import ProductGallery from "@/components/ProductGallery";
import ProductVideo from "@/components/ProductVideo";
import ColorSwatches from "@/components/ColorSwatches";
import AddToCartControls from "@/components/AddToCartControls";
import { ProductTrustBadges } from "@/components/TrustSignals";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return {};

  const title = product.name;
  const description = product.description;
  const canonical = `/produtos/${product.slug}`;
  const imageUrl = product.image ? `${SITE_URL}${product.image}` : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 1200, alt: product.name }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const variants = await getVariants(product);
  const categoryLabel = await getCategoryLabel(product.category);

  // Só entregamos em Portugal e Espanha (ver allowed_countries em
  // /api/checkout) — a política de devolução e o envio abaixo aplicam-se
  // aos mesmos dois países.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? `${SITE_URL}${product.image}` : undefined,
    sku: product.slug,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/produtos/${product.slug}`,
      priceCurrency: "EUR",
      price: product.price,
      // Não fazemos gestão de stock — presume-se sempre disponível.
      availability: "https://schema.org/InStock",
      // Direito de livre resolução: 14 dias, sem necessidade de motivo
      // (ver /devolucoes). Não indicamos "returnFees" (quem paga o envio
      // de devolução) porque ainda não está decidido.
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: ["PT", "ES"],
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
      },
      // Envio grátis, 10 a 15 dias (ver /faq e /termos) — sem tempo de
      // processamento à parte, é a estimativa total já publicada no site.
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "EUR" },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: ["PT", "ES"],
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 10, maxValue: 15, unitCode: "DAY" },
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-xs uppercase tracking-wide text-[var(--muted)]">
        <Link href="/produtos" className="link-underline hover:text-[var(--foreground)]">
          Produtos
        </Link>{" "}
        / <span className="text-[var(--foreground)]">{product.name}</span>
      </nav>

      <div className="grid gap-12 sm:grid-cols-2">
        <div className="flex flex-col gap-4">
          {product.images && product.images.length > 1 ? (
            <ProductGallery
              color={product.color}
              emoji={product.emoji}
              images={product.images}
              alt={product.name}
              className="h-[28rem] w-full rounded-sm"
              iconClassName="h-32 w-32"
            />
          ) : (
            <ProductZoom
              color={product.color}
              emoji={product.emoji}
              image={product.image}
              alt={product.name}
              className="h-[28rem] w-full rounded-sm"
              iconClassName="h-32 w-32"
            />
          )}

          <ColorSwatches current={product} variants={variants} />

          {product.video && (
            <div className="flex flex-col gap-2">
              <ProductVideo
                src={product.video}
                title={product.videoTitle ?? product.name}
                poster={product.image}
                className="h-56 w-full rounded-sm sm:h-64"
              />
              <p className="text-xs text-[var(--muted)]">
                {product.videoTitle ?? product.name}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            {product.badge && (
              <span className="w-fit rounded-full bg-[var(--foreground)] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
                {product.badge}
              </span>
            )}
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
              {categoryLabel}
            </p>
            <h1 className="mt-1 font-serif text-2xl leading-tight text-[var(--foreground)] sm:text-3xl">
              {product.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            {product.compareAtPrice && (
              <span className="text-sm text-[var(--muted)] line-through sm:text-base">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="leading-relaxed text-[var(--muted)]">
            {product.description}
          </p>

          <ul className="flex flex-col gap-2 border-y border-[var(--border)] py-5 text-sm text-[var(--foreground)]">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                {f}
              </li>
            ))}
          </ul>

          <AddToCartControls product={product} />

          <ProductTrustBadges />
        </div>
      </div>
    </div>
  );
}
