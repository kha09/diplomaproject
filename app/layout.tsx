import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script"; // Import Script component
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
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="GPLPvl8Xs7aHtWfjgnNBYTZ4rC49PAPazb8m7dIACjw" />

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MGZNCVFV');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PLNMS536W8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PLNMS536W8');
          `}
        </Script>
        {/* End Google tag (gtag.js) */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MGZNCVFV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>{children}</Providers> {/* Wrap children with Providers */}
      </body>
    </html>
  );
}
