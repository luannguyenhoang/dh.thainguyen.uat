import { getClient } from "@/lib/ApolloClient";
import { TMenus, menus } from "@/router";
import type { MetadataRoute } from "next";
import { GET_SITEMAP } from "./api/GraphQl/posts";

const API_URL = process.env.NEXT_PUBLIC_DOMAIN || "https://dhthainguyen.edu.vn";

const getAllPaths = (menus: TMenus): MetadataRoute.Sitemap => {
  const paths: MetadataRoute.Sitemap = [];

  const collectPaths = (menuList: TMenus) => {
    for (const menu of menuList) {
      if (menu.path && menu.path !== "#") {
        paths.push({ url: `${API_URL}${menu.path}` });
      }

      if ("childs" in menu && Array.isArray(menu.childs)) {
        collectPaths(menu.childs as TMenus);
      }
    }
  };

  collectPaths(menus);
  return paths;
};

async function getPostPaths(): Promise<MetadataRoute.Sitemap> {
  try {
    const allPosts: { slug: string }[] = [];
    let hasNextPage = true;
    let after: string | null = null;
    let requestCount = 0;
    const maxRequests = 10;

    while (hasNextPage && requestCount < maxRequests) {
      const { data }: { data: any } = await getClient().query({
        query: GET_SITEMAP,
        variables: {
          first: 100,
          after: after
        },
        fetchPolicy: "cache-first"
      });

      const posts = data?.posts?.nodes;
      const pageInfo: any = data?.posts?.pageInfo;

      if (posts && Array.isArray(posts)) {
        allPosts.push(...posts);
      }

      hasNextPage = pageInfo?.hasNextPage || false;
      after = pageInfo?.endCursor || null;
    }

    return allPosts.map((post: { slug: string }) => ({
      url: `${API_URL}/${post.slug}`
    }));
  } catch (error) {
    console.error("Failed to fetch posts for sitemap", error);
    return [];
  }
}
export const revalidate = 60;
// Sitemap chính
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = getAllPaths(menus);
  const postPaths = await getPostPaths();
  return [...staticPaths, ...postPaths];
}
