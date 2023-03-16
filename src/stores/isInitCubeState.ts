import { atom } from "recoil";

export const isInitCubeState = atom<boolean>({
  key: "isInitCubeState",
  default: false,
});
