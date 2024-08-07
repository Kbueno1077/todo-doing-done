/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["api.microlink.io"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.daisyui.com",
                pathname: "**",
            },
        ],
    },
};

module.exports = nextConfig;
