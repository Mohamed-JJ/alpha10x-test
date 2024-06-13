/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_KEY: process.env.API_KEY,
	  },
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		domains: ['media2.giphy.com', "media1.giphy.com"],
	},
};

export default nextConfig;
