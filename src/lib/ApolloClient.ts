import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
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
  cache: new InMemoryCache(),
  link: from([authLink, httpLink])
});

export const getClient = () => client;
export { client };
