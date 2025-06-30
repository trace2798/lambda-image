import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import "./globals.css";


const generalSans = localFont({
  src: "../public/assets/fonts/GeneralSans-Variable.woff2",
  display: "swap",
  variable: "--font-general-sans",
});

const bespokeSerif = localFont({
  src: "../public/assets/fonts/BespokeSerif-Variable.woff2",
  display: "swap",
  variable: "--font-bespoke-serif",
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
      <body className={`${generalSans.variable} ${bespokeSerif.variable} antialiased font-generalSans`}>
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
