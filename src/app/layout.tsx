import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mandy",
    template: "%s · Mandy",
  },
  description:
    "Mandy — new pieces, photos, and quick orders on WhatsApp.",
  applicationName: "Mandy",
  appleWebApp: {
    capable: true,
    title: "Mandy",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: "Mandy",
    description: "New pieces, photos, and quick orders on WhatsApp.",
    type: "website",
    siteName: "Mandy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mandy",
    description: "New pieces, photos, and quick orders on WhatsApp.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0812",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-dvh bg-[#050507] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
