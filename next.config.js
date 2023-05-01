const withTwin = require("./withTwin.js");

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
  reactStrictMode: true,
  images: {
    domains: ['qqmvurcxlebysoqbdyeb.supabase.co', 'lh3.googleusercontent.com', 'ddragon.leagueoflegends.com'],
  },
  /** We run eslint as a separate task in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  /* experimental: {
    appDir: true,
  }, */
});
