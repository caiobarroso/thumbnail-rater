/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "dynamic-snake-347.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
