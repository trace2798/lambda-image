import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Lambda Images",
  description: "Optimize images on the fly",
  openGraph: {
    title: "Lambda Images",
    description: "Optimize images on the fly",
    url: `https://master.d2k7qje6c3xraz.amplifyapp.com/`,
    siteName: "lambda images",
    images: [
      {
        url: `https://master.d2k7qje6c3xraz.amplifyapp.com/og.webp`,
        width: 1200,
        height: 675,
      },
    ],
  },
  twitter: {
    title: "Lambda Images",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
