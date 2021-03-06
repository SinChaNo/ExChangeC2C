// const withTM = require('next-transpile-modules')([
//   "@fullcalendar",
//   "common"
// ])

// /** @type {import('next').NextConfig} */
// module.exports = withTM({
//   reactStrictMode: true,
//   // 외부도멩인 이미지에 next/image를 사용하려면
//   // 이미지 도메인을 등록해주어야함
//   images: { domains: ["d3o6g8deu522v9.cloudfront.net"] },
// });

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/react",
  "@fullcalendar/core",
  "@fullcalendar/daygrid",
  "@fullcalendar/timegrid",
  "@fullcalendar/interaction"]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  // 외부도멩인 이미지에 next/image를 사용하려면
  // 이미지 도메인을 등록해주어야함
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: { domains: ["d3o6g8deu522v9.cloudfront.net"] },
});

