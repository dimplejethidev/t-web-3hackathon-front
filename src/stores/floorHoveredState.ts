import { CubePosition } from "@/src/util/threeUtil";
import { atom } from "recoil";

export const floorHoveredState = atom<CubePosition[]>({
  key: "floorHoveredState",
  default: [],
});
