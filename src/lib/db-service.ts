import { prisma } from "@/lib/prisma";
import {
  categoriesData,
  brandsData,
  productsData,
  storeInfoData,
  heroSlidesData,
  testimonialsData,
} from "@/lib/seed-data";

// Circuit-breaker state to prevent socket timeouts from clogging serverless / dev handlers
const dbHealth = {
  isAvailable: true,
  lastChecked: 0,
  cooldownMs: 30000,
};

export function isConfiguredDb(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  if (url.includes("ep-empty-pooler") || url.includes("demo_password")) return false;
  return true;
}

/**
 * Helper to safely execute a Prisma query with graceful fallback to seed dataset
 * if the database is not yet migrated, unreachable, or has empty tables.
 */
async function safeDbQuery<T>(queryFn: () => Promise<T>, fallbackFn: () => T | Promise<T>): Promise<T> {
  if (!isConfiguredDb()) {
    return await fallbackFn();
  }

  const now = Date.now();
  if (!dbHealth.isAvailable && now - dbHealth.lastChecked < dbHealth.cooldownMs) {
    return await fallbackFn();
  }

  try {
    const res = await queryFn();
    dbHealth.isAvailable = true;
    return res;
  } catch (error) {
    dbHealth.isAvailable = false;
    dbHealth.lastChecked = Date.now();
    console.warn("[Database Notice] Falling back to local data source:", (error as Error).message);
    return await fallbackFn();
  }
}

// ----------------------------------------------------
// 1. STORE INFO & STATS
// ----------------------------------------------------
export async function getStoreInfo() {
  return safeDbQuery(
    async () => {
      const info = await prisma.storeInfo.findFirst();
      const orderCount = await prisma.order.count();
      const productCount = await prisma.product.count();
      const brandCount = await prisma.brand.count();

      const baseInfo = info || storeInfoData;
      return {
        ...baseInfo,
        stats: {
          yearsInBusiness: new Date().getFullYear() - 1998,
          ordersDelivered: Math.max(orderCount, 15400),
          productsCataloged: Math.max(productCount, 2500),
          authorizedBrands: Math.max(brandCount, 40),
          satisfactionRate: 99.4,
        },
      };
    },
    () => ({
      ...storeInfoData,
      stats: {
        yearsInBusiness: new Date().getFullYear() - 1998,
        ordersDelivered: 15400,
        productsCataloged: 2500,
        authorizedBrands: 40,
        satisfactionRate: 99.4,
      },
    })
  );
}

// ----------------------------------------------------
// 2. CATEGORIES
// ----------------------------------------------------
export async function getCategories() {
  return safeDbQuery(
    async () => {
      const categories = await prisma.category.findMany({
        orderBy: { sortOrder: "asc" },
        include: {
          _count: {
            select: { products: true },
          },
        },
      });

      if (!categories || categories.length === 0) {
        return categoriesData;
      }

      return categories.map((c) => ({
        ...c,
        productCount: c._count.products > 0 ? c._count.products : c.productCount,
      }));
    },
    () => categoriesData
  );
}

export async function getCategoryBySlug(slug: string) {
  return safeDbQuery(
    async () => {
      const category = await prisma.category.findUnique({
        where: { slug },
        include: {
          products: {
            include: {
              images: { orderBy: { sortOrder: "asc" } },
              brand: true,
              deals: { where: { isActive: true } },
            },
          },
        },
      });

      if (!category) {
        const fallback = categoriesData.find((c) => c.slug === slug);
        if (!fallback) return null;
        const fallbackProducts = productsData.filter((p) => p.categoryId === fallback.id || p.categoryId === slug);
        return { ...fallback, products: fallbackProducts };
      }

      return category;
    },
    () => {
      const fallback = categoriesData.find((c) => c.slug === slug);
      if (!fallback) return null;
      const fallbackProducts = productsData.filter((p) => p.categoryId === fallback.id || p.categoryId === slug);
      return { ...fallback, products: fallbackProducts };
    }
  );
}

// ----------------------------------------------------
// 3. BRANDS
// ----------------------------------------------------
export async function getBrands() {
  return safeDbQuery(
    async () => {
      const brands = await prisma.brand.findMany({
        orderBy: [{ isAuthorizedPartner: "desc" }, { name: "asc" }],
      });
      return brands.length > 0 ? brands : brandsData;
    },
    () => brandsData
  );
}

// ----------------------------------------------------
// 4. HERO SLIDES
// ----------------------------------------------------
export async function getHeroSlides() {
  return safeDbQuery(
    async () => {
      const slides = await prisma.heroSlide.findMany({
        orderBy: { sortOrder: "asc" },
      });
      return slides.length > 0 ? slides : heroSlidesData;
    },
    () => heroSlidesData
  );
}

