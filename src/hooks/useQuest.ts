import { QuestContract } from "@/src/features/quest/types/QuestContract";
import { QuestModel } from "@/src/models/QuestModel";
import {
  QuestState,
  questSelectorCommunityId,
  questState,
} from "@/src/stores/questState";
import { CommunityId } from "@/src/types/CommunityId";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface QuestController {
  init: () => Promise<void>;
}

export const useQuestValue = (): QuestState => {
  return useRecoilValue(questState);
};

export const useQuestController = (): QuestController => {
  const setQuest = useSetRecoilState(questState);

  /**
   * クエスト一覧を初期化
   */
  const init = async (): Promise<void> => {
    const res = await axios.post("/api/fetch/quest");
    if (res.status !== 200) throw new Error(res.data.message);
    const questList = res.data.questList as QuestContract[];
    const newState: QuestState = new Map();
    for (let i = 0; i < questList.length; i++) {
      newState.set(
        i.toString(),
        QuestModel.fromData(i.toString(), questList[i]),
      );
    }
    setQuest((prevState) => {
      return newState;
    });
  };

  const questController: QuestController = { init };
  return questController;
};

export const useQuestState = (): [QuestState, QuestController] => [
  useQuestValue(),
  useQuestController(),
];

export const useQuestListValue = (): QuestModel[] =>
  Array.from(useQuestValue().values());

export const useQuestSelectorCommunityId = (
  communityId?: CommunityId,
): QuestModel[] => {
  return useRecoilValue(questSelectorCommunityId(communityId));
};
