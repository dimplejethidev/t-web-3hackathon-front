import { UserModel } from "@/src/models/UserModel";
import { atom } from "recoil";

export const userState = atom<UserModel>({
  key: "userState",
  default: new UserModel(),
});
