/* eslint-disable import/order */
import type { AppProps } from "next/app";
import Head from "next/head";
import { AutoLogin } from "@/src/features/auth";
import { CommunityStateFetcher } from "@/src/features/community/components/CommunityStateFetcher";
import { CubeStateFetcher } from "@/src/features/cube";
import { PrizeStateFetcher } from "@/src/features/prize";
import { QuestStateFetcher } from "@/src/features/quest";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>FANBASE</title>
        <meta
          name="description"
          content="コミュニティの維持・管理に課題を持っているコミュニティオーナー向けの、WEB3ファンクラブサービス「FANBASE」です。 このサービスには1.活動履歴のSBT保存 2.貢献度の可視化 3.wallet addressベースでのユーザー管理 4.報酬付与機能 5.オンチェーンチャット機能があり、ファンコミュニティの形成と、簡単なユーザー管理を実現します。 ユーザーは、活動履歴をSBTに保存することができ、活動すると経験値を獲得し、貢献レベルを上げることが出来ます。 SBTへの一括情報書き込みが可能なため、低ガス代で外部サービスとの情報連携が可能です。 コミュニティオーナーはアドレスベースでユーザー管理が可能で、貢献度に応じた報酬付与が可能です。 ユーザーはチャットをオンチェーンに刻み、将来的に発言履歴による信用の可視化、Data to Earnに活用できます。 今回は全体ウォレットからガス代を支払うが、ユーザーが一定額デポジットし、ガス代を消費していくチャージ式にし、ガス代の一部をコミュニティに還元する予定です。 このサービスはNFTPJ、BCGだけでなく、将来的にWEB2エンタメ業界に展開予定です。"
        />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:site_name" content="FANBASE" />
        <meta
          property="og:image"
          content="https://fanbase-front.vercel.app/thumbnail.png"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="コミュニティの維持・管理に課題を持っているコミュニティオーナー向けの、WEB3ファンクラブサービス「FANBASE」です。 このサービスには1.活動履歴のSBT保存 2.貢献度の可視化 3.wallet addressベースでのユーザー管理 4.報酬付与機能 5.オンチェーンチャット機能があり、ファンコミュニティの形成と、簡単なユーザー管理を実現します。 ユーザーは、活動履歴をSBTに保存することができ、活動すると経験値を獲得し、貢献レベルを上げることが出来ます。 SBTへの一括情報書き込みが可能なため、低ガス代で外部サービスとの情報連携が可能です。 コミュニティオーナーはアドレスベースでユーザー管理が可能で、貢献度に応じた報酬付与が可能です。 ユーザーはチャットをオンチェーンに刻み、将来的に発言履歴による信用の可視化、Data to Earnに活用できます。 今回は全体ウォレットからガス代を支払うが、ユーザーが一定額デポジットし、ガス代を消費していくチャージ式にし、ガス代の一部をコミュニティに還元する予定です。 このサービスはNFTPJ、BCGだけでなく、将来的にWEB2エンタメ業界に展開予定です。"
        />
        <meta
          name="twitter:image:src"
          content="https://fanbase-front.vercel.app/thumbnail.png"
        />
      </Head>
      <RecoilRoot>
        <AutoLogin>
          <CommunityStateFetcher>
            <QuestStateFetcher>
              <PrizeStateFetcher>
                <CubeStateFetcher>
                  <Component {...pageProps} />
                </CubeStateFetcher>
              </PrizeStateFetcher>
            </QuestStateFetcher>
          </CommunityStateFetcher>
        </AutoLogin>
      </RecoilRoot>
    </>
  );
}
