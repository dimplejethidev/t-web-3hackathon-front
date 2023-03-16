import { QuestUserModel } from "@/src/models/QuestUserModel";
import { QuestId } from "@/src/types/QuestId";
import { atom } from "recoil";

export type QuestUserState = Map<QuestId, QuestUserModel>;

export const questUserState = atom<QuestUserState>({
  key: "questUserState",
  default: new Map(),
});

// export const questUserSelector = selectorFamily<QuestUserModel, QuestId>({
//   key: "questUserSelector",
//   get:
//     (questId) =>
//     ({ get }) => {
//       const questUserList = get(questUserState);
//       return questUserList[Number(questId)];
//     },
// });
