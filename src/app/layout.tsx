import type { Metadata } from "next";
import { Reddit_Sans } from "next/font/google";
import "./globals.css";

const font = Reddit_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Collector Kojo's Shell Game",
  description: "A React memory game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>{children}</body>
    </html>
  );
}
