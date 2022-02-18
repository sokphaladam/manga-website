import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-slideshow-image/dist/styles.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { apollo } from "../src/lib/apollo";
import { Topbar } from "../src/components/Topbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apollo()}>
      <Topbar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
