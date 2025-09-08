import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/session-provider";
import { generatePageMetadata, generateOrganizationStructuredData } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: "English Learning App - Học Tiếng Anh Hiệu Quả",
    description: "Nền tảng học tiếng Anh toàn diện với bài tập, từ vựng, ngữ pháp và AI tutor. Phương pháp học hiện đại, hiệu quả cao.",
    keywords: ["học tiếng anh", "english learning", "toeic", "ielts", "vocabulary", "grammar", "ai tutor"],
    type: "website",
  }),
  icons: {
    icon: [
      { url: '/images/logorm.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
