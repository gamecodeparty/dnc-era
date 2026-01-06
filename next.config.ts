import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    // Cache de imagens - CacheFirst (30 dias)
    {
      urlPattern: /^https?.*\.(png|jpg|jpeg|webp|svg|gif|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
        },
      },
    },
    // Cache de fontes Google - CacheFirst (1 ano)
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 ano
        },
      },
    },
    // Cache de assets estáticos - CacheFirst
    {
      urlPattern: /^https?.*\.(css|js|woff|woff2|ttf|eot)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
        },
      },
    },
    // Cache de API - NetworkFirst com timeout
    {
      urlPattern: /^https?.*\/api\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutos
        },
      },
    },
    // Cache de páginas - NetworkFirst
    {
      urlPattern: /^https?.*$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 24 * 60 * 60, // 1 dia
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,
};

export default withPWA(nextConfig);
