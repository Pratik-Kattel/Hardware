export type ProductCategory =
  | "power-tools"
  | "hand-tools"
  | "plumbing"
  | "electrical"
  | "fasteners"
  | "paint-supplies"
  | "construction-materials"
  | "safety-equipment"
  | "gardening"
  | "bathroom-sanitary"
  | "adhesives-sealants";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  price: number; // in NPR
  originalPrice?: number; // in NPR
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isBestDeal?: boolean;
  isNewArrival?: boolean;
  sku: string;
  unit: string;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  tags: string[];
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  nepaliName?: string;
  iconName: string;
  description: string;
  productCount: number;
  popularSubcategories: string[];
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerAddress {
  id: string;
  fullName: string;
  phone: string;
  area: string; // e.g. "Kalanki, Ward 14"
  city: "Kathmandu" | "Lalitpur" | "Bhaktapur" | "Outside Valley";
  landmark: string;
  isDefault?: boolean;
}

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: "customer" | "contractor";
  companyName?: string;
  panNumber?: string;
  savedAddresses: CustomerAddress[];
}

export type PaymentMethod = "cod" | "esewa" | "khalti" | "bank_fonepay";

export interface OrderItemSummary {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: CustomerAddress;
  items: OrderItemSummary[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  vatAmount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "paid" | "pending_cod" | "pending_verification";
  orderStatus: "Order Placed" | "Confirmed by Warehouse" | "Dispatched" | "Out for Delivery" | "Delivered";
  createdAt: string;
  estimatedDelivery: string;
  trackingTimeline: {
    status: string;
    location: string;
    timestamp: string;
    done: boolean;
    current?: boolean;
  }[];
}

export interface QuoteRequest {
  id: string;
  contractorName: string;
  companyName?: string;
  phone: string;
  email: string;
  projectType: "Residential Construction" | "Commercial Building" | "Plumbing Project" | "Electrical Renovation" | "Interior & Painting" | "Road & Civil Works";
  projectLocation: string; // e.g., "Baneshwor, Kathmandu"
  itemsNeeded: string;
  estimatedBudget?: string;
  taxPanNumber?: string;
  urgency: "Immediate (Within 24 Hours)" | "Standard (2-3 Days)" | "Upcoming Project";
  createdAt: string;
  status: "Received" | "Under Estimation" | "Quote Sent";
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}
