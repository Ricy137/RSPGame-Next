import "./globals.css";
import type { Metadata } from "next";
import JotaiProvider from "@/modules/JotaiProvider";
import NetworkListener from "@/modules/NetworkListen";
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
          <NetworkListener>
            <>
              <Navbar />
              {children}
            </>
          </NetworkListener>
        </JotaiProvider>
      </body>
    </html>
  );
}
