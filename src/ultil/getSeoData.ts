import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  HttpLink,
  from
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

interface SeoData {
  seo: {
    fullHead?: string;
    focusKeywords?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * @param query
 * @param nodeKey
 * @param extraData
 * @returns
 */
export async function getSeoData(
  query: DocumentNode,
  nodeKey: string,
  extraData: string[] = []
): Promise<SeoData> {
  const API_GRAPHQL =
    process.env.NEXT_PUBLIC_API_GRAPHQL ||
    "https://dhthainguyen.aum.edu.vn/graphql";
  const API_TOKEN = process.env.TOKEN || "";

  const httpLink = new HttpLink({
    uri: API_GRAPHQL
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
    const response = await client.query({
      query,
      fetchPolicy: "network-only"
    });

    // Handle data based on the response structure
    const nodeData: Record<string, any> = response?.data?.[nodeKey] || {};

    const result: SeoData = {
      seo: nodeData?.seo || {}
    };

    if (extraData.length > 0) {
      extraData.forEach((key) => {
        if (nodeData[key]) {
          result[key] = nodeData[key];
        }
      });
    }

    return result;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {
      seo: {}
    };
  }
}
