import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Dapur Liyin",
    template: "%s | Dapur Liyin",
  },
  description: "Inspirasi resep lezat — temukan dan bagikan resep makanan terbaik.",
  keywords: [
    "Resep",
    "Makanan",
    "Minuman",
    "Masakan",
    "Dapur Liyin",
  ],
  metadataBase: new URL("https://dapurliyin21-phi.vercel.app"),
  openGraph: {
    title: "Dapur Liyin",
    description: "Inspirasi resep lezat — temukan dan bagikan resep makanan terbaik.",
    siteName: "Dapur Liyin",
    locale: "id_ID",
    type: "website",
  },
  // TODO: paste the verification code Google Search Console gives you here,
  // e.g. verification: { google: "AbCdEfGh123..." }.
  // See the "HTML tag" option when adding your property at
  // https://search.google.com/search-console
  verification: {
    google: "SofAhd8WuqnOSbv0qlcksHEX3u57BVRBPw5Z1sJ2FSY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${playfair.variable}`}
    >
      <body className="bg-white text-slate-900 antialiased">
        <Navbar />
        {children}
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}