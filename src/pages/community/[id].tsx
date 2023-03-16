import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { Header } from "@/src/components/layouts/Header";
import { Main } from "@/src/components/layouts/Main";
import { MainCommunityPage } from "@/src/components/layouts/Main/MainCommunityPage";
import { Sidebar } from "@/src/components/layouts/Sidebar";
import { Drawer } from "@/src/features/drawer";
import Custom404 from "@/src/pages/404";
import Div100vh from "react-div-100vh";

export type CommunityPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

/**
 * コミュニティページ
 * @layout
 * @author keit
 * @param id コミュニティID
 */
const CommunityPage = ({ id }: CommunityPageProps) => {
  if (isNaN(Number(id))) return <Custom404 />;
  return (
    <>
      <Head>
        <meta
          property="og:url"
          content={`https://fanbase-front.vercel.app/community/${id}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="PROJECT" />
        <meta property="og:description" content="PROJECTページです。" />
      </Head>
      <Drawer />
      <Div100vh>
        <Header />
        <Main>
          <Sidebar />
          <MainCommunityPage communityId={id} />
        </Main>
      </Div100vh>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  id: string;
}> = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;
  if (typeof id !== "string") {
    return { notFound: true };
  }
  return { props: { id } };
};

export default CommunityPage;
