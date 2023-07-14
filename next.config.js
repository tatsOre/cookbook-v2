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
    }
}
