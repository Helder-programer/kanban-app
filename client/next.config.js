/** @type {import('next').NextConfig} */
const nextConfig = {
    //   reactStrictMode: true,
    images: {
        domains: ['github.com']
    },
    compiler: {
        styledComponents: true
    },
    env: {
        API_URL: 'http://localhost:8000'
    }
}

module.exports = nextConfig
