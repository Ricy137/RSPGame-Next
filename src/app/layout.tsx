import "./globals.css";
import type { Metadata } from "next";
import { ToastRender } from "@/components/Toast";
import JotaiProvider from "@/modules/JotaiProvider";
import Navbar from "@/modules/Navbar";

export const metadata: Metadata = {
  title: "RPS game",
  description: "Rock Paper Scissors Lazer Spock game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JotaiProvider>
          <>
            <ToastRender />
            <Navbar />
            {children}
          </>
        </JotaiProvider>
      </body>
    </html>
  );
}
