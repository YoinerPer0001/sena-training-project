'use client'
import { Work_Sans } from "next/font/google";
import Head from 'next/head';
import { Footer } from "@/components/Footer/Footer";
import { store } from './store';
import { Provider } from 'react-redux'
import "./globals.css";
import { NavHome } from "@/components/Nav/NavHome";

const work_sans = Work_Sans({ subsets: ["latin"], weight: ['300','400','500','600','700','800'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>  
        <title>SENA Learn</title>
        <meta name="description" content="Desarrolla, crea y aprende. Todo aquí, en SENA Learn"></meta>
      </Head>
      <body className={work_sans.className}>
        <Provider store={store}>
          {children}  
        </Provider>
      </body>
    </html>
  );
}
