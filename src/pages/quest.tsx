import Head from "next/head";
import { Header } from "@/src/components/layouts/Header";
import { Main } from "@/src/components/layouts/Main";
import { MainQuest } from "@/src/components/layouts/Main/MainQuest";
import { Sidebar } from "@/src/components/layouts/Sidebar";
import { Drawer } from "@/src/features/drawer";
import Div100vh from "react-div-100vh";

/**
 * QUEST画面
 * @layout
 * @author keit
 */
export default function QuestPage() {
  return (
    <>
      <Head>
        <meta
          property="og:url"
          content="https://fanbase-front.vercel.app/quest"
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
          <MainQuest />
        </Main>
      </Div100vh>
    </>
  );
}
