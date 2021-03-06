import { ApolloClient, InMemoryCache } from "@apollo/client";

function createIsomorphLink() {
  const uri = "http://graph.bakemono.club/";
  const { HttpLink } = require("@apollo/client/link/http");
  return new HttpLink({
    uri,
    credentials: "same-origin",
  });
}

export function apollo() {
  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });

  return client;
}
