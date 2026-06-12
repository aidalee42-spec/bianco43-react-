import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bianco43 — Fine Dining & Premium Catering | Westminster, London",
  description:
    "Authentic Italian fine dining in the heart of Westminster. Award-winning catering, private events, and an unforgettable culinary experience at 7 Northumberland Avenue, London.",
  openGraph: {
    title: "Bianco43 — Fine Dining & Premium Catering",
    description:
      "Authentic Italian fine dining in Westminster. Award-winning catering and private events.",
    type: "website",
    locale: "en_GB",
    siteName: "Bianco43",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
