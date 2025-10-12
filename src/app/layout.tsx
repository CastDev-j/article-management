import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import { Footer } from "@/components/footer";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gestión de Artículos",
  description: "Sistema de gestión de artículos con categorías",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${lora.variable}`}>
      <ClerkProvider>
        <body className="flex min-h-screen flex-col antialiased">
          {children}
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
