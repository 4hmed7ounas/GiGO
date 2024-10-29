// next.config.mjs
/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // Matches any hostname
      },
    ],
  },
};
