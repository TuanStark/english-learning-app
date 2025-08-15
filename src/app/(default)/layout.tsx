import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EnglishMaster - Luyện thi TOEIC & IELTS",
  description: "Nền tảng luyện thi tiếng Anh hàng đầu với hàng nghìn câu hỏi chất lượng cao, giải thích chi tiết và hệ thống chấm điểm thông minh.",
  keywords: "TOEIC, IELTS, luyện thi tiếng Anh, học tiếng Anh online, đề thi TOEIC, đề thi IELTS",
  authors: [{ name: "EnglishMaster Team" }],
  openGraph: {
    title: "EnglishMaster - Luyện thi TOEIC & IELTS",
    description: "Nền tảng luyện thi tiếng Anh hàng đầu",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
