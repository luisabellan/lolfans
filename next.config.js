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
   // Allow API requests from all domains
  //  source: '/api/:path*',
  /*  headers: [
     {
       key: 'Access-Control-Allow-Origin',
       value: '*',
     },
     {
       key: 'Access-Control-Allow-Methods',
       value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
     },
     {
       key: 'Access-Control-Allow-Headers',
       value:
         'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
     },
   ], */
});
