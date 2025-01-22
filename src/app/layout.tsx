import type { Metadata } from "next";
import "./globals.css";
import { inter } from "../config/font";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: 'Teslo | Shop'
  },
  description: "Tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        
        {children}
      </body>
    </html>
  );
}
