/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  ...(process.env.VERCEL ? {} : { output: 'standalone' }),
};

export default nextConfig;
