import type { Metadata } from "next";
import { cabin } from "@/app/ui/fonts";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Lynus' Website",
  description: "website by lynus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${cabin.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
