import { atom } from "recoil";

export const isInitQuestState = atom<boolean>({
  key: "isInitQuestState",
  default: false,
});
