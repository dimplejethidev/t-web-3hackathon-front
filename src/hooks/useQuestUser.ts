import { ClientQuestBoard } from "@/src/features/quest/api";
import { QuestModel } from "@/src/models/QuestModel";
import { QuestUserModel } from "@/src/models/QuestUserModel";
import { questUserState } from "@/src/stores/questUserState";
import { QuestUserState } from "@/src/stores/questUserState";
import { QuestId } from "@/src/types/QuestId";
import { deepCpyMap } from "@/src/util/deepCpy";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface QuestUserController {
  init: (userId: string) => Promise<void>;
  updateClaimState: (userId: string, questList: QuestModel[]) => Promise<void>;
  claim: (questId: QuestId) => Promise<void>;
}

export const useQuestUserValue = (): QuestUserState => {
  return useRecoilValue(questUserState);
};

export const useQuestUserController = (): QuestUserController => {
  const setQuestList = useSetRecoilState(questUserState);

  /**
   * 初期化
   */
  const init = async (userId: string): Promise<void> => {
    const results = await Promise.all([
      axios.post("/api/fetch/quest-claimable", {
        userId,
      }),
      axios.post("/api/fetch/quest-claimed", {
        userId,
      }),
    ]);
    const resClaimable = results[0];
    if (resClaimable.status !== 200) throw new Error(resClaimable.data.message);
    const resClaimed = results[1];
    if (resClaimed.status !== 200) throw new Error(resClaimed.data.message);
    const questClaimable = resClaimable.data.questClaimable as boolean[];
    const questClaimed = resClaimed.data.questClaimed as boolean[];
    const newState: QuestUserState = new Map();
    for (let i = 0; i < questClaimable.length; i++) {
      newState.set(
        i.toString(),
        QuestUserModel.fromData(
          i.toString(),
          questClaimable[i],
          questClaimed[i],
        ),
      );
    }
    setQuestList((prevState) => {
      return newState;
    });
  };

  /**
   * クエスト報酬を受け取れるか、受け取ったかの状態を更新
   * @param userId ユーザーID
   * @param questListLength クエストリスト長さ
   */
  const updateClaimState = async (
    userId: string,
    questList: QuestModel[],
  ): Promise<void> => {
    const questIds = QuestModel.toIds(questList);
    const results = await Promise.all([
      axios.post("/api/fetch/quest-claimable", {
        userId,
        questIds,
      }),
      axios.post("/api/fetch/quest-claimed", {
        userId,
        questIds,
      }),
    ]);
    const resClaimable = results[0];
    if (resClaimable.status !== 200) throw new Error(resClaimable.data.message);
    const resClaimed = results[1];
    if (resClaimed.status !== 200) throw new Error(resClaimed.data.message);
    const questClaimable = resClaimable.data.questClaimable as boolean[];
    const questClaimed = resClaimed.data.questClaimed as boolean[];
    setQuestList((prevState) => {
      const newState = deepCpyMap(prevState);
      for (let i = 0; i < questIds.length; i++) {
        newState.set(
          questIds[i],
          QuestUserModel.fromData(
            questIds[i],
            questClaimable[i],
            questClaimed[i],
          ),
        );
      }
      return newState;
    });
  };

  /**
   * クエストをclaim
   * @param questId クエストID
   */
  const claim = async (questId: QuestId): Promise<void> => {
    const questBoard = await ClientQuestBoard.instance();
    await questBoard.claim(Number(questId));
    setQuestList((prevState) => {
      const newState = deepCpyMap(prevState);
      const quest = newState.get(questId)!;
      newState.set(questId, quest.copyWith({ claimed: true }));
      return newState;
    });
  };

  const questUserController: QuestUserController = {
    init,
    updateClaimState,
    claim,
  };
  return questUserController;
};

export const useQuestUserState = (): [QuestUserState, QuestUserController] => [
  useQuestUserValue(),
  useQuestUserController(),
];
