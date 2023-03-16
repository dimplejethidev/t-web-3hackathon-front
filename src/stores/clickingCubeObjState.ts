import { PrizeId } from "@/src/types/PrizeId";
import { atom } from "recoil";

export const clickingCubeObjState = atom<PrizeId>({
  key: "clickingCubeObjState",
  default: "",
});
