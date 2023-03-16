import { CubeModel } from "@/src/models/CubeModel";
import { atom } from "recoil";

export type CubeTmpState = CubeModel[];

export const cubeTmpState = atom<CubeTmpState>({
  key: "cubeTmpState",
  default: [],
});
