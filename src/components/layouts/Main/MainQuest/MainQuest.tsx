import { MainContainer } from "@/src/components/elements/MainContainer";
import { MainLoading } from "@/src/components/layouts/Main/MainLoading";
import { QuestList } from "@/src/features/quest";
import { isInitCommunityState } from "@/src/stores/isInitCommunityState";
import { isInitQuestState } from "@/src/stores/isInitQuestState";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

/**
 * Main: クエスト一覧画面
 * @layout
 * @author keit
 */
export const MainQuest = () => {
  const isInitCommunity = useRecoilValue(isInitCommunityState);
  const isInitQuest = useRecoilValue(isInitQuestState);

  if (!isInitCommunity || !isInitQuest) return <MainLoading />;
  return (
    <MainContainer className={clsx("flex", "flex-col", "items-center", "p-4")}>
      <div className={clsx("flex", "justify-start", "flex-wrap", "w-[100%]")}>
        <QuestList />
      </div>
    </MainContainer>
  );
};
