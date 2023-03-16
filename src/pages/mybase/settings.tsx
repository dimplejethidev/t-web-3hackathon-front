import Head from "next/head";
import { Header } from "@/src/components/layouts/Header";
import { Main } from "@/src/components/layouts/Main";
import { MainSettings } from "@/src/components/layouts/Main/MainSettings";
import { Sidebar } from "@/src/components/layouts/Sidebar";
import { Drawer } from "@/src/features/drawer";
import Div100vh from "react-div-100vh";

/**
 * 設定画面
 * @layout
 * @author keit
 */
export default function Settings() {
  return (
    <>
      <Head>
        <meta
          property="og:url"
          content="https://fanbase-front.vercel.app/mybase/settings"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="MYBASE" />
        <meta property="og:description" content="MYBASE画面です。" />
      </Head>
      <Drawer />
      <Div100vh>
        <Header />
        <Main>
          <Sidebar />
          <MainSettings />
        </Main>
      </Div100vh>
    </>
  );
}
