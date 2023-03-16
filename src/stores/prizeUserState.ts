import { PrizeUserModel } from "@/src/models/PrizeUserModel";
import { PrizeId } from "@/src/types/PrizeId";
import { atom } from "recoil";

export type PrizeUserState = Map<PrizeId, PrizeUserModel>;

export const prizeUserState = atom<PrizeUserState>({
  key: "prizeUserState",
  default: new Map(),
});
