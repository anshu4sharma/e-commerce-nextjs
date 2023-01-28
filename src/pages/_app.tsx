import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Navbar /> <Component {...pageProps} />{" "}
    </Container>
  );
}
