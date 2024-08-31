import Footer from "@/sections/Footer/Footer";
import Navbar from "@/sections/Navbar/Navbar";
import { createClient } from "@/utils/supabase/server";
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
        // image: "https://kbueno-studios.com/twitter-image.jpg",
    },
};

// export const viewport: Viewport = {
//     initialScale: 1,
//     maximumScale: 1,
//     width: "device-width",
//     viewportFit: "cover",
//     userScalable: false,
// };

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    let userData = null;
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        userData = { ...user };
    }

    // Fetch additional user info from your custom table
    if (user) {
        const { data: userProfile, error: profileError } = await supabase
            .from("Users")
            .select("*")
            .eq("id", user.id)
            .single();

        userData = { ...user, ...userProfile };
    }

    return (
        <html lang="en" className={GeistSans.className} data-theme="light">
            <body>
                <Providers>
                    <main className="min-h-screen flex flex-col items-center">
                        <Navbar user={userData} />

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
