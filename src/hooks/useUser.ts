import { CHAINID_MUMBAI } from "@/src/const/chainParams";
import { MISMATCH_CHAINID } from "@/src/const/errormessage";
import {
  ALREADY_CONNECTED_WALLET,
  CONNECTED_WALLET_YET,
  LOGIN_YET,
} from "@/src/const/message";
import { Auth } from "@/src/lib/firebase/client/auth";
import { ClientWallet } from "@/src/lib/wallet/client";
import { UserModel } from "@/src/models/UserModel";
import { isInitUserState } from "@/src/stores/isInitUserState";
import { userState } from "@/src/stores/userState";
import axios from "axios";
import uuid from "react-uuid";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface UserController {
  init: () => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserValue = (): UserModel => {
  return useRecoilValue(userState);
};

export const useUserController = (): UserController => {
  const setUser = useSetRecoilState(userState);
  const setIsInitUser = useSetRecoilState(isInitUserState);

  /**
   * 初期化
   */
  const init = (): void => {
    const auth = Auth.instance();
    auth.onAuthStateChanged(async (fbUser) => {
      if (!fbUser) {
        console.log(LOGIN_YET);
        setUser(new UserModel());
        setIsInitUser(true);
        return;
      }
      const wallet = await ClientWallet.instance();
      const addresses = await wallet.getConnectedAddresses();
      if (addresses.length === 0) {
        console.log(CONNECTED_WALLET_YET);
        setUser(new UserModel());
        setIsInitUser(true);
        return;
      }
      if ((await wallet.getChainId()) !== CHAINID_MUMBAI) {
        setUser(new UserModel());
        setIsInitUser(true);
        alert(MISMATCH_CHAINID);
        console.error(MISMATCH_CHAINID);
        return;
      }
      console.log(ALREADY_CONNECTED_WALLET(addresses[0]));
      setUser(new UserModel(addresses[0].toLowerCase()));
      setIsInitUser(true);
    });
  };

  /**
   * ログイン
   */
  const login = async (): Promise<void> => {
    const wallet = await ClientWallet.instance();
    if ((await wallet.getChainId()) !== CHAINID_MUMBAI)
      await wallet.switchChainIfNotExistAdd(CHAINID_MUMBAI);
    const addresses = await wallet.connect();
    const message = `fanbaseの利用規約に同意しウォレットを接続します。\n\nmessage id: ${uuid()}`;
    const signature = await wallet.sign(message);
    const res = await axios.post("/api/auth/login", {
      message,
      address: addresses[0],
      signature,
    });
    if (res.status !== 200) throw new Error(res.data.message);
    const auth = Auth.instance();
    await auth.loginWithCustomToken(res.data.token);
    setUser(new UserModel(addresses[0].toLowerCase()));
    console.log(`${addresses[0]} でログインしました。`);
  };

  /**
   * ログアウト
   */
  const logout = async (): Promise<void> => {
    const auth = Auth.instance();
    await auth.logout();
    setUser((prevState) => {
      console.log(`${prevState.id} からログアウトしました。`);
      return new UserModel();
    });
  };

  const controller: UserController = {
    init,
    login,
    logout,
  };
  return controller;
};

export const useUserState = (): [UserModel, UserController] => [
  useUserValue(),
  useUserController(),
];
