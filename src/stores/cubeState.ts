import { CubeModel } from "@/src/models/CubeModel";
import { UserId } from "@/src/types/UserId";
import { atom, selectorFamily } from "recoil";

export type CubeState = Map<UserId, CubeModel[]>;

export const cubeState = atom<CubeState>({
  key: "cubeState",
  default: new Map(),
});

export const cubeSelectorUserId = selectorFamily<
  CubeModel[] | undefined,
  UserId
>({
  key: "cubeSelectorUserId",
  get:
    (userId) =>
    ({ get }) => {
      const cubeMap = get(cubeState);
      return cubeMap.get(userId);
    },
});
