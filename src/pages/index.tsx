import Head from "next/head";
import { Header } from "@/src/components/layouts/Header";
import { Main } from "@/src/components/layouts/Main";
import { MainCommunity } from "@/src/components/layouts/Main/MainCommunity";
import { Sidebar } from "@/src/components/layouts/Sidebar";
import { Drawer } from "@/src/features/drawer";
import Div100vh from "react-div-100vh";

/**
 * トップ画面
 * @layout
 * @author keit
 */
export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:url" content="https://fanbase-front.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="COMMUNITY" />
        <meta property="og:description" content="COMMUNITY Page" />
      </Head>
      <Drawer />
      <Div100vh>
        <Header />
        <Main>
          <Sidebar />
          <MainCommunity />
        </Main>
      </Div100vh>
    </>
  );
}
