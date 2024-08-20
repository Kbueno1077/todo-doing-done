import Navbar from "@/sections/Navbar/Navbar";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/sections/Footer/Footer";
import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Project Management Board",
    description:
        "A project management tool similar to Trello or Jira, featuring tickets and boards.",
    openGraph: {
        title: "Project Management Board",
        description:
            "Manage your projects efficiently with our tool, featuring boards and tickets.",
        url: "https://kbueno-studios.com",
        type: "website",
        images: [
            {
                url: "https://kbueno-studios.com/og-image.jpg",
                width: 800,
                height: 600,
                alt: "Project Management Board",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@yourtwitterhandle",
        title: "Project Management Board",
        description:
            "Manage your projects efficiently with our tool, featuring boards and tickets.",
        image: "https://kbueno-studios.com/twitter-image.jpg",
    },
};

export default function RootLayout({
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
