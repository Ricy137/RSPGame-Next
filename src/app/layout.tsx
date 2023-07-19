import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import JotaiProvider from "@/modules/JotaiProvider";

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
          <div className="fixed p-[24px] w-full h-[80px]">
            <Link href="/">
              <Button>Back to landing </Button>
            </Link>
          </div>
          {children}
        </JotaiProvider>
      </body>
    </html>
  );
}
