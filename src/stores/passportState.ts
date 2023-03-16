import { PassportModel } from "@/src/models/PassportModel";
import { UserId } from "@/src/types/UserId";
import { atom } from "recoil";

export type PassportState = Map<UserId, PassportModel>;

export const passportState = atom<PassportState>({
  key: "passportState",
  default: new Map(),
});