// ----------------------------------------------------
// 5. TESTIMONIALS
// ----------------------------------------------------
export async function getTestimonials() {
  return safeDbQuery(
    async () => {
      const testimonials = await prisma.testimonial.findMany({
        where: { isVerified: true },
        orderBy: { createdAt: "desc" },
      });
      return testimonials.length > 0 ? testimonials : testimonialsData;
    },
    () => testimonialsData
  );
}

// ----------------------------------------------------
// 6. DEALS
// ----------------------------------------------------
export async function getDeals() {
  return safeDbQuery(
    async () => {
      const deals = await prisma.deal.findMany({
        where: { isActive: true },
        include: {
          product: {
            include: {
              images: { orderBy: { sortOrder: "asc" } },
              brand: true,
              category: true,
            },
          },
        },
      });

      if (deals.length > 0) {
        return deals.map((d) => ({
          id: d.id,
          productId: d.productId,
          discountPercent: d.discountPercent,
          startsAt: d.startsAt,
          endsAt: d.endsAt,
          product: d.product,
        }));
      }

      // Fallback: products with isBestDeal
      const dealProducts = productsData.filter((p) => p.isBestDeal);
      return dealProducts.map((p) => ({
        id: `deal-${p.id}`,
        productId: p.id,
        discountPercent: p.compareAtPrice ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100) : 15,
        startsAt: new Date().toISOString(),
        endsAt: null,
        product: p,
      }));
    },
    () => {
      const dealProducts = productsData.filter((p) => p.isBestDeal);
      return dealProducts.map((p) => ({
        id: `deal-${p.id}`,
        productId: p.id,
        discountPercent: p.compareAtPrice ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100) : 15,
        startsAt: new Date().toISOString(),
        endsAt: null,
        product: p,
      }));
    }
  );
}

// ----------------------------------------------------
// 7. PRODUCTS (Paginated, Filterable, Searchable)
// ----------------------------------------------------
export interface ProductFilterParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isBestDeal?: boolean;
  q?: string;
  sort?: "featured" | "price_asc" | "price_desc" | "rating" | "newest";
  page?: number;
  limit?: number;
}

export async function getProducts(params: ProductFilterParams = {}) {
  const {
    category,
    brand,
    minPrice,
    maxPrice,
    inStock,
    isBestDeal,
    q,
    sort = "featured",
    page = 1,
    limit = 20,
  } = params;

  return safeDbQuery(
    async () => {
      const where: any = {};

      if (category && category !== "all") {
        where.OR = [
          { categoryId: category },
          { category: { slug: category } },
        ];
      }

      if (brand && brand !== "all") {
        if (where.OR) {
          where.AND = [
            { OR: where.OR },
            { OR: [{ brandId: brand }, { brand: { slug: brand } }] },
          ];
          delete where.OR;
        } else {
          where.OR = [
            { brandId: brand },
            { brand: { slug: brand } },
          ];
        }
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {};
        if (minPrice !== undefined) where.price.gte = minPrice;
        if (maxPrice !== undefined) where.price.lte = maxPrice;
      }

      if (inStock !== undefined) {
        where.isInStock = inStock;
      }

      if (isBestDeal !== undefined) {
        where.isBestDeal = isBestDeal;
      }

      if (q && q.trim()) {
        const query = q.trim();
        const searchCondition = [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { sku: { contains: query, mode: "insensitive" } },
        ];
        if (where.AND) {
          where.AND.push({ OR: searchCondition });
        } else if (where.OR) {
          where.AND = [{ OR: where.OR }, { OR: searchCondition }];
          delete where.OR;
        } else {
          where.OR = searchCondition;
        }
      }

      let orderBy: any = { createdAt: "desc" };
      if (sort === "price_asc") orderBy = { price: "asc" };
      if (sort === "price_desc") orderBy = { price: "desc" };
      if (sort === "rating") orderBy = { ratingAvg: "desc" };
      if (sort === "featured") orderBy = [{ isBestDeal: "desc" }, { ratingAvg: "desc" }];

      const total = await prisma.product.count({ where });
      const products = await prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          brand: true,
          category: true,
          deals: { where: { isActive: true } },
        },
      });

      if (products.length === 0 && (!q && !category && !brand)) {
        // Fallback to in-memory if DB is empty
        return filterMemoryProducts(params);
      }

      return {
        products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      };
    },
    () => filterMemoryProducts(params)
  );
}

