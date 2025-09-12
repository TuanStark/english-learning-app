import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
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

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div></div>}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
