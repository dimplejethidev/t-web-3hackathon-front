import { QuestDetailModel } from "@/src/models/QuestDetailModel";
import { QuestId } from "@/src/types/QuestId";
import { atom } from "recoil";

export type QuestDetailState = Map<QuestId, QuestDetailModel>;

export const questDetailState = atom<QuestDetailState>({
  key: "questDetailState",
  default: new Map(),
});
