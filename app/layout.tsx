import Footer from "@/sections/Footer/Footer";
import Navbar from "@/sections/Navbar/Navbar";
import { GeistSans } from "geist/font/sans";
import { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Todo-Doing-Done",
  description:
    "A project management tool similar to Trello or Jira, featuring tickets and boards.",
  openGraph: {
    title: "Todo-Doing-Done, Project Management Board",
    description:
      "Manage your projects efficiently with our tool, featuring boards and tickets.",
    url: "https://todo-doing-done.kbueno-studio.com/",
    type: "website",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} data-theme="light">
      <body>
        <Providers>
          <main className="min-h-screen flex flex-col items-center">
            <Navbar />

            {children}
          </main>

          <div
            id="toast-container"
            className="toast toast-bottom toast-end z-[9999]"
          ></div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
