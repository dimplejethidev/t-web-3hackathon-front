import { CommunityModel } from "@/src/models/CommunityModel";
import { CommunityId } from "@/src/types/CommunityId";
import { atom } from "recoil";

export type CommunityState = Map<CommunityId, CommunityModel>;

export const communityState = atom<CommunityState>({
  key: "communityState",
  default: new Map(),
});
