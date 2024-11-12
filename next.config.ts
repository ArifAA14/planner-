import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  // hack to fix vercel deployments failure.
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt'];
    return config;
  },

};

export default withNextIntl(nextConfig);

