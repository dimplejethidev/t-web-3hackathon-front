import { PrizeModel } from "@/src/models/PrizeModel";
import { CommunityId } from "@/src/types/CommunityId";
import { PrizeId } from "@/src/types/PrizeId";
import { atom, selectorFamily } from "recoil";

export type PrizeState = Map<PrizeId, PrizeModel>;

export const prizeState = atom<PrizeState>({
  key: "prizeState",
  default: new Map(),
});

export const prizeSelectorCommunityId = selectorFamily<
  PrizeModel[],
  CommunityId | undefined
>({
  key: "prizeSelectorCommunityId",
  get:
    (communityId) =>
    ({ get }) => {
      const prizeMap = get(prizeState);
      if (communityId === undefined) return Array.from(prizeMap.values());
      const keys = prizeMap.keys();
      const prizeList: PrizeModel[] = [];
      for (const key of keys) {
        const prize = prizeMap.get(key);
        if (prize!.communityId !== communityId) continue;
        prizeList.push(prize!);
      }
      return prizeList;
    },
});
