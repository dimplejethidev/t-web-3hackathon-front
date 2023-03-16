import { useState } from "react";
import { MainContainer } from "@/src/components/elements/MainContainer";
import { MainLoading } from "@/src/components/layouts/Main/MainLoading";
import { CommunityProfile, CommunityThumbnail } from "@/src/features/community";
import { Passport } from "@/src/features/passport";
import { QuestList } from "@/src/features/quest";
import { useCommunityValue } from "@/src/hooks/useCommunity";
import { usePassportController } from "@/src/hooks/usePassport";
import { usePrizeSelectorCommunityId } from "@/src/hooks/usePrize";
import { usePrizeDetailController } from "@/src/hooks/usePrizeDetail";
import Custom404 from "@/src/pages/404";
import { isInitCommunityState } from "@/src/stores/isInitCommunityState";
import { isInitPrizeState } from "@/src/stores/isInitPrizeState";
import { isInitQuestState } from "@/src/stores/isInitQuestState";
import { BaseProps } from "@/src/types/BaseProps";
import { layoutEffectOfSSR } from "@/src/util/layoutEffectOfSSR";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

export type MainCommunityPageProps = {
  communityId: string;
} & BaseProps;

/**
 * Main: コミュニティページ
 * @layout
 * @author keit
 * @param communityId コミュニティID
 */
export const MainCommunityPage = ({ communityId }: MainCommunityPageProps) => {
  const community = useCommunityValue(communityId);
  const prizeList = usePrizeSelectorCommunityId(communityId);

  const isInitCommunity = useRecoilValue(isInitCommunityState);
  const isInitPrize = useRecoilValue(isInitPrizeState);
  const isInitQuest = useRecoilValue(isInitQuestState);

  const [isInitPassport, setIsInitPassport] = useState(false);
  const [isInitPrizeDetail, setIsInitPrizeDetail] = useState(false);

  const prizeDetailController = usePrizeDetailController();
  const passportController = usePassportController();

  const useLayoutEffectOfSSR = layoutEffectOfSSR();

  const initPassport = async () => {
    if (!isInitCommunity) return;
    if (community === undefined) {
      setIsInitPassport((prevState) => true);
      return;
    }
    try {
      await passportController.init(community.id, community.passport);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.log(e);
    }
    setIsInitPassport((prevState) => true);
  };

  const initPrizeDetail = async () => {
    if (!isInitCommunity || !isInitPrize) return;
    if (community === undefined) {
      setIsInitPrizeDetail((prevState) => true);
      return;
    }
    try {
      await prizeDetailController.fetch(prizeList);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.log(e);
    }
    setIsInitPrizeDetail((prevState) => true);
  };

  useLayoutEffectOfSSR(() => {
    try {
      initPassport();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.log(e);
    }
  }, [isInitCommunity]);

  useLayoutEffectOfSSR(() => {
    try {
      initPrizeDetail();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.log(e);
    }
  }, [isInitCommunity, isInitPrize]);

  if (!isInitPassport || !isInitPrizeDetail || !isInitQuest)
    return <MainLoading />;
  if (community === undefined) return <Custom404 />;
  return (
    <MainContainer className={clsx("flex", "flex-col", "items-center")}>
      <CommunityThumbnail communityId={community.id} />
      <CommunityProfile communityId={community.id} />
      <div
        className={clsx("my-4", "flex", "flex-col", "items-center", "w-[90%]")}
      >
        <Passport
          className={clsx("px-4", "mt-4", "mb-12")}
          communityId={community.id}
        />
        <QuestList communityId={community.id} />
      </div>
    </MainContainer>
  );
};
