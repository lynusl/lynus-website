import type { Metadata } from "next";
import { cabin } from "@/app/ui/fonts";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${cabin.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
