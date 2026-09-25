import * as dbService from "@/lib/db-service";

const IS_SERVER = typeof window === "undefined";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return "http://localhost:3000";
}

/**
 * Categories
 */
export async function getCategories() {
  if (IS_SERVER) {
    return await dbService.getCategories();
  }
  const res = await fetch("/api/categories", { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategoryBySlug(slug: string) {
  if (IS_SERVER) {
    return await dbService.getCategoryBySlug(slug);
  }
  const res = await fetch(`/api/categories/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}

/**
 * Products
 */
export async function getProducts(params: dbService.ProductFilterParams = {}) {
  if (IS_SERVER) {
    return await dbService.getProducts(params);
  }
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.brand) query.set("brand", params.brand);
  if (params.minPrice !== undefined) query.set("minPrice", String(params.minPrice));
  if (params.maxPrice !== undefined) query.set("maxPrice", String(params.maxPrice));
  if (params.inStock !== undefined) query.set("inStock", String(params.inStock));
  if (params.isBestDeal !== undefined) query.set("isBestDeal", String(params.isBestDeal));
  if (params.q) query.set("q", params.q);
  if (params.sort) query.set("sort", params.sort);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  const res = await fetch(`/api/products?${query.toString()}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductBySlug(slug: string) {
  if (IS_SERVER) {
    return await dbService.getProductBySlugOrId(slug);
  }
  const res = await fetch(`/api/products/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

/**
 * Brands
 */
export async function getBrands() {
  if (IS_SERVER) {
    return await dbService.getBrands();
  }
  const res = await fetch("/api/brands", { next: { revalidate: 120 } });
  if (!res.ok) throw new Error("Failed to fetch brands");
  return res.json();
}

/**
 * Deals
 */
export async function getDeals() {
  if (IS_SERVER) {
    return await dbService.getDeals();
  }
  const res = await fetch("/api/deals", { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch deals");
  return res.json();
}

/**
 * Testimonials
 */
export async function getTestimonials() {
  if (IS_SERVER) {
    return await dbService.getTestimonials();
  }
  const res = await fetch("/api/testimonials", { next: { revalidate: 120 } });
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
}

/**
 * Store Info & Stats
 */
export async function getStoreInfo() {
  if (IS_SERVER) {
    return await dbService.getStoreInfo();
  }
  const res = await fetch("/api/store-info", { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch store info");
  return res.json();
}

/**
 * Hero Slides
 */
export async function getHeroSlides() {
  if (IS_SERVER) {
    return await dbService.getHeroSlides();
  }
  const res = await fetch("/api/hero-slides", { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch hero slides");
  return res.json();
}

/**
 * Search Suggestions
 */
export async function getSearchSuggestions(q: string) {
  if (!q.trim()) return { products: [], categories: [], brands: [] };
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) return { products: [], categories: [], brands: [] };
  return res.json();
}

/**
 * Orders
 */
export async function createOrderApi(orderData: dbService.CreateOrderPayload) {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to place order");
  }
  return res.json();
}

export async function getOrdersApi(userIdOrPhone: string) {
  const res = await fetch(`/api/orders?userId=${encodeURIComponent(userIdOrPhone)}`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function getOrderByIdApi(id: string) {
  const res = await fetch(`/api/orders/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("Failed to fetch order detail");
  return res.json();
}

/**
 * Wishlist
 */
export async function getWishlistApi(userId = "guest-session") {
  const res = await fetch(`/api/wishlist?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) return [];
  return res.json();
}

export async function addToWishlistApi(productId: string, userId = "guest-session") {
  const res = await fetch("/api/wishlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId }),
  });
  return res.json();
}

export async function removeFromWishlistApi(productId: string, userId = "guest-session") {
  const res = await fetch(`/api/wishlist?userId=${encodeURIComponent(userId)}&productId=${encodeURIComponent(productId)}`, {
    method: "DELETE",
  });
  return res.json();
}
