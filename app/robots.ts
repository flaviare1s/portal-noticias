import type { MetadataRoute } from "next";

const BASE_URL = "https://portal-noticias-i6g7.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/profile"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
