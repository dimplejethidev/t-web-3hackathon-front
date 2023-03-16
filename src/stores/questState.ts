import { QuestModel } from "@/src/models/QuestModel";
import { CommunityId } from "@/src/types/CommunityId";
import { QuestId } from "@/src/types/QuestId";
import { atom, selectorFamily } from "recoil";

export type QuestState = Map<QuestId, QuestModel>;

export const questState = atom<QuestState>({
  key: "questState",
  default: new Map(),
});

export const questSelectorCommunityId = selectorFamily<
  QuestModel[],
  CommunityId | undefined
>({
  key: "questSelectorCommunityId",
  get:
    (communityId) =>
    ({ get }) => {
      const questMap = get(questState);
      if (communityId === undefined) return Array.from(questMap.values());
      const keys = questMap.keys();
      const questList: QuestModel[] = [];
      for (const key of keys) {
        const quest = questMap.get(key);
        if (quest!.communityId !== communityId) continue;
        questList.push(quest!);
      }
      return questList;
    },
});
