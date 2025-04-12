import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/providers"; // Import the Providers component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "qeatourism", // Updated title
  description: "دبلوم أخصائي الجودة والتميز السياحي", // Keeping description for now, can be changed if needed
  // Open Graph Metadata
  openGraph: {
    title: "qeatourism - جائزة الجودة والتميز السياحي", // More descriptive OG title
    description: "دبلوم أخصائي الجودة والتميز السياحي والمزيد", // Slightly expanded OG description
    type: "website",
    url: "https://www.qeatourism.com/", // Replace with your actual domain
    images: [
      {
        url: "/static/images/logoprizenew.png", // URL to your OG image
        width: 220, // Specify image dimensions if known
        height: 220,
        alt: "Qeatourism Logo",
      },
    ],
    siteName: "Qeatourism", // Your site's name
  },
  // Optional: Twitter specific tags (often mirrors Open Graph)
  twitter: {
    card: "summary_large_image", // Type of Twitter card
    title: "qeatourism - جائزة الجودة والتميز السياحي",
    description: "دبلوم أخصائي الجودة والتميز السياحي والمزيد",
    images: ["/static/images/logoprizenew.png"], // Must be an absolute URL in production, but relative works for Next.js dev/build
    // site: "@YourTwitterHandle", // Optional: Your Twitter handle
    // creator: "@CreatorTwitterHandle", // Optional: Content creator handle
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers> {/* Wrap children with Providers */}
      </body>
    </html>
  );
}
