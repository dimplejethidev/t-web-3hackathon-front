import { PrizeContract } from "@/src/features/prize/types/PrizeContract";
import { PrizeModel } from "@/src/models/PrizeModel";
import {
  PrizeState,
  prizeSelectorCommunityId,
  prizeState,
} from "@/src/stores/prizeState";
import { CommunityId } from "@/src/types/CommunityId";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface PrizeController {
  init: () => Promise<void>;
}

export const usePrizeValue = (): PrizeState => {
  return useRecoilValue(prizeState);
};

export const usePrizeController = (): PrizeController => {
  const setPrizeState = useSetRecoilState(prizeState);

  /**
   * プライズ一覧を初期化
   */
  const init = async (): Promise<void> => {
    const res = await axios.post("/api/fetch/prize");
    if (res.status !== 200) throw new Error(res.data.message);
    const prizeList = res.data.prizeList as PrizeContract[];
    setPrizeState((prevState) => {
      const newState: PrizeState = new Map();
      for (let i = 0; i < prizeList.length; i++) {
        newState.set(
          i.toString(),
          PrizeModel.fromData(i.toString(), prizeList[i]),
        );
      }
      return newState;
    });
  };

  const controller: PrizeController = {
    init,
  };
  return controller;
};

export const usePrizeState = (): [PrizeState, PrizeController] => [
  usePrizeValue(),
  usePrizeController(),
];

export const usePrizeListValue = (): PrizeModel[] =>
  Array.from(usePrizeValue().values());

export const usePrizeSelectorCommunityId = (
  communityId?: CommunityId,
): PrizeModel[] => {
  return useRecoilValue(prizeSelectorCommunityId(communityId));
};
