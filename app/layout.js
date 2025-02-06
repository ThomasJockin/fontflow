import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {DataProvider} from '../component/DataProvider.jsx';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FontFlow Sprints",
  description: "Get in the font-pairing flow in 90 minute sprints",
    viewport: "width=device-width, initial-scale=1"
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}

