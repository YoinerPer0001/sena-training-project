'use client'
import { Work_Sans } from "next/font/google";
import Head from 'next/head';
import { Footer } from "@/components/Footer/Footer";
import "./globals.css";
import {Providers} from "./providers";
// import {NextUIProvider} from "@nextui-org/react";

const work_sans = Work_Sans({ subsets: ["latin"], weight: ['300','400','500','600','700','800'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={work_sans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
