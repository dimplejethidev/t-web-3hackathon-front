import { PrizeDetailModel } from "@/src/models/PrizeDetailModel";
import { PrizeModel } from "@/src/models/PrizeModel";
import {
  PrizeDetailState,
  prizeDetailSelectorObtained,
  prizeDetailState,
} from "@/src/stores/prizeDetailState";
import { PrizeJson } from "@/src/types/PrizeJson";
import { deepCpyMap } from "@/src/util/deepCpy";
import { toIPFSGatewayURL } from "@/src/util/ipfs";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface PrizeDetailController {
  fetch: (prizeList: PrizeModel[]) => Promise<void>;
}

export const usePrizeDetailValue = (): PrizeDetailState => {
  return useRecoilValue(prizeDetailState);
};

export const usePrizeDetailController = (): PrizeDetailController => {
  const setPrizeDetail = useSetRecoilState(prizeDetailState);

  /**
   * プライズ詳細を取得
   */
  const fetch = async (prizeList: PrizeModel[]): Promise<void> => {
    const promiseList = [];
    for (let i = 0; i < prizeList.length; i++) {
      const url = toIPFSGatewayURL(prizeList[i].uri);
      promiseList.push(axios.get(url));
    }
    const results = await Promise.all(promiseList);
    const jsons: PrizeJson[] = [];
    for (let i = 0; i < results.length; i++) {
      const res = results[i];
      if (res.status !== 200) throw new Error(res.data.message);
      const json = res.data as PrizeJson;
      jsons.push(json);
    }
    setPrizeDetail((prevState) => {
      const newMap = deepCpyMap(prevState);
      for (let i = 0; i < prizeList.length; i++) {
        newMap.set(
          prizeList[i].id,
          PrizeDetailModel.fromData(prizeList[i].id, jsons[i]),
        );
      }
      return newMap;
    });
  };

  const controller: PrizeDetailController = { fetch };
  return controller;
};

export const usePrizeDetailState = (): [
  PrizeDetailState,
  PrizeDetailController,
] => [usePrizeDetailValue(), usePrizeDetailController()];

export const usePrizeDetailObtained = (): PrizeDetailModel[] => {
  return useRecoilValue(prizeDetailSelectorObtained);
};
