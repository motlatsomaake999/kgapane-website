// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add domains here if you use external images
    // domains: ["your-cdn.example.com"],
  },
  // Ensure Next.js recognizes routes inside src/pages
  experimental: {
    appDir: false, // disable App Router since you're using Pages Router
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],
};

module.exports = nextConfig;
