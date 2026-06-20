import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ClickSpark from "@/components/ClickSpark";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "3D Portfolio",
  description: "3D Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClickSpark
          sparkColor="#000"
          sparkSize={14}
          sparkRadius={25}
          sparkCount={7}
          duration={800}
          className="flex-1 flex flex-col w-full relative"
        >
          {children}
        </ClickSpark>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
