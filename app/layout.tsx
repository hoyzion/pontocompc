import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- ATUALIZAÇÃO AQUI ---
// Adicionamos a propriedade 'icons' dentro do objeto metadata.
// Isso diz ao navegador para usar o arquivo 'favicon.png' que você
// colocou na pasta 'public'.
export const metadata: Metadata = {
  title: "Ponto Com Poços De Caldas",
  description: "Ponto Com Poços De Caldas Aqui você encotra tudo sobre informatica, tecnologia, games e muito mais.",
  icons: {
    icon: "/favicon.png", // <-- Caminho apontando para public/favicon.png
  },
};
// ------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Mantivemos suas classes originais para o layout
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}