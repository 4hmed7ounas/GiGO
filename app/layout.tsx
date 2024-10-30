import React from "react";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Chatbot from "./chatbot/page";
// import Footer from "./components/footer"

const DMSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={DMSans.className}>
        {children}
        <Chatbot />
        {/* <Footer /> */}
      </body>
    </html>
  );
}
