/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname:'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname:'flowbite.com',
      }
    ],
  },
  output: 'standalone'
};

export default nextConfig;
