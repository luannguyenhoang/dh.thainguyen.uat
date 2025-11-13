import { ApolloClient, DocumentNode, HttpLink, from } from "@apollo/client";
import { InMemoryCache } from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";

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
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first"
    }
  }
});

export const fetchDataPage = async (query: DocumentNode, dataKey: string) => {
  try {
    const response = await client.query({
      query,
      fetchPolicy: "cache-first"
    });

    if (!response?.data) {
      throw new Error(
        `GraphQL query failed with status: ${response?.networkStatus}`
      );
    }

    return response?.data?.pageBy?.[dataKey] || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return null;
  }
};
