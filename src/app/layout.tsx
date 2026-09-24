import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
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
  title: "Adhikari Hardware | Leading Hardware & Industrial Store in Kathmandu, Nepal",
  description:
    "Adhikari Hardware is Nepal's premier destination for Power Tools, Hand Tools, Plumbing, Electrical, Paints, and Construction Materials. Direct delivery across Kathmandu Valley. Phone: 9800000000.",
  keywords: [
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
  authors: [{ name: "Adhikari Hardware" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
