import { atom } from "recoil";

export const isInitPrizeState = atom<boolean>({
  key: "isInitPrizeState",
  default: false,
});
