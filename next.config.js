/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'wos.58cdn.com.cn',
            }
        ]
    }
}

module.exports = nextConfig
