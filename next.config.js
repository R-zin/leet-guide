/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: process.env.PAGES_BASE_PATH || (isGithubActions ? '/leet-guide' : ''),
};

module.exports = nextConfig;
