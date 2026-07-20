import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYNC — All your media. Finally, together.",
  description:
    "SYNC brings every impression, every audience and every outcome into one clear picture so you can invest with confidence.",
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
