import { atom } from "recoil";

export const loadingPassportState = atom<boolean>({
  key: "loadingPassportState",
  default: false,
});
