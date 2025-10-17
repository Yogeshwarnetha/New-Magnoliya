import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['sgpshtest.blob.core.windows.net', 'propertysourcehub.co.uk', 'www.gbdarchitects.com', '5.imimg.com', 'media.istockphoto.com', 'example.com', 'images.unsplash.com', 'pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev', 'pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev', 'pub-837447cab048469baef2e30fbd0a9877.r2.dev'],

  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