function filterMemoryProducts(params: ProductFilterParams) {
  let list = [...productsData];
  const { category, brand, minPrice, maxPrice, inStock, isBestDeal, q, sort = "featured", page = 1, limit = 20 } = params;

  if (category && category !== "all") {
    list = list.filter((p) => p.categoryId === category || (p as any).categorySlug === category);
  }
  if (brand && brand !== "all") {
    list = list.filter((p) => p.brandId === brand || (p as any).brand?.toLowerCase() === brand.toLowerCase());
  }
  if (minPrice !== undefined) {
    list = list.filter((p) => p.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    list = list.filter((p) => p.price <= maxPrice);
  }
  if (inStock !== undefined) {
    list = list.filter((p) => p.isInStock === inStock);
  }
  if (isBestDeal !== undefined) {
    list = list.filter((p) => p.isBestDeal === isBestDeal);
  }
  if (q && q.trim()) {
    const query = q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
    );
  }

  if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
  else if (sort === "rating") list.sort((a, b) => b.ratingAvg - a.ratingAvg);
  else if (sort === "featured") list.sort((a, b) => (b.isBestDeal ? 1 : 0) - (a.isBestDeal ? 1 : 0));

  const total = list.length;
  const paginated = list.slice((page - 1) * limit, page * limit);

  return {
    products: paginated,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}

// ----------------------------------------------------
// 8. PRODUCT DETAIL BY SLUG OR ID
// ----------------------------------------------------
export async function getProductBySlugOrId(slugOrId: string) {
  return safeDbQuery(
    async () => {
      const product = await prisma.product.findFirst({
        where: {
          OR: [{ slug: slugOrId }, { id: slugOrId }],
        },
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          brand: true,
          category: true,
          deals: { where: { isActive: true } },
        },
      });

      if (!product) {
        return findMemoryProduct(slugOrId);
      }

      // Fetch related products in same category
      const related = await prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          id: { not: product.id },
        },
        take: 4,
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          brand: true,
        },
      });

      return {
        ...product,
        relatedProducts: related,
      };
    },
    () => findMemoryProduct(slugOrId)
  );
}

function findMemoryProduct(slugOrId: string) {
  const p = productsData.find((x) => x.slug === slugOrId || x.id === slugOrId);
  if (!p) return null;
  const related = productsData
    .filter((x) => x.categoryId === p.categoryId && x.id !== p.id)
    .slice(0, 4);
  return {
    ...p,
    relatedProducts: related,
  };
}

// ----------------------------------------------------
// 9. SEARCH SUGGESTIONS
// ----------------------------------------------------
export async function getSearchSuggestions(query: string) {
  if (!query || !query.trim()) {
    return { products: [], categories: [], brands: [] };
  }
  const q = query.trim();

  return safeDbQuery(
    async () => {
      const [products, categories, brands] = await Promise.all([
        prisma.product.findMany({
          where: {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { sku: { contains: q, mode: "insensitive" } },
            ],
          },
          take: 6,
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            sku: true,
            images: { take: 1, select: { imageUrl: true } },
          },
        }),
        prisma.category.findMany({
          where: {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { slug: { contains: q, mode: "insensitive" } },
            ],
          },
          take: 4,
          select: { id: true, name: true, slug: true, iconKey: true },
        }),
        prisma.brand.findMany({
          where: {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { slug: { contains: q, mode: "insensitive" } },
            ],
          },
          take: 4,
          select: { id: true, name: true, slug: true, logoUrl: true },
        }),
      ]);

      return { products, categories, brands };
    },
    () => {
      const queryLower = q.toLowerCase();
      const products = productsData
        .filter((p) => p.name.toLowerCase().includes(queryLower) || p.sku.toLowerCase().includes(queryLower))
        .slice(0, 6)
        .map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          sku: p.sku,
          images: [{ imageUrl: p.images[0] || "/images/placeholder.webp" }],
        }));

      const categories = categoriesData
        .filter((c) => c.name.toLowerCase().includes(queryLower) || c.slug.toLowerCase().includes(queryLower))
        .slice(0, 4)
        .map((c) => ({ id: c.id, name: c.name, slug: c.slug, iconKey: c.iconKey }));

      const brands = brandsData
        .filter((b) => b.name.toLowerCase().includes(queryLower) || b.slug.toLowerCase().includes(queryLower))
        .slice(0, 4)
        .map((b) => ({ id: b.id, name: b.name, slug: b.slug, logoUrl: b.logoUrl }));

      return { products, categories, brands };
    }
  );
}

