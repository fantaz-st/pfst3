/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.pfst.hr",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "backend.pfst.hr",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        pathname: "localhost:3000/",
      },
    ],
  },
};

export default nextConfig;
