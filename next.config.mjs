/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		domains: ['media2.giphy.com', "media1.giphy.com"],
	},
};

export default nextConfig;
