/**
 * Next.js configuration — static export for GitHub Pages.
 *
 * This is a user site (samrat-sharma.github.io) served from the domain root,
 * so no basePath/assetPrefix is required. `output: 'export'` produces a fully
 * static `out/` directory that the GitHub Actions workflow deploys to Pages.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // The export target has no image optimization server.
  images: { unoptimized: true },
  // Emit /path/index.html so deep links resolve on static hosting.
  trailingSlash: true,
  // GLSL shaders are imported as raw strings.
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
