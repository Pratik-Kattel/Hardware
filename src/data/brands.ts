export interface BrandInfo {
  id: string;
  name: string;
  country: string;
  category: string;
  badge: string;
  logoText: string;
  description: string;
}

export const BRANDS: BrandInfo[] = [
  {
    id: "bosch",
    name: "Bosch",
    country: "Germany",
    category: "Power Tools",
    badge: "Official Dealer",
    logoText: "BOSCH",
    description: "Invented for life. Heavy-duty angle grinders, drills, and measuring devices.",
  },
  {
    id: "makita",
    name: "Makita",
    country: "Japan",
    category: "Cordless & Power Tools",
    badge: "Authorized Partner",
    logoText: "makita",
    description: "Pioneering cordless technology and brushless construction tools worldwide.",
  },
  {
    id: "dewalt",
    name: "DeWalt",
    country: "USA",
    category: "Heavy Duty Tools",
    badge: "Guaranteed Tough",
    logoText: "DEWALT",
    description: "Rugged contractor-grade saws, demolition hammers, and impact wrenches.",
  },
  {
    id: "asian-paints",
    name: "Asian Paints",
    country: "Nepal / India",
    category: "Paints & Waterproofing",
    badge: "Preferred Dealer",
    logoText: "asianpaints",
    description: "Apex Ultima, Royale Luxury, and Damp-Proof solutions engineered for Himalayan weather.",
  },
  {
    id: "jaquar",
    name: "Jaquar",
    country: "India",
    category: "Bath & Sanitary",
    badge: "10-Yr Warranty Partner",
    logoText: "jaquar",
    description: "Complete luxury bathroom solutions, faucets, overhead showers, and sanitary ware.",
  },
  {
    id: "astral",
    name: "Astral Pipes",
    country: "India",
    category: "Plumbing Systems",
    badge: "Certified Supplier",
    logoText: "ASTRAL",
    description: "Chlorinated polyvinyl chloride (CPVC) and PVC pressure piping systems.",
  },
  {
    id: "havells",
    name: "Havells",
    country: "India",
    category: "Wires & Electrical",
    badge: "Original Guarantee",
    logoText: "HAVELLS",
    description: "Flame-retardant industrial cables, modular switchgear, and commercial LED lighting.",
  },
  {
    id: "stanley",
    name: "Stanley",
    country: "USA",
    category: "Hand Tools",
    badge: "Authentic Tools",
    logoText: "STANLEY",
    description: "World's leading manufacturer of tape measures, claw hammers, and utility knives.",
  },
  {
    id: "taparia",
    name: "Taparia",
    country: "India",
    category: "Precision Hand Tools",
    badge: "Contractor Choice",
    logoText: "TAPARIA",
    description: "High-grade forged steel pliers, socket sets, and spanners for technicians.",
  },
  {
    id: "dr-fixit",
    name: "Dr. Fixit",
    country: "India",
    category: "Waterproofing",
    badge: "Waterproof Specialist",
    logoText: "Dr. Fixit",
    description: "Total leakage repair, roof coatings, crack filler, and damp shield technology.",
  },
  {
    id: "kirloskar",
    name: "Kirloskar",
    country: "India",
    category: "Water Pumps",
    badge: "ISO Certified",
    logoText: "Kirloskar",
    description: "High head domestic monoblock pumps and commercial submersible water motors.",
  },
  {
    id: "karam",
    name: "Karam Safety",
    country: "India",
    category: "Personal Protective Equipment",
    badge: "CE / EN Certified",
    logoText: "KARAM",
    description: "Leading safety helmet, harness, steel-toe boot, and fall protection gear.",
  },
];
