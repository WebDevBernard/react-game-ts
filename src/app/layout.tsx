import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import DotBackground from "@/components/DotBackground";
import "./globals.css";

const font = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Net Ninja's Memory Game",
  description: "A React memory game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hero-bg">
      <body className={`${font.className}`}>
        <DotBackground />
        {children}
      </body>
    </html>
  );
}
