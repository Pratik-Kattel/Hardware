import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { AppShell } from "@/components/AppShell";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "New Adhikari Traders | Hardware & Industrial Store in Kathmandu, Nepal",
  description:
    "New Adhikari Traders is Kathmandu's trusted distributor for Power Tools, Hand Tools, Plumbing, Electrical, Paints, and Construction Materials. Direct site delivery across Kathmandu Valley. Address: Kathmandu, Bagmati Province 44600. Phone: 985-1145065.",
  keywords: [
    "New Adhikari Traders",
    "Adhikari Hardware",
    "Hardware Nepal",
    "Power Tools Kathmandu",
    "Bosch Nepal",
    "Makita Nepal",
    "Asian Paints Nepal",
    "Plumbing Nepal Astral",
    "Construction materials Kathmandu",
    "eSewa Hardware",
    "Khalti Hardware Nepal",
  ],
  authors: [{ name: "New Adhikari Traders" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaOrgData = {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    name: "New Adhikari Traders",
    alternateName: "Adhikari Hardware",
    description:
      "Leading hardware and building materials distributor in Kathmandu, Nepal. Authorized stockist of Bosch, Makita, Astral Pipes, Asian Paints, and Havells.",
    url: "https://newadhikaritraders.com.np",
    telephone: "+977-9851145065",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kathmandu",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati Province",
      postalCode: "44600",
      addressCountry: "NP",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "20:00",
      },
    ],
    priceRange: "NPR",
    paymentAccepted: "Cash, Credit Card, eSewa, Khalti, Fonepay",
  };

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
        />
      </head>
      <body className={poppins.className}>
        <StoreProvider>
          <AppShell>{children}</AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}
