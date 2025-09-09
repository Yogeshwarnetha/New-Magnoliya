import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['sgpshtest.blob.core.windows.net', 'propertysourcehub.co.uk', 'www.gbdarchitects.com', '5.imimg.com', 'media.istockphoto.com', 'example.com', 'images.unsplash.com'],

  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
