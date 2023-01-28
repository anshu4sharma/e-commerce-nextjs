import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Toaster />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
