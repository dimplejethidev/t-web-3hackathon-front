import { ClientPrizePoap } from "@/src/features/prize/api";
import { PrizeModel } from "@/src/models/PrizeModel";
import { PrizeUserModel } from "@/src/models/PrizeUserModel";
import { PrizeUserState, prizeUserState } from "@/src/stores/prizeUserState";
import { PrizeId } from "@/src/types/PrizeId";
import { deepCpyMap } from "@/src/util/deepCpy";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface PrizeUserController {
  init: (userId: string) => Promise<void>;
  updateObtainState: (userId: string, prizeList: PrizeModel[]) => Promise<void>;
  obtain: (prizeId: PrizeId) => Promise<void>;
}

export const usePrizeUserValue = (): PrizeUserState => {
  return useRecoilValue(prizeUserState);
};

export const usePrizeUserController = (): PrizeUserController => {
  const setPrizeUserState = useSetRecoilState(prizeUserState);

  /**
   * 初期化
   */
  const init = async (userId: string): Promise<void> => {
    const results = await Promise.all([
      axios.post("/api/fetch/prize-obtainable", {
        userId,
      }),
      axios.post("/api/fetch/prize-obtained", {
        userId,
      }),
    ]);
    const resObtainable = results[0];
    if (resObtainable.status !== 200)
      throw new Error(resObtainable.data.message);
    const resObtained = results[1];
    if (resObtained.status !== 200) throw new Error(resObtained.data.message);
    const prizeObtainable = resObtainable.data.prizeObtainable as boolean[];
    const prizeObtained = resObtained.data.prizeObtained as boolean[];
    setPrizeUserState((prevState) => {
      const newState: PrizeUserState = new Map();
      for (let i = 0; i < prizeObtainable.length; i++) {
        newState.set(
          i.toString(),
          PrizeUserModel.fromData(
            i.toString(),
            prizeObtainable[i],
            prizeObtained[i],
          ),
        );
      }
      return newState;
    });
  };

  /**
   * プライズ報酬を受け取れるか、受け取ったかの状態を更新
   * @param userId ユーザーID
   * @param prizeList プライズ配列
   */
  const updateObtainState = async (
    userId: string,
    prizeList: PrizeModel[],
  ): Promise<void> => {
    const prizeIds = PrizeModel.toIds(prizeList);
    const results = await Promise.all([
      axios.post("/api/fetch/prize-obtainable", {
        userId,
        prizeIds,
      }),
      axios.post("/api/fetch/prize-obtained", {
        userId,
        prizeIds,
      }),
    ]);
    const resObtainable = results[0];
    if (resObtainable.status !== 200)
      throw new Error(resObtainable.data.message);
    const resObtained = results[1];
    if (resObtained.status !== 200) throw new Error(resObtained.data.message);
    const prizeObtainable = resObtainable.data.prizeObtainable as boolean[];
    const prizeObtained = resObtained.data.prizeObtained as boolean[];
    setPrizeUserState((prevState) => {
      const newState = deepCpyMap(prevState);
      for (let i = 0; i < prizeIds.length; i++) {
        newState.set(
          prizeIds[i],
          PrizeUserModel.fromData(
            prizeIds[i],
            prizeObtainable[i],
            prizeObtained[i],
          ),
        );
      }
      return newState;
    });
  };

  /**
   * 報酬をGET
   * @param prizeId 報酬ID
   */
  const obtain = async (prizeId: PrizeId): Promise<void> => {
    const prizePoap = await ClientPrizePoap.instance();
    await prizePoap.mint(Number(prizeId));
    setPrizeUserState((prevState) => {
      const newState = deepCpyMap(prevState);
      const prize = newState.get(prizeId)!;
      newState.set(prizeId, prize.copyWith({ obtained: true }));
      return newState;
    });
  };

  const controller: PrizeUserController = {
    init,
    updateObtainState,
    obtain,
  };
  return controller;
};

export const usePrizeUserState = (): [PrizeUserState, PrizeUserController] => [
  usePrizeUserValue(),
  usePrizeUserController(),
];
