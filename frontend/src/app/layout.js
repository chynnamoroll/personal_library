import { Noto_Serif_Thai, Sarabun } from "next/font/google";
import "./globals.css";

const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-serif-thai",
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700"],
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Personal Book Library",
  description: "ระบบจัดการคลังหนังสือส่วนตัว",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="th"
      className={`${notoSerifThai.variable} ${sarabun.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
