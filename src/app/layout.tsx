import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Cinzel_Decorative, Crimson_Text } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Dice&Cards Era",
  description: "Turn-based strategy game set in a medieval dark-fantasy world",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${cinzel.variable}
          ${cinzelDecorative.variable}
          ${crimsonText.variable}
          antialiased min-h-screen bg-medieval-bg-deep
        `}
      >
        {children}
      </body>
    </html>
  );
}
