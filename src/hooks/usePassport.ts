import { ClientCommunityPassport } from "@/src/features/passport";
import { PassportContract } from "@/src/features/passport/types/PassportContract";
import { PassportModel } from "@/src/models/PassportModel";
import { PassportState, passportState } from "@/src/stores/passportState";
import { CommunityId } from "@/src/types/CommunityId";
import { UserId } from "@/src/types/UserId";
import { deepCpyMap } from "@/src/util/deepCpy";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface PassportController {
  init: (communityId: CommunityId, passportAddress: string) => Promise<void>;
  mint: (
    communityId: CommunityId,
    passportAddress: string,
    userId: UserId,
  ) => Promise<void>;
  burn: (passportAddress: string, userId: UserId) => Promise<void>;
  addExp: (
    communityId: CommunityId,
    passportAddress: string,
    userId: UserId,
    addedExp: number,
  ) => void;
}

export const usePassportValue = (): PassportState =>
  useRecoilValue(passportState);

export const usePassportController = (): PassportController => {
  const setPassport = useSetRecoilState(passportState);

  /**
   * パスポートマップを初期化
   * @param communityId コミュニティID
   * @param passportAddress パスポートアドレス
   */
  const init = async (
    communityId: CommunityId,
    passportAddress: string,
  ): Promise<void> => {
    const res = await axios.post("/api/fetch/passport", {
      passportAddress,
    });
    if (res.status !== 200) throw new Error(res.data.message);
    const passportList: PassportContract[] = res.data;
    const newPassportMap: PassportState = new Map();
    for (let i = 0; i < passportList.length; i++) {
      const passportModel = PassportModel.fromData(
        communityId,
        passportList[i],
      );
      newPassportMap.set(passportModel.userId, passportModel);
    }
    setPassport((prevState) => {
      return newPassportMap;
    });
  };

  /**
   * mint
   * @param communityId コミュニティID
   * @param passportAddress パスポートアドレス
   * @param userId ユーザーのアドレス
   */
  const mint = async (
    communityId: CommunityId,
    passportAddress: string,
    userId: UserId,
  ): Promise<void> => {
    const passportContract = await ClientCommunityPassport.instance(
      passportAddress,
    );
    await passportContract.mint();
    const passport = await passportContract.getPassport(
      communityId.toString(),
      userId,
    );
    setPassport((prevState) => {
      const newPassportMap = deepCpyMap(prevState);
      const passportModel = PassportModel.fromData(communityId, passport);
      newPassportMap.set(passportModel.userId, passportModel);
      return newPassportMap;
    });
  };

  /**
   * burn
   * @param communityId コミュニティID
   * @param passportAddress パスポートアドレス
   * @param userId ユーザーのアドレス
   */
  const burn = async (
    passportAddress: string,
    userId: UserId,
  ): Promise<void> => {
    const passportContract = await ClientCommunityPassport.instance(
      passportAddress,
    );
    await passportContract.burn();
    setPassport((prevState) => {
      const newPassportMap = deepCpyMap(prevState);
      newPassportMap.delete(userId);
      return newPassportMap;
    });
  };

  /**
   * 経験値GET!
   * @param communityId コミュニティID
   * @param passportAddress パスポートアドレス
   * @param userId ユーザーのアドレス
   * @param addedExp 獲得した経験値
   */
  const addExp = (
    communityId: CommunityId,
    passportAddress: string,
    userId: UserId,
    addedExp: number,
  ): void => {
    setPassport((prevState) => {
      const nowPassport = prevState.get(userId);
      if (nowPassport === undefined) return prevState;
      const newPassport = nowPassport.copyWith({
        exp: nowPassport.exp + addedExp,
      });
      const newPassportMap = deepCpyMap(prevState);
      newPassportMap.set(userId, newPassport);
      return newPassportMap;
    });
  };

  const controller: PassportController = {
    init,
    mint,
    burn,
    addExp,
  };
  return controller;
};

export const usePassportState = (): [PassportState, PassportController] => [
  usePassportValue(),
  usePassportController(),
];
