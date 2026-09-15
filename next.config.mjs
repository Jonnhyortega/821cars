/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
        {
          protocol: "https",
          hostname: "img.icons8.com",
        },
        {
          protocol: "https",
          hostname: "car-logos.b-cdn.net",
        },
        {
          protocol: "https",
          hostname: "1000marcas.net",
        },
        {
          protocol: "https",
          hostname: "static.vecteezy.com",
        },
      ],
    },
  };
  
  export default nextConfig;
  