import { PrizeDetailModel } from "@/src/models/PrizeDetailModel";
import { prizeUserState } from "@/src/stores/prizeUserState";
import { PrizeId } from "@/src/types/PrizeId";
import { atom, selector } from "recoil";

export type PrizeDetailState = Map<PrizeId, PrizeDetailModel>;

export const prizeDetailState = atom<PrizeDetailState>({
  key: "prizeDetailState",
  default: new Map(),
});

export const prizeDetailSelectorObtained = selector<PrizeDetailModel[]>({
  key: "prizeDetailSelectorObtained",
  get: ({ get }) => {
    const prizeDetailMap = get(prizeDetailState);
    const prizeUserMap = get(prizeUserState);
    const keys = prizeUserMap.keys();
    const prizeDetails: PrizeDetailModel[] = [];
    for (const key of keys) {
      const prizeUser = prizeUserMap.get(key)!;
      if (!prizeUser.obtained) continue;
      prizeDetails.push(prizeDetailMap.get(key)!);
    }
    return prizeDetails;
  },
});