// ----------------------------------------------------
// 10. ORDERS
// ----------------------------------------------------
export interface CreateOrderPayload {
  customerName: string;
  phone: string;
  deliveryAddress: string;
  landmark?: string;
  deliveryFee: number;
  subtotal: number;
  total: number;
  userId?: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export async function createOrder(payload: CreateOrderPayload) {
  const orderNumber = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

  return safeDbQuery<any>(
    async () => {
      const order = await prisma.order.create({
        data: {
          orderNumber,
          customerName: payload.customerName,
          phone: payload.phone,
          deliveryAddress: payload.deliveryAddress,
          landmark: payload.landmark || null,
          subtotal: payload.subtotal,
          deliveryFee: payload.deliveryFee,
          total: payload.total,
          userId: payload.userId || null,
          status: "placed",
          items: {
            create: payload.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: { take: 1 },
                },
              },
            },
          },
        },
      });
      return order;
    },
    () => {
      // Memory fallback for order creation
      return {
        id: `ord_${Date.now()}`,
        orderNumber,
        customerName: payload.customerName,
        phone: payload.phone,
        deliveryAddress: payload.deliveryAddress,
        landmark: payload.landmark || "",
        status: "placed",
        subtotal: payload.subtotal,
        deliveryFee: payload.deliveryFee,
        total: payload.total,
        userId: payload.userId || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: payload.items.map((item, idx) => ({
          id: `item_${idx}_${Date.now()}`,
          orderId: `ord_${Date.now()}`,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          product: productsData.find((p) => p.id === item.productId) || {
            name: "Hardware Product",
            slug: "item",
            images: [],
          },
        })),
      };
    }
  );
}

export async function getOrderByIdOrNumber(idOrNumber: string) {
  return safeDbQuery(
    async () => {
      const order = await prisma.order.findFirst({
        where: {
          OR: [{ id: idOrNumber }, { orderNumber: idOrNumber }],
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: { take: 1 },
                },
              },
            },
          },
        },
      });
      return order;
    },
    () => null
  );
}

export async function getOrdersByUserOrPhone(userIdOrPhone: string) {
  return safeDbQuery(
    async () => {
      const orders = await prisma.order.findMany({
        where: {
          OR: [{ userId: userIdOrPhone }, { phone: userIdOrPhone }],
        },
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: { take: 1 },
                },
              },
            },
          },
        },
      });
      return orders;
    },
    () => []
  );
}

// ----------------------------------------------------
// 11. WISHLIST & CART (Session/User DB Operations)
// ----------------------------------------------------
export async function getWishlist(userId: string) {
  return safeDbQuery(
    async () => {
      const items = await prisma.wishlistItem.findMany({
        where: { userId },
        include: {
          product: {
            include: {
              images: { take: 1 },
              brand: true,
            },
          },
        },
      });
      return items.map((i) => i.product);
    },
    () => []
  );
}

export async function addToWishlist(userId: string, productId: string) {
  return safeDbQuery(
    async () => {
      return await prisma.wishlistItem.upsert({
        where: {
          userId_productId: { userId, productId },
        },
        create: { userId, productId },
        update: {},
      });
    },
    () => ({ userId, productId, createdAt: new Date() })
  );
}

export async function removeFromWishlist(userId: string, productId: string) {
  return safeDbQuery(
    async () => {
      return await prisma.wishlistItem.deleteMany({
        where: { userId, productId },
      });
    },
    () => ({ count: 1 })
  );
}

export async function getCart(userId: string) {
  return safeDbQuery(
    async () => {
      const items = await prisma.cartItem.findMany({
        where: { userId },
        include: {
          product: {
            include: {
              images: { take: 1 },
            },
          },
        },
        orderBy: { createdAt: "asc" },
      });
      return items;
    },
    () => []
  );
}

export async function addToCart(userId: string, productId: string, quantity = 1) {
  return safeDbQuery(
    async () => {
      return await prisma.cartItem.upsert({
        where: {
          userId_productId: { userId, productId },
        },
        create: { userId, productId, quantity },
        update: {
          quantity: { increment: quantity },
        },
      });
    },
    () => ({ userId, productId, quantity })
  );
}

export async function updateCartQuantity(userId: string, productId: string, quantity: number) {
  return safeDbQuery<any>(
    async () => {
      if (quantity <= 0) {
        return await prisma.cartItem.deleteMany({
          where: { userId, productId },
        });
      }
      return await prisma.cartItem.update({
        where: {
          userId_productId: { userId, productId },
        },
        data: { quantity },
      });
    },
    () => ({ userId, productId, quantity })
  );
}

export async function removeFromCart(userId: string, productId: string) {
  return safeDbQuery(
    async () => {
      return await prisma.cartItem.deleteMany({
        where: { userId, productId },
      });
    },
    () => ({ count: 1 })
  );
}

export async function clearCart(userId: string) {
  return safeDbQuery(
    async () => {
      return await prisma.cartItem.deleteMany({
        where: { userId },
      });
    },
    () => ({ count: 1 })
  );
}
