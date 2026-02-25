import type { Metadata } from "next";
import "./globals.css";
import HeaderWrapper from "@/app/components/HeaderWrapper";
import { ThemeProvider } from "@/app/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Nirmatri",
  description: "Nirmatri Frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     <body
  className="
   min-h-screen
bg-gradient-to-br from-[#F0FFF4] via-[#C6F6D5] to-[#9AE6B4] text-[#22543D]
  "
>
        {/*  THEME PROVIDER (ROOT) */}
        <ThemeProvider>
          {/*  HEADER + SIDEBAR CONTROLLER */}
          <HeaderWrapper />

          {/*  PAGE CONTENT */}
         <main className="min-h-screen">
  {children}
</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
