"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Product,
  ProductCategory,
  CartItem,
  CustomerUser,
  CustomerAddress,
  Order,
  QuoteRequest,
  ToastMessage,
  PaymentMethod,
  StoreInfoData,
  CategoryInfo,
  BrandInfo,
} from "@/types";
import { storeInfoData, categoriesData, brandsData } from "@/lib/seed-data";
import { clientFetch } from "@/lib/api-client";

interface StoreContextType {
  // Store info & dynamic data
  storeInfo: StoreInfoData;
  categories: CategoryInfo[];
  brands: BrandInfo[];

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  deliveryLocation: "inside_ring_road" | "outside_ring_road" | "outside_valley";
  setDeliveryLocation: (loc: "inside_ring_road" | "outside_ring_road" | "outside_valley") => void;
  deliveryFee: number;
  couponCode: string | null;
  discountAmount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Navigation
  activeModal: "cart" | "checkout" | "product_detail" | "order_confirmation" | "track_order" | "request_quote" | "auth" | null;
  openModal: (modal: "cart" | "checkout" | "product_detail" | "order_confirmation" | "track_order" | "request_quote" | "auth") => void;
  closeModal: () => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;

  // Search & Catalog Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ProductCategory | "all";
  setSelectedCategory: (cat: ProductCategory | "all") => void;
  selectedBrand: string | "all";
  setSelectedBrand: (brand: string | "all") => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  sortOption: "featured" | "price_asc" | "price_desc" | "rating" | "discount";
  setSortOption: (val: "featured" | "price_asc" | "price_desc" | "rating" | "discount") => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;

  // Customer & Auth
  user: CustomerUser | null;
  loginDemoUser: (role?: "customer" | "contractor") => void;
  logout: () => void;
  savedAddresses: CustomerAddress[];
  addSavedAddress: (addr: CustomerAddress) => void;

  // Orders & Tracking
  orders: Order[];
  currentOrder: Order | null;
  trackingOrder: Order | null;
  placeOrder: (
    address: CustomerAddress,
    paymentMethod: PaymentMethod,
    customerName: string,
    customerPhone: string,
    customerEmail?: string
  ) => Promise<Order>;
  trackOrderById: (orderId: string) => Order | null;

