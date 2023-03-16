import Head from "next/head";
import { Main, ViewType } from "@/src/components/layouts/Main";
import { MainCube } from "@/src/components/layouts/Main/MainCube";

/**
 * CUBE
 * @layout
 * @author keit
 */
export default function Cube() {
  return (
    <>
      <Head>
        <meta
          property="og:url"
          content="https://fanbase-front.vercel.app/mybase/cube"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="MYBASE" />
        <meta property="og:description" content="MYBASE画面です。" />
      </Head>
      <Main viewType={ViewType.full}>
        <MainCube />
      </Main>
    </>
  );
}
