import { QuestModal } from "@/src/features/quest/components/QuestModal";
import { useCommunityStateValue } from "@/src/hooks/useCommunity";
import { usePrizeSelectorCommunityId } from "@/src/hooks/usePrize";
import { useQuestSelectorCommunityId } from "@/src/hooks/useQuest";
import { useQuestUserValue } from "@/src/hooks/useQuestUser";
import { BaseProps } from "@/src/types/BaseProps";
import { CommunityId } from "@/src/types/CommunityId";
import clsx from "clsx";
import uuid from "react-uuid";

export type QuestListProps = {
  communityId?: CommunityId;
} & BaseProps;

/**
 * クエスト一覧
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param questList クエスト配列
 * @param prizeList プライズ配列
 */
export const QuestList = ({ className, communityId }: QuestListProps) => {
  const questList = useQuestSelectorCommunityId(communityId);
  const prizeList = usePrizeSelectorCommunityId(communityId);
  const communityState = useCommunityStateValue();
  const questUserState = useQuestUserValue();

  return (
    <div className={clsx("w-[100%]", className)}>
      <div className={clsx("flex", "justify-start", "flex-wrap")}>
        {questList.map((quest) => {
          const community = communityState.get(quest.communityId)!;
          const questUser = questUserState.get(quest.id)!;
          return (
            <QuestModal
              key={uuid()}
              className={clsx("m-4", "w-[100%]", "lg:w-[45%]", "xl:w-[29%]")}
              quest={quest}
              questUser={questUser}
              community={community}
              prizeList={prizeList}
            />
          );
        })}
      </div>
    </div>
  );
};
