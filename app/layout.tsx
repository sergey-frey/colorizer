import { cn } from "@nextui-org/react";
import type { Metadata } from "next";
import "./globals.css";

// Supports weights 100-900
import "@fontsource-variable/montserrat";
import { Providers } from "./providers";
import { Header } from "@/src/widgets/header";

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
        <Providers>
          <Header className="header" />
          <main className={cn("main")}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
