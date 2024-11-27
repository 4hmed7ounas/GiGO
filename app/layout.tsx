"use client";
import React from "react";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Chatbot from "./chatbot/page";
import Footer from "./components/footer";
import { usePathname } from "next/navigation";

const DMSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={DMSans.className}>
        {children}
        {pathname !== "/auth/signin" &&
          pathname !== "/auth/signup" &&
          pathname !== "/realTimeChat" &&
          pathname !== "/discussionForums" && <Chatbot />}
        {pathname !== "/auth/signin" &&
          pathname !== "/auth/signup" &&
          pathname !== "/realTimeChat" &&
          pathname !== "/discussionForums" && <Footer />}
      </body>
    </html>
  );
}
