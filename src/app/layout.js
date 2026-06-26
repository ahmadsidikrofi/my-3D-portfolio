import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ClickSpark from "@/components/ClickSpark";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";
import GlobalPlayer from "@/components/GlobalPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rofi's Lab Portfolio",
  description: "Rofi's Portfolio: The portfolio of Ahmad Sidik Rofiudin. A Software Engineer building reliable real-time systems and AI integrations for modern business solutions",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AudioProvider>
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
          <GlobalPlayer />
          <Toaster position="bottom-right" />
        </AudioProvider>
      </body>
    </html>
  );
}
