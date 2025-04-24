/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.daisyui.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "sxfpasuclnlqrljkmjdc.supabase.co",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "api.microlink.io",
                pathname: "**",
            },
        ],
    },
};

module.exports = nextConfig;
