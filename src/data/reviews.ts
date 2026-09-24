export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  projectType: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    name: "Er. Rajesh Shrestha",
    role: "Lead Civil Contractor",
    location: "Sitapaila, Kathmandu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "2 days ago",
    comment: "Adhikari Hardware is our go-to partner for all commercial site supplies in Kathmandu. When we poured our 4-storey foundation slab, they delivered 200 sacks of Shivam OPC and TMT steel directly to our Sitapaila site within 4 hours. Genuine VAT bills and wholesale contractor rates.",
    verifiedPurchase: true,
    projectType: "Commercial Building RCC Construction",
  },
  {
    id: "rev-2",
    name: "Bikash Maharjan",
    role: "Master Plumber & Sanitarian",
    location: "Mangalbazar, Lalitpur",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "1 week ago",
    comment: "I have been buying Astral CPVC pipes and Jaquar bath mixers for my clients from Adhikari Hardware for 6 years. Zero fake copies, 100% original fittings. Their staff even helps double check the pipe schedule.",
    verifiedPurchase: true,
    projectType: "Luxury Villa Sanitary Installation",
  },
  {
    id: "rev-3",
    name: "Nirmala Sharma",
    role: "Homeowner",
    location: "Budhanilkantha, Kathmandu",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "2 weeks ago",
    comment: "Ordered Asian Paints Apex Ultima and waterproofing chemicals through their website. Paid smoothly via eSewa, and the delivery van brought everything straight to our driveway in Budhanilkantha the very same afternoon. Fantastic service!",
    verifiedPurchase: true,
    projectType: "Home Exterior Repainting",
  },
  {
    id: "rev-4",
    name: "Dipen Tamang",
    role: "Licensed Electrical Contractor",
    location: "Koteshwor, Kathmandu",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "3 weeks ago",
    comment: "Finding genuine Havells HRFR pure copper wires in local retail shops is tricky due to duplicates. Adhikari Hardware gives authentic barcode-verified coils with company warranty. Their bulk quote system is very quick.",
    verifiedPurchase: true,
    projectType: "Multi-Apartment Electrical Wiring",
  },
];
