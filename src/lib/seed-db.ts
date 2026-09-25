import { prisma } from "@/lib/prisma";
import {
  categoriesData,
  brandsData,
  productsData,
  storeInfoData,
  heroSlidesData,
  testimonialsData,
} from "@/lib/seed-data";

export async function seedDatabase() {
  const results = {
    categories: 0,
    brands: 0,
    products: 0,
    storeInfo: 0,
    heroSlides: 0,
    testimonials: 0,
  };

  // 1. Store Info
  await prisma.storeInfo.upsert({
    where: { id: storeInfoData.id },
    update: {
      businessName: storeInfoData.businessName,
      address: storeInfoData.address,
      city: storeInfoData.city,
      province: storeInfoData.province,
      phone: storeInfoData.phone,
      hours: storeInfoData.hours,
      latitude: storeInfoData.latitude,
      longitude: storeInfoData.longitude,
      socialLinks: storeInfoData.socialLinks,
    },
    create: {
      id: storeInfoData.id,
      businessName: storeInfoData.businessName,
      address: storeInfoData.address,
      city: storeInfoData.city,
      province: storeInfoData.province,
      phone: storeInfoData.phone,
      hours: storeInfoData.hours,
      latitude: storeInfoData.latitude,
      longitude: storeInfoData.longitude,
      socialLinks: storeInfoData.socialLinks,
    },
  });
  results.storeInfo = 1;

  // 2. Categories
  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        nameNp: cat.nameNp,
        description: cat.description,
        iconKey: cat.iconKey,
        productCount: cat.productCount,
        imageUrl: cat.imageUrl,
        sortOrder: cat.sortOrder,
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        nameNp: cat.nameNp,
        description: cat.description,
        iconKey: cat.iconKey,
        productCount: cat.productCount,
        imageUrl: cat.imageUrl,
        sortOrder: cat.sortOrder,
      },
    });
    results.categories++;
  }

  // 3. Brands
  for (const b of brandsData) {
    await prisma.brand.upsert({
      where: { slug: b.slug },
      update: {
        name: b.name,
        country: b.country,
        logoUrl: b.logoUrl,
        categoryTags: b.categoryTags,
        isAuthorizedPartner: b.isAuthorizedPartner,
      },
      create: {
        id: b.id,
        name: b.name,
        slug: b.slug,
        country: b.country,
        logoUrl: b.logoUrl,
        categoryTags: b.categoryTags,
        isAuthorizedPartner: b.isAuthorizedPartner,
      },
    });
    results.brands++;
  }

  // 4. Products & Images & Deals
  for (const p of productsData) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        sku: p.sku,
        name: p.name,
        categoryId: p.categoryId,
        brandId: p.brandId,
        description: p.description,
        technicalSpecs: p.technicalSpecs,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        stockQuantity: p.stockQuantity,
        unit: p.unit,
        ratingAvg: p.ratingAvg,
        ratingCount: p.ratingCount,
        isBestDeal: p.isBestDeal,
        isInStock: p.isInStock,
      },
      create: {
        id: p.id,
        sku: p.sku,
        name: p.name,
        slug: p.slug,
        categoryId: p.categoryId,
        brandId: p.brandId,
        description: p.description,
        technicalSpecs: p.technicalSpecs,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        stockQuantity: p.stockQuantity,
        unit: p.unit,
        ratingAvg: p.ratingAvg,
        ratingCount: p.ratingCount,
        isBestDeal: p.isBestDeal,
        isInStock: p.isInStock,
      },
    });

    // Seed product images
    if (p.images && p.images.length > 0) {
      await prisma.productImage.deleteMany({
        where: { productId: product.id },
      });

      for (let i = 0; i < p.images.length; i++) {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            imageUrl: p.images[i],
            altText: `${p.name} - Image ${i + 1}`,
            sortOrder: i,
            isPrimary: i === 0,
          },
        });
      }
    }

    // Seed deal if best deal
    if (p.isBestDeal && p.compareAtPrice) {
      const discount = Math.round(
        ((p.compareAtPrice - p.price) / p.compareAtPrice) * 100
      );
      await prisma.deal.deleteMany({
        where: { productId: product.id },
      });
      await prisma.deal.create({
        data: {
          productId: product.id,
          discountPercent: discount,
          isActive: true,
        },
      });
    }

    results.products++;
  }

  // 5. Hero Slides
  for (const s of heroSlidesData) {
    await prisma.heroSlide.upsert({
      where: { id: s.id },
      update: {
        categoryTag: s.categoryTag,
        headline: s.headline,
        subtext: s.subtext,
        ctaText: s.ctaText,
        ctaAction: s.ctaAction,
        categoryId: s.categoryId,
        bgImage: s.bgImage,
        mainImage: s.mainImage,
        detailImage: s.detailImage,
        detailBadge: s.detailBadge,
        sortOrder: s.sortOrder,
      },
      create: {
        id: s.id,
        categoryTag: s.categoryTag,
        headline: s.headline,
        subtext: s.subtext,
        ctaText: s.ctaText,
        ctaAction: s.ctaAction,
        categoryId: s.categoryId,
        bgImage: s.bgImage,
        mainImage: s.mainImage,
        detailImage: s.detailImage,
        detailBadge: s.detailBadge,
        sortOrder: s.sortOrder,
      },
    });
    results.heroSlides++;
  }

  // 6. Testimonials
  for (const t of testimonialsData) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: {
        name: t.name,
        role: t.role,
        projectTag: t.projectTag,
        photoUrl: t.photoUrl,
        rating: t.rating,
        reviewText: t.reviewText,
        location: t.location,
        isVerified: t.isVerified,
      },
      create: {
        id: t.id,
        name: t.name,
        role: t.role,
        projectTag: t.projectTag,
        photoUrl: t.photoUrl,
        rating: t.rating,
        reviewText: t.reviewText,
        location: t.location,
        isVerified: t.isVerified,
      },
    });
    results.testimonials++;
  }

  return results;
}
