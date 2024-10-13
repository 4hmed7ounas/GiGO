// next.config.mjs
/** @type {import('next').NextConfig} */
export default {
  images: {
    domains: [
      'encrypted-tbn0.gstatic.com',  
      'media.licdn.com',  
      'www.google.com',  
      'mir-s3-cdn-cf.behance.net'  // New domain to allow
    ],
  },
};
