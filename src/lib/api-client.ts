import * as dbService from "@/lib/db-service";

const IS_SERVER = typeof window === "undefined";

// Client-side in-flight request deduplicator & short cache (5s) to eliminate duplicate simultaneous network calls
const inFlightRequests = new Map<string, Promise<any>>();
const responseCache = new Map<string, { data: any; expiry: number }>();

export async function clientFetch<T = any>(url: string, options?: RequestInit): Promise<T> {
  const method = (options?.method || "GET").toUpperCase();
  if (method !== "GET") {
    const res = await fetch(url, options);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }
    return res.json();
  }

  // Deduplicate and short-term cache GET requests
  const cached = responseCache.get(url);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url)!;
  }

  const promise = (async () => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP error ${res.status}`);
      }
      const data = await res.json();
      responseCache.set(url, { data, expiry: Date.now() + 5000 });
      return data;
    } finally {
      inFlightRequests.delete(url);
    }
  })();

  inFlightRequests.set(url, promise);
  return promise;
}

/**
 * Categories
 */
export async function getCategories() {
  if (IS_SERVER) {
    return await dbService.getCategories();
  }
  return await clientFetch("/api/categories");
}

export async function getCategoryBySlug(slug: string) {
  if (IS_SERVER) {
    return await dbService.getCategoryBySlug(slug);
  }
  return await clientFetch(`/api/categories/${encodeURIComponent(slug)}`);
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

  return await clientFetch(`/api/products?${query.toString()}`);
}

export async function getProductBySlug(slug: string) {
  if (IS_SERVER) {
    return await dbService.getProductBySlugOrId(slug);
  }
  return await clientFetch(`/api/products/${encodeURIComponent(slug)}`);
}

/**
 * Brands
 */
export async function getBrands() {
  if (IS_SERVER) {
    return await dbService.getBrands();
  }
  return await clientFetch("/api/brands");
}

/**
 * Deals
 */
export async function getDeals() {
  if (IS_SERVER) {
    return await dbService.getDeals();
  }
  return await clientFetch("/api/deals");
}

/**
 * Testimonials
 */
export async function getTestimonials() {
  if (IS_SERVER) {
    return await dbService.getTestimonials();
  }
  return await clientFetch("/api/testimonials");
}

/**
 * Store Info & Stats
 */
export async function getStoreInfo() {
  if (IS_SERVER) {
    return await dbService.getStoreInfo();
  }
  return await clientFetch("/api/store-info");
}

/**
 * Hero Slides
 */
export async function getHeroSlides() {
  if (IS_SERVER) {
    return await dbService.getHeroSlides();
  }
  return await clientFetch("/api/hero-slides");
}

/**
 * Search Suggestions
 */
export async function getSearchSuggestions(q: string) {
  if (!q.trim()) return { products: [], categories: [], brands: [] };
  try {
    return await clientFetch(`/api/search?q=${encodeURIComponent(q)}`);
  } catch {
    return { products: [], categories: [], brands: [] };
  }
}

/**
 * Orders
 */
export async function createOrderApi(orderData: dbService.CreateOrderPayload) {
  return await clientFetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
}

export async function getOrdersApi(userIdOrPhone: string) {
  return await clientFetch(`/api/orders?userId=${encodeURIComponent(userIdOrPhone)}`);
}

export async function getOrderByIdApi(id: string) {
  return await clientFetch(`/api/orders/${encodeURIComponent(id)}`);
}

/**
 * Wishlist
 */
export async function getWishlistApi(userId = "guest-session") {
  try {
    return await clientFetch(`/api/wishlist?userId=${encodeURIComponent(userId)}`);
  } catch {
    return [];
  }
}

export async function addToWishlistApi(productId: string, userId = "guest-session") {
  return await clientFetch("/api/wishlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId }),
  });
}

export async function removeFromWishlistApi(productId: string, userId = "guest-session") {
  return await clientFetch(
    `/api/wishlist?userId=${encodeURIComponent(userId)}&productId=${encodeURIComponent(productId)}`,
    { method: "DELETE" }
  );
}
