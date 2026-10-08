import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexora2k26.srivasaviengg.ac.in"),
  title: "NEXORA | Freshers Party 2K26 | Sri Vasavi Engineering College",
  description:
    "NEXORA – Freshers Party 2K26 at Sri Vasavi Engineering College (Autonomous), Tadepalligudem. New Faces. New Vibe. One Family. Official portal for CSE, CST, and IT departments.",
  keywords: [
    "NEXORA",
    "Freshers Party 2K26",
    "Sri Vasavi Engineering College",
    "SVEC Tadepalligudem",
    "CSE",
    "CST",
    "IT",
    "Freshers 2026",
    "YNS Auditorium",
  ],
  authors: [{ name: "SVEC CSE/CST/IT Student Organizing Committee" }],
  openGraph: {
    title: "NEXORA | Freshers Party 2K26 | Sri Vasavi Engineering College",
    description:
      "NEW FACES ✦ NEW VIBE ✦ ONE FAMILY. Generate your official VIP invitation pass for NEXORA 2K26 at Sri Vasavi Engineering College.",
    url: "https://nexora2k26.srivasaviengg.ac.in",
    siteName: "NEXORA 2K26",
    images: [
      {
        url: "/assets/poster-banner.png",
        width: 940,
        height: 1673,
        alt: "NEXORA 2K26 Freshers Party Poster",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXORA | Freshers Party 2K26 | Sri Vasavi Engineering College",
    description:
      "NEW FACES ✦ NEW VIBE ✦ ONE FAMILY. Join us on 13th October 2026 at YNS Auditorium.",
    images: ["/assets/poster-banner.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/assets/college-logo.png" />
      </head>
      <body className="bg-[#030712] text-slate-100 min-h-screen selection:bg-yellow-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
