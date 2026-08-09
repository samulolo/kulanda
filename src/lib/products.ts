import { cache } from "react";
import { supabaseServer } from "./supabase-server";

export type Category = string;

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  description: string;
  features: string[];
  color: string; // usado no placeholder visual (e no glow atrás da foto)
  emoji: string; // usado para escolher o ícone quando não há foto
  image?: string; // caminho da foto principal
  images?: string[]; // galeria de fotos adicionais (produto principal usa "image")
  video?: string;
  videoTitle?: string;
  badge?: string;
  variantGroup?: string; // agrupa variações de cor do mesmo produto
  colorLabel?: string; // nome curto da cor, usado no seletor de variantes
  minQuantity?: number; // quantidade mínima de compra (padrão: 1)
}

export interface CategoryInfo {
  id: Category;
  label: string;
}

// Cores/ícone de recurso, usados só como placeholder quando um produto não
// tem foto. Hoje todos os produtos têm foto real, por isso isto raramente
// chega a aparecer — é só uma rede de segurança.
const CATEGORY_DEFAULTS: Record<string, { emoji: string; color: string }> = {
  carteiras: { emoji: "👛", color: "#8a5a34" },
  microfones: { emoji: "🎙️", color: "#1f2937" },
  iluminacao: { emoji: "💡", color: "#1c1c1c" },
  gloss: { emoji: "💄", color: "#e8a9c2" },
  tripes: { emoji: "🎥", color: "#1c1c1c" },
};
const FALLBACK_DEFAULTS = { emoji: "📦", color: "#1c1c1c" };

// ── formas cruas devolvidas pelo Supabase ─────────────────────
interface RawFile {
  id: string;
  detalhe_produto_id: string | null;
  url: string;
  type: "image" | "video";
  position: number;
  video_title: string | null;
}

interface RawVariant {
  id: string;
  cor: string | null;
  cor_label: string | null;
  slug: string | null;
  badge: string | null;
}

interface RawProduct {
  id: string;
  slug: string;
  name: string;
  price: string | number;
  compare_at_price: string | number | null;
  description: string;
  features: string[] | null;
  badge: string | null;
  min_quantity: number | null;
  category_id: string;
  detalhes_produto: RawVariant[] | null;
  product_files: RawFile[] | null;
}

interface RawCategory {
  id: string;
  name: string;
  slug: string;
}

function mapFlatProduct(
  raw: RawProduct,
  categorySlug: string,
  variant: RawVariant | null
): Product {
  const defaults = CATEGORY_DEFAULTS[categorySlug] ?? FALLBACK_DEFAULTS;
  const files = raw.product_files ?? [];

  const scopedImages = files
    .filter((f) => f.type === "image" && f.detalhe_produto_id === (variant?.id ?? null))
    .sort((a, b) => a.position - b.position)
    .map((f) => f.url);

  // O vídeo é sempre partilhado por todas as variantes do produto.
  const videoFile = files.find((f) => f.type === "video" && f.detalhe_produto_id === null);

  const minQuantity = raw.min_quantity ?? 1;

  return {
    slug: variant?.slug ?? raw.slug,
    name: variant?.cor_label ? `${raw.name} - ${variant.cor_label}` : raw.name,
    category: categorySlug,
    price: Number(raw.price),
    compareAtPrice:
      raw.compare_at_price != null ? Number(raw.compare_at_price) : undefined,
    description: raw.description,
    features: raw.features ?? [],
    color: variant?.cor ?? defaults.color,
    emoji: defaults.emoji,
    image: scopedImages[0],
    images: scopedImages.length > 1 ? scopedImages : undefined,
    video: videoFile?.url,
    videoTitle: videoFile?.video_title ?? undefined,
    badge: variant?.badge ?? raw.badge ?? undefined,
    variantGroup: variant ? raw.slug : undefined,
    colorLabel: variant?.cor_label ?? undefined,
    minQuantity: minQuantity > 1 ? minQuantity : undefined,
  };
}

// Busca tudo (produtos + variantes + ficheiros) numa só query e achata para
// a forma de Product[] que o resto do site já conhece. `cache()` evita
// repetir esta query várias vezes no mesmo pedido (ex.: generateMetadata +
// a própria página), mas nunca guarda entre pedidos diferentes.
export const getAllProducts = cache(async function getAllProducts(): Promise<
  Product[]
> {
  const [{ data: categoriesData, error: catError }, { data: productsData, error: prodError }] =
    await Promise.all([
      supabaseServer.from("categories").select("id, name, slug"),
      supabaseServer
        .from("products")
        .select(
          `id, slug, name, price, compare_at_price, description, features, badge, min_quantity, category_id,
           detalhes_produto ( id, cor, cor_label, slug, badge ),
           product_files ( id, detalhe_produto_id, url, type, position, video_title )`
        ),
    ]);

  if (catError) throw new Error(`Supabase (categories): ${catError.message}`);
  if (prodError) throw new Error(`Supabase (products): ${prodError.message}`);

  const categoryById = new Map(
    ((categoriesData as RawCategory[] | null) ?? []).map((c) => [c.id, c.slug])
  );

  const flattened: Product[] = [];
  for (const raw of (productsData as unknown as RawProduct[] | null) ?? []) {
    const categorySlug = categoryById.get(raw.category_id) ?? "outros";
    const variants = raw.detalhes_produto ?? [];

    if (variants.length === 0) {
      flattened.push(mapFlatProduct(raw, categorySlug, null));
    } else {
      for (const variant of variants) {
        flattened.push(mapFlatProduct(raw, categorySlug, variant));
      }
    }
  }

  return flattened;
});

export const getCategories = cache(async function getCategories(): Promise<
  CategoryInfo[]
> {
  const { data, error } = await supabaseServer
    .from("categories")
    .select("id, name, slug")
    .order("name");

  if (error) throw new Error(`Supabase (categories): ${error.message}`);

  return ((data as RawCategory[] | null) ?? []).map((c) => ({
    id: c.slug,
    label: c.name,
  }));
});

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCategory(category?: Category): Promise<Product[]> {
  const products = await getAllProducts();
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export async function getCategoryLabel(category: Category): Promise<string> {
  const categories = await getCategories();
  return categories.find((c) => c.id === category)?.label ?? category;
}

export async function getVariants(product: Product): Promise<Product[]> {
  if (!product.variantGroup) return [];
  const products = await getAllProducts();
  return products.filter((p) => p.variantGroup === product.variantGroup);
}
