/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
    // reactStrictMode: true, -- removed because of the "bug" in react-beautiful-dnd
    // but added React.StrictMode inside the DragDropContext
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
