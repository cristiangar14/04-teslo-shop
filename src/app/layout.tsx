import type { Metadata } from "next";
import "./globals.css";
import { inter } from "../config/font";
import { TopMenu } from "@/components";



export const metadata: Metadata = {
  title: "Teslo | Shop",
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
        <TopMenu />
        {children}
      </body>
    </html>
  );
}
