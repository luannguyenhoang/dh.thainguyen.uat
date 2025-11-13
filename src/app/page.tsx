export const revalidate = 5;

import { getSeoData } from "@/ultil/getSeoData";
import { generateMetadataFromFullHead } from "@/ultil/seoUtils";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { GET_PAGE_HOME } from "./api/GraphQl/home";
import { GET_TIME_LINE } from "./api/GraphQl/lichKhaiGiang";
import { GET_POSTS_BY_CATEGORY } from "./api/GraphQl/posts";

const Home = dynamic(() => import("@/features/home").then((mod) => mod.Home));

const getHomeData = async () => {
  const API_GRAPHQL =
    process.env.NEXT_PUBLIC_API_GRAPHQL ||
    "https://dhthainguyen.aum.edu.vn/graphql";
  const API_TOKEN = process.env.TOKEN || "";

  const httpLink = new HttpLink({
    uri: API_GRAPHQL,
    fetchOptions: {
      keepalive: true
    }
  });

  const authLink = setContext((_, context) => {
    const headers = context.headers ?? {};
    return {
      headers: {
        ...headers,
        authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : ""
      }
    };
  });

  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: from([authLink, httpLink])
  });

  try {
    const newsCategorySlug = "tin-tuc";
    const notifiCategorySlug = "thong-bao";

    // Thêm timeout để fail fast nếu server response chậm
    const [homeResponse, timelineResponse, newsResponse, notifiResponse] =
      await Promise.all([
        client.query({
          query: GET_PAGE_HOME,
          fetchPolicy: "network-only",
          context: {
            fetchOptions: {
              timeout: 2000
            }
          }
        }),
        client.query({
          query: GET_TIME_LINE,
          fetchPolicy: "network-only",
          context: {
            fetchOptions: {
              timeout: 2000
            }
          }
        }),
        client.query({
          query: GET_POSTS_BY_CATEGORY,
          variables: {
            slug: newsCategorySlug,
            size: 4,
            offset: 0
          },
          fetchPolicy: "network-only",
          context: {
            fetchOptions: {
              timeout: 2000
            }
          }
        }),
        client.query({
          query: GET_POSTS_BY_CATEGORY,
          variables: {
            slug: notifiCategorySlug,
            size: 4,
            offset: 0
          },
          fetchPolicy: "network-only",
          context: {
            fetchOptions: {
              timeout: 2000
            }
          }
        })
      ]);

    let timelineData = [];
    const labelText =
      timelineResponse?.data?.pageBy?.lichKhaiGiang?.section1?.label;
    if (labelText) {
      timelineData = labelText
        .split(/\r?\n/)
        .filter((line: string) => line.trim() !== "");
    }

    const news = newsResponse?.data?.posts?.nodes || [];

    const notifis = notifiResponse?.data?.posts?.nodes || [];

    return {
      homeData: homeResponse?.data?.pageBy?.trangChu || {},

      timelineData,
      news,
      notifis
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {
      homeData: {},
      timelineData: [],
      news: [],
      notifis: []
    };
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_PAGE_HOME, "pageBy");

  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow"
  };
}
const HomePage = async () => {
  const { homeData, timelineData, news, notifis } = await getHomeData();

  return (
    <main>
      <Home
        homeData={homeData}
        timelineData={timelineData}
        news={news}
        notifis={notifis}
      />
    </main>
  );
};

export default HomePage;
