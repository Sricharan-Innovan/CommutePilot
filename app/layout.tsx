import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: "CommutePilot — stop watching the stops",
  description:
    "On a route you have done four hundred times you still keep one eye on the window. CommutePilot counts the stops for you and wakes you one stop before you need to move — metro, train, bus, any city.",
  openGraph: {
    title: "CommutePilot — stop watching the stops. Use the ride instead.",
    description:
      "The commute problem nobody names: you never stop checking which stop you are at. One tap, then silence until one stop before yours.",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='9' fill='%23111'/%3E%3Crect x='10' y='6' width='12' height='13' rx='4' fill='%23FFE44D'/%3E%3Crect x='12' y='8.5' width='8' height='4' rx='1.5' fill='%23111'/%3E%3Ccircle cx='13' cy='16' r='1.4' fill='%23111'/%3E%3Ccircle cx='19' cy='16' r='1.4' fill='%23111'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
