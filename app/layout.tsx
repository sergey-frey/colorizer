import type { Metadata } from "next";
import "./globals.css";
import { cn, NextUIProvider } from "@nextui-org/react";

// Supports weights 100-900
import "@fontsource-variable/montserrat";

export const metadata: Metadata = {
  title: "Colorizer",
  description: "Color palette generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NextUIProvider>
          <main className={cn("header")}>{children}</main>
        </NextUIProvider>
      </body>
    </html>
  );
}
