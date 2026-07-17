import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYNC Starter",
  description: "Minimal starter shell for the SYNC project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
