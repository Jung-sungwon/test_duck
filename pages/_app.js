import "@/styles/globals.css";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname === "/landing") {
    return <Component {...pageProps} />;
  } else {
    return (
      <Layout>
        <Header />
        <SideNav />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    );
  }
}
