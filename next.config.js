/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dhthainguyen.aum.edu.vn",
        pathname: "/wp-content/uploads/**"
      },
      {
        protocol: "https",
        hostname: "noidung.dhcongdoan.vn",
        pathname: "/**"
      }
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  output: "standalone",
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value:
              '<https://dhthainguyen.aum.edu.vn>; rel="preconnect", <https://dhthainguyen.aum.edu.vn>; rel="dns-prefetch", <https://fonts.googleapis.com>; rel="preconnect", <https://fonts.gstatic.com>; rel="preconnect"; crossorigin'
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Accept-Encoding",
            value: "gzip, deflate, br"
          }
        ]
      },
      {
        source: "/:path*\\.(js|css|woff|woff2|ttf|otf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|gif|webp|avif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        runtimeChunk: "single",
        minimize: !dev,
        minimizer: [...(config.optimization.minimizer || [])],
        splitChunks: {
          chunks: "all",
          maxInitialRequests: 50,
          minSize: 3000,
          maxSize: 50000,
          enforceSizeThreshold: 25000,
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              name: "vendor",
              chunks: "async",
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
              enforce: true,
              minChunks: 1
            },
            react: {
              name: "react",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
              enforce: true
            },
            apollo: {
              name: "apollo",
              chunks: "async",
              test: /[\\/]node_modules[\\/]@apollo[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true
            },
            nextjs: {
              name: "nextjs",
              chunks: "async",
              test: /[\\/]node_modules[\\/]next[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
              enforce: true
            },
            framerMotion: {
              name: "framer-motion",
              chunks: "async",
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true
            },
            swiper: {
              name: "swiper",
              chunks: "async",
              test: /[\\/]node_modules[\\/]swiper[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true
            },
            emotion: {
              name: "emotion",
              chunks: "async",
              test: /[\\/]node_modules[\\/]@emotion[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true
            },
            chakra: {
              name: "chakra",
              chunks: "async",
              test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true,
              maxSize: 50000
            },
            icons: {
              name: "icons",
              chunks: "async",
              test: /[\\/]node_modules[\\/](react-icons|lucide-react|@heroicons)[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true,
              maxSize: 20000,
              minSize: 3000
            },
            reactIconsBi: {
              name: "icons-bi",
              chunks: "async",
              test: /[\\/]node_modules[\\/]react-icons[\\/]bi[\\/]/,
              priority: 24,
              reuseExistingChunk: true,
              enforce: true,
              maxSize: 15000
            },
            reactIconsBs: {
              name: "icons-bs",
              chunks: "async",
              test: /[\\/]node_modules[\\/]react-icons[\\/]bs[\\/]/,
              priority: 24,
              reuseExistingChunk: true,
              enforce: true,
              maxSize: 15000
            },
            reactIconsMd: {
              name: "icons-md",
              chunks: "async",
              test: /[\\/]node_modules[\\/]react-icons[\\/]md[\\/]/,
              priority: 24,
              reuseExistingChunk: true,
              enforce: true,
              maxSize: 15000
            },
            reactIconsSi: {
              name: "icons-si",
              chunks: "async",
              test: /[\\/]node_modules[\\/]react-icons[\\/]si[\\/]/,
              priority: 24,
              reuseExistingChunk: true,
              enforce: true,
              maxSize: 15000
            },
            apolloClient: {
              name: "apollo-client",
              chunks: "async",
              test: /[\\/]node_modules[\\/]@apollo[\\/]client[\\/]/,
              priority: 24,
              reuseExistingChunk: true,
              enforce: true,
              maxSize: 60000
            },
            common: {
              name: "common",
              minChunks: 2,
              chunks: "async",
              priority: 10,
              reuseExistingChunk: true
            }
          }
        }
      };
    }

    // Tree shaking optimization
    config.resolve.alias = {
      ...config.resolve.alias
    };

    // Optimize module resolution
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
      ".jsx": [".jsx", ".tsx"]
    };

    return config;
  },
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "@apollo/client",
      "framer-motion",
      "swiper",
      "lucide-react",
      "@heroicons/react",
      "@chakra-ui/react"
    ],
    serverActions: {
      bodySizeLimit: "2mb"
    },
    optimizeServerReact: true
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"]
          }
        : false
  }
};

module.exports = nextConfig;
