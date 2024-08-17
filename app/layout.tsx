import Navbar from "@/modules/Navbar/Navbar";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
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

                    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs mt-5">
                        <p>
                            Powered by
                            <a
                                href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                                target="_blank"
                                className="font-bold hover:underline"
                                rel="noreferrer"
                            >
                                Supabase
                            </a>
                        </p>
                    </footer>
                </Providers>
            </body>
        </html>
    );
}