  // Quotes
  quoteRequests: QuoteRequest[];
  submitQuoteRequest: (quote: Omit<QuoteRequest, "id" | "createdAt" | "status">) => QuoteRequest;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: "success" | "info" | "warning" | "error") => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_DEMO_ADDRESSES: CustomerAddress[] = [
  {
    id: "addr-1",
    fullName: "Suman Adhikari",
    phone: storeInfoData.phone,
    area: "Ring Road, Ward 14",
    city: "Kathmandu",
    landmark: "Behind Global IME Bank",
    isDefault: true,
  },
  {
    id: "addr-2",
    fullName: "Suman Adhikari (Site 2)",
    phone: storeInfoData.phone,
    area: "Kumaripati, Jawalakhel Road",
    city: "Lalitpur",
    landmark: "Opposite St. Xavier's School",
    isDefault: false,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: "ADH-98412",
    orderNumber: "ORD-20260925-9841",
    customerName: "Suman Adhikari",
    customerPhone: storeInfoData.phone,
    customerEmail: "suman.adhikari@gmail.com",
    deliveryAddress: INITIAL_DEMO_ADDRESSES[0],
    items: [
      {
        productId: "bosch-gws-600",
        name: "Bosch GWS 600 Professional 4-Inch Angle Grinder (670W)",
        price: 4650,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
        unit: "Piece",
      },
      {
        productId: "taparia-combination-pliers-8",
        name: "Taparia 1621-8 Heavy Duty Combination Pliers",
        price: 480,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80",
        unit: "Piece",
      },
    ],
    subtotal: 5610,
    deliveryFee: 0,
    discount: 561,
    total: 5049,
    paymentMethod: "esewa",
    paymentStatus: "paid",
    orderStatus: "Out for Delivery",
    createdAt: "Today, 10:15 AM",
    estimatedDelivery: "Today by 4:30 PM",
    trackingTimeline: [
      {
        status: "Order Confirmed & Payment Received",
        location: "New Adhikari Traders, Kathmandu Central Hub",
        timestamp: "Today, 10:16 AM",
        done: true,
      },
      {
        status: "Quality Checked & Packed in Heavy Box",
        location: "Kathmandu Warehouse Dispatch Bay 2",
        timestamp: "Today, 11:30 AM",
        done: true,
      },
      {
        status: "Dispatched with Kathmandu Valley Delivery Van #3",
        location: "Ring Road Transit Route",
        timestamp: "Today, 1:45 PM",
        done: true,
      },
      {
        status: "Out for Delivery to Your Doorstep",
        location: "Kathmandu Delivery Area",
        timestamp: "Today, 3:10 PM",
        done: true,
        current: true,
      },
      {
        status: "Delivered & Signed",
        location: "Customer Address",
        timestamp: "Pending",
        done: false,
      },
    ],
  },
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Database-backed Dynamic Store Info
  const [storeInfo, setStoreInfo] = useState<StoreInfoData>({
    ...storeInfoData,
    stats: {
      yearsInBusiness: new Date().getFullYear() - 1998,
      ordersDelivered: 15400,
      productsCataloged: 2500,
      authorizedBrands: 40,
      satisfactionRate: 99.4,
    },
  });

  // Dynamic Categories & Brands from API
  const [categories, setCategories] = useState<CategoryInfo[]>(categoriesData as any);
  const [brands, setBrands] = useState<BrandInfo[]>(brandsData as any);

  // Fetch live store info, categories, and brands on mount (deduplicated via clientFetch)
  useEffect(() => {
    clientFetch("/api/store-info")
      .then((data) => {
        if (data) setStoreInfo(data);
      })
      .catch(() => {});

    clientFetch("/api/categories")
      .then((data) => {
        if (data && Array.isArray(data)) setCategories(data);
      })
      .catch(() => {});

    clientFetch("/api/brands")
      .then((data) => {
        if (data && Array.isArray(data)) setBrands(data);
      })
      .catch(() => {});
  }, []);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryLocation, setDeliveryLocation] = useState<
    "inside_ring_road" | "outside_ring_road" | "outside_valley"
  >("inside_ring_road");
  const [couponCode, setCouponCode] = useState<string | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(["bosch-gws-600", "makita-df333d-cordless-drill"]);

  // Modals
  const [activeModal, setActiveModal] = useState<
    "cart" | "checkout" | "product_detail" | "order_confirmation" | "track_order" | "request_quote" | "auth" | null
  >(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Search & Catalog Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [selectedBrand, setSelectedBrand] = useState<string | "all">("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState<"featured" | "price_asc" | "price_desc" | "rating" | "discount">("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // User & Auth
  const [user, setUser] = useState<CustomerUser | null>({
    id: "usr-demo",
    name: "Suman Adhikari",
    phone: storeInfoData.phone,
    email: "suman.adhikari@gmail.com",
    role: "contractor",
    companyName: "Adhikari Engineering & Builders",
    savedAddresses: INITIAL_DEMO_ADDRESSES,
  });
  const [savedAddresses, setSavedAddresses] = useState<CustomerAddress[]>(INITIAL_DEMO_ADDRESSES);

  // Orders
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(INITIAL_ORDERS[0]);

  // Quotes
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load cart & wishlist from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("adhikari_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem("adhikari_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem("adhikari_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Save wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem("adhikari_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const deliveryFee =
    deliveryLocation === "inside_ring_road"
      ? cartSubtotal >= 10000
        ? 0
        : 150
      : deliveryLocation === "outside_ring_road"
      ? cartSubtotal >= 15000
        ? 0
        : 300
      : 500;

  const discountAmount = couponCode === "ADHIKARI10" ? Math.round(cartSubtotal * 0.1) : 0;
  const cartTotal = cartSubtotal - discountAmount + deliveryFee;

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });

    addToast(
      "Added to Cart",
      `${product.name} (x${quantity}) has been added to your hardware order.`,
      "success"
    );

    // Sync with backend API
    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id || "guest-session",
        productId: product.id,
        quantity,
      }),
    }).catch(() => {});
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );

    fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id || "guest-session",
        productId,
        quantity,
      }),
    }).catch(() => {});
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    addToast("Item Removed", "Product removed from cart.", "info");

    fetch(`/api/cart?userId=${user?.id || "guest-session"}&productId=${productId}`, {
      method: "DELETE",
    }).catch(() => {});
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode(null);

    fetch(`/api/cart?userId=${user?.id || "guest-session"}&clearAll=true`, {
      method: "DELETE",
    }).catch(() => {});
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "ADHIKARI10") {
      setCouponCode("ADHIKARI10");
      addToast("Discount Applied", "10% Contractor discount applied to order!", "success");
      return true;
    } else {
      addToast("Invalid Code", "Please use code ADHIKARI10 for 10% discount.", "error");
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
    addToast("Discount Removed", "Discount code has been cleared.", "info");
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast("Wishlist", "Item removed from your saved list.", "info");
        fetch(`/api/wishlist?userId=${user?.id || "guest-session"}&productId=${productId}`, {
          method: "DELETE",
        }).catch(() => {});
        return prev.filter((id) => id !== productId);
      } else {
        addToast("Wishlist", "Item saved to your wishlist!", "success");
        fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id || "guest-session",
            productId,
          }),
        }).catch(() => {});
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Modals
  const openModal = (
    modal: "cart" | "checkout" | "product_detail" | "order_confirmation" | "track_order" | "request_quote" | "auth"
  ) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setActiveModal("product_detail");
  };

  // Auth & Addresses
  const loginDemoUser = (role: "customer" | "contractor" = "contractor") => {
    setUser({
      id: "usr-demo",
      name: "Suman Adhikari",
      phone: storeInfoData.phone,
      email: "suman.adhikari@gmail.com",
      role,
      companyName: role === "contractor" ? "Adhikari Engineering & Builders" : undefined,
      savedAddresses: INITIAL_DEMO_ADDRESSES,
    });
    addToast("Logged In", `Logged in as Suman Adhikari (${role})`, "success");
  };

  const logout = () => {
    setUser(null);
    addToast("Logged Out", "You have been logged out.", "info");
  };

  const addSavedAddress = (addr: CustomerAddress) => {
    setSavedAddresses((prev) => [...prev, addr]);
    if (user) {
      setUser({
        ...user,
        savedAddresses: [...user.savedAddresses, addr],
      });
    }
    addToast("Address Saved", "Delivery address added to profile.", "success");
  };

  // Place Order (Calls /api/orders backend)
  const placeOrder = async (
    address: CustomerAddress,
    paymentMethod: PaymentMethod,
    customerName: string,
    customerPhone: string,
    customerEmail?: string
  ): Promise<Order> => {
    const orderItemsSummary = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images?.[0] || "/images/placeholder.webp",
      unit: item.product.unit || "Piece",
    }));

    // Post to Neon DB route handler
    let createdOrderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone: customerPhone,
          deliveryAddress: `${address.area}, ${address.city}`,
          landmark: address.landmark,
          deliveryFee,
          subtotal: cartSubtotal - discountAmount,
          total: cartTotal,
          userId: user?.id,
          items: cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            unitPrice: item.product.price,
          })),
        }),
      });

      if (response.ok) {
        const dbOrder = await response.json();
        if (dbOrder.orderNumber) {
          createdOrderNumber = dbOrder.orderNumber;
        }
      }
    } catch (e) {
      console.warn("Neon order API fallback:", e);
    }

    const newOrder: Order = {
      id: createdOrderNumber,
      orderNumber: createdOrderNumber,
      customerName,
      customerPhone,
      customerEmail: customerEmail || user?.email,
      deliveryAddress: address,
      items: orderItemsSummary,
      subtotal: cartSubtotal,
      deliveryFee,
      discount: discountAmount,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending_cod" : "paid",
      orderStatus: "Order Placed",
      createdAt: "Just now",
      estimatedDelivery: "Same-Day Dispatch (Within 4 Hours)",
      trackingTimeline: [
        {
          status: "Order Confirmed & Received",
          location: "New Adhikari Traders Central Kathmandu Hub",
          timestamp: "Just now",
          done: true,
          current: true,
        },
        {
          status: "Packing & Material Check",
          location: "Kathmandu Valley Warehouse",
          timestamp: "Estimated next 45 mins",
          done: false,
        },
        {
          status: "Loaded on Dispatch Vehicle",
          location: "Valley Transit Hub",
          timestamp: "Pending",
          done: false,
        },
        {
          status: "Delivered to Project Site",
          location: `${address.area}, ${address.city}`,
          timestamp: "Pending",
          done: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    setTrackingOrder(newOrder);
    clearCart();
    openModal("order_confirmation");

    addToast(
      "Order Placed!",
      `Order #${newOrder.id} confirmed. Delivery dispatched to ${address.area}.`,
      "success"
    );

    return newOrder;
  };

  const trackOrderById = (orderId: string): Order | null => {
    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === orderId.toLowerCase() ||
        (o.orderNumber && o.orderNumber.toLowerCase() === orderId.toLowerCase())
    );
    if (found) {
      setTrackingOrder(found);
      return found;
    }
    return null;
  };

  // Quotes
  const submitQuoteRequest = (quoteData: Omit<QuoteRequest, "id" | "createdAt" | "status">): QuoteRequest => {
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `QT-${Date.now().toString().slice(-5)}`,
      createdAt: "Just now",
      status: "Received",
    };
    setQuoteRequests((prev) => [newQuote, ...prev]);
    addToast(
      "Estimate Requested!",
      `Quotation request #${newQuote.id} received. Our lead estimator will call ${newQuote.phone} shortly.`,
      "success"
    );
    return newQuote;
  };

  // Toasts
  const addToast = (
    title: string,
    message: string,
    type: "success" | "info" | "warning" | "error" = "info"
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        storeInfo,
        categories,
        brands,
        cart,
        cartCount,
        cartSubtotal,
        deliveryLocation,
        setDeliveryLocation,
        deliveryFee,
        couponCode,
        discountAmount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        activeModal,
        openModal,
        closeModal,
        selectedProduct,
        openProductDetail,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        inStockOnly,
        setInStockOnly,
        sortOption,
        setSortOption,
        priceRange,
        setPriceRange,
        viewMode,
        setViewMode,
        user,
        loginDemoUser,
        logout,
        savedAddresses,
        addSavedAddress,
        orders,
        currentOrder,
        trackingOrder,
        placeOrder,
        trackOrderById,
        quoteRequests,
        submitQuoteRequest,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
