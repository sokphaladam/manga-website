import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-slideshow-image/dist/styles.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { apollo } from "../src/lib/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apollo()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
