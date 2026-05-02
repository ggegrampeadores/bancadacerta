import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Bancada Certa — Guia de Ferramentas de Fixação",
    template: "%s | Bancada Certa",
  },
  description:
    "Guia independente de grampeadores, pinadores e pregadores. Reviews técnicos, comparativos e recomendações para hobby e profissional.",
  keywords: ["grampeador", "pinador", "pregador", "pneumático", "bateria", "ferramentas fixação"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
