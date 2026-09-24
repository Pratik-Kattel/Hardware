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
} from "@/types";
import { PRODUCTS } from "@/data/products";

interface StoreContextType {
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
  ) => Order;
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
    phone: "9800000000",
    area: "Kalanki Chowk, Near Bafal Bridge",
    city: "Kathmandu",
    landmark: "Behind Global IME Bank",
    isDefault: true,
  },
  {
    id: "addr-2",
    fullName: "Suman Adhikari (Site 2)",
    phone: "9800000000",
    area: "Kumaripati, Jawalakhel Road",
    city: "Lalitpur",
    landmark: "Opposite St. Xavier's School",
    isDefault: false,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: "ADH-98412",
    customerName: "Suman Adhikari",
    customerPhone: "9800000000",
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
    vatAmount: 656,
    total: 5705,
    paymentMethod: "esewa",
    paymentStatus: "paid",
    orderStatus: "Out for Delivery",
    createdAt: "Today, 10:15 AM",
    estimatedDelivery: "Today by 4:30 PM",
    trackingTimeline: [
      {
        status: "Order Confirmed & VAT Bill Generated",
        location: "Adhikari Hardware, Kalanki Central Hub",
        timestamp: "Today, 10:16 AM",
        done: true,
      },
      {
        status: "Quality Checked & Packed in Heavy Box",
        location: "Kalanki Warehouse Dispatch Bay 2",
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
        location: "Kalanki Chowk Delivery Area",
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

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [selectedBrand, setSelectedBrand] = useState<string | "all">("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<
    "featured" | "price_asc" | "price_desc" | "rating" | "discount"
  >("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // User & Saved Addresses
  const [user, setUser] = useState<CustomerUser | null>({
    id: "usr-01",
    name: "Suman Adhikari",
    phone: "9800000000",
    email: "suman.adhikari@gmail.com",
    role: "customer",
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

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("adhikari_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        // Pre-populate with 2 default hardware items to immediately wow the user!
        setCart([
          { product: PRODUCTS[0], quantity: 1 }, // Bosch Grinder
          { product: PRODUCTS[4], quantity: 2 }, // Stanley Hammer
        ]);
      }
      const savedWishlist = localStorage.getItem("adhikari_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch {
      // Local storage disabled or error
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("adhikari_cart", JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Save wishlist
  useEffect(() => {
    try {
      localStorage.setItem("adhikari_wishlist", JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  // Toast helper
  const addToast = (
    title: string,
    message: string,
    type: "success" | "info" | "warning" | "error" = "success"
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Delivery fee calculation
  let deliveryFee = 0;
  if (cartSubtotal > 0) {
    if (deliveryLocation === "inside_ring_road") {
      deliveryFee = cartSubtotal >= 5000 ? 0 : 150;
    } else if (deliveryLocation === "outside_ring_road") {
      deliveryFee = 250;
    } else {
      deliveryFee = 500;
    }
  }

  // Coupon calculation
  let discountAmount = 0;
  if (couponCode === "ADHIKARI10") {
    discountAmount = Math.round(cartSubtotal * 0.1);
  } else if (couponCode === "BUILDNEPAL") {
    discountAmount = Math.min(500, cartSubtotal);
  } else if (couponCode === "KATHMANDU") {
    discountAmount = deliveryFee;
  }

  const cartTotal = Math.max(0, cartSubtotal + deliveryFee - discountAmount);

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(
      "Added to Cart",
      `${product.name} (x${quantity}) added. NPR ${product.price.toLocaleString()} each.`
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      addToast("Item Removed", `${item.product.name} removed from your cart.`, "info");
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    if (upper === "ADHIKARI10") {
      setCouponCode("ADHIKARI10");
      addToast("Coupon Applied!", "10% storewide discount activated.", "success");
      return true;
    }
    if (upper === "BUILDNEPAL") {
      setCouponCode("BUILDNEPAL");
      addToast("Coupon Applied!", "NPR 500 flat discount applied.", "success");
      return true;
    }
    if (upper === "KATHMANDU") {
      setCouponCode("KATHMANDU");
      addToast("Coupon Applied!", "Free Delivery across Kathmandu applied.", "success");
      return true;
    }
    addToast("Invalid Code", "Please check the coupon code (try ADHIKARI10 or BUILDNEPAL).", "warning");
    return false;
  };

  const removeCoupon = () => {
    setCouponCode(null);
    addToast("Coupon Removed", "Discount code has been cleared.", "info");
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      addToast("Removed from Wishlist", `${product?.name || "Item"} removed.`, "info");
    } else {
      setWishlist((prev) => [...prev, productId]);
      addToast("Saved to Wishlist", `${product?.name || "Item"} saved for later.`, "success");
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Modal actions
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

  // User / Auth
  const loginDemoUser = (role: "customer" | "contractor" = "customer") => {
    const demoUser: CustomerUser = {
      id: "usr-01",
      name: role === "contractor" ? "Rajesh Shrestha (Civil Builder)" : "Suman Adhikari",
      phone: "9800000000",
      email: role === "contractor" ? "rajesh.builders@gmail.com" : "suman.adhikari@gmail.com",
      role,
      companyName: role === "contractor" ? "Himalayan Builders & Construction Pvt. Ltd." : undefined,
      panNumber: role === "contractor" ? "602918239" : undefined,
      savedAddresses: INITIAL_DEMO_ADDRESSES,
    };
    setUser(demoUser);
    addToast("Logged In", `Welcome back, ${demoUser.name}!`, "success");
    closeModal();
  };

  const logout = () => {
    setUser(null);
    addToast("Logged Out", "You have safely signed out.", "info");
  };

  const addSavedAddress = (addr: CustomerAddress) => {
    setSavedAddresses((prev) => [addr, ...prev]);
    if (user) {
      setUser({ ...user, savedAddresses: [addr, ...user.savedAddresses] });
    }
    addToast("Address Saved", "Delivery address saved to your account.", "success");
  };

  // Order Placement
  const placeOrder = (
    address: CustomerAddress,
    paymentMethod: PaymentMethod,
    customerName: string,
    customerPhone: string,
    customerEmail?: string
  ): Order => {
    const orderId = `ADH-${Math.floor(10000 + Math.random() * 90000)}`;
    const vatAmount = Math.round(cartSubtotal * 0.13); // Nepal 13% VAT included

    const newOrder: Order = {
      id: orderId,
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress: address,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
        unit: item.product.unit,
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      discount: discountAmount,
      vatAmount,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending_cod" : "paid",
      orderStatus: "Order Placed",
      createdAt: "Just now",
      estimatedDelivery: "Tomorrow by 2:00 PM (Kathmandu Express)",
      trackingTimeline: [
        {
          status: "Order Placed & VAT Invoice Created",
          location: "Adhikari Hardware Online Store",
          timestamp: "Just now",
          done: true,
          current: true,
        },
        {
          status: "Order Packaging & Warehouse Quality Check",
          location: "Adhikari Central Depot, Kalanki Ring Road",
          timestamp: "Expected in 2 hours",
          done: false,
        },
        {
          status: "Valley Delivery Van Dispatched",
          location: "Kathmandu Valley Transit Route",
          timestamp: "Expected tomorrow morning",
          done: false,
        },
        {
          status: "Out for Delivery to Your Doorstep",
          location: `${address.area}, ${address.city}`,
          timestamp: "Expected tomorrow by 2:00 PM",
          done: false,
        },
        {
          status: "Delivered & Signed",
          location: `${address.area}`,
          timestamp: "Pending",
          done: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    setTrackingOrder(newOrder);
    clearCart();
    setActiveModal("order_confirmation");
    addToast(
      "Order Placed Successfully!",
      `Order #${orderId} confirmed. We will call ${customerPhone} before dispatch.`,
      "success"
    );
    return newOrder;
  };

  const trackOrderById = (orderId: string): Order | null => {
    const trimmed = orderId.trim().toUpperCase();
    const found = orders.find((o) => o.id.toUpperCase() === trimmed);
    if (found) {
      setTrackingOrder(found);
      setActiveModal("track_order");
      return found;
    }
    // Return sample order if not matched
    setTrackingOrder(INITIAL_ORDERS[0]);
    setActiveModal("track_order");
    addToast("Sample Order Loaded", `Displaying tracking progress for #${INITIAL_ORDERS[0].id}`, "info");
    return INITIAL_ORDERS[0];
  };

  // Quotes
  const submitQuoteRequest = (
    quote: Omit<QuoteRequest, "id" | "createdAt" | "status">
  ): QuoteRequest => {
    const id = `QUOTE-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuote: QuoteRequest = {
      ...quote,
      id,
      createdAt: "Today",
      status: "Received",
    };
    setQuoteRequests((prev) => [newQuote, ...prev]);
    addToast(
      "Quotation Request Sent!",
      `Reference #${id} created. Our contractor desk will call ${quote.phone} with wholesale rates within 2 hours.`,
      "success"
    );
    closeModal();
    return newQuote;
  };

  return (
    <StoreContext.Provider
      value={{
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
