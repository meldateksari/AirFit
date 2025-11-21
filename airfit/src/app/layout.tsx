import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google"; // Google Fonts'tan çekiyoruz
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "AirFit - Akıllı Giyim Asistanı",
  description: "Hava durumuna göre yapay zeka destekli giyim önerileri.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${montserrat.variable} bg-brand-dark text-brand-white font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}