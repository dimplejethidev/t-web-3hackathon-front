import { atom } from "recoil";

export const isInitCommunityState = atom<boolean>({
  key: "isInitCommunityState",
  default: false,
});
