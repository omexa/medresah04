/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static export
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  trailingSlash: true, // Ensure trailing slash in export
};

export default nextConfig; // Use export default for ES modules
