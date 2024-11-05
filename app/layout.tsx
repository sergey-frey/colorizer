import { Header } from "@/src/widgets/header";
import "@fontsource-variable/montserrat";
import { cn } from "@nextui-org/react";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Providers } from "./providers";

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
          <ToastContainer position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
