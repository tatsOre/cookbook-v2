/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  // set to false for dnd 
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },
  // Maybe NextJS wasn't the best idea for this project(?).
  // Following config helps with Cloudinary and 
  // https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
}
