import { OpenSeaTokenURIModel } from "@/src/models/OpenSeaTokenURIModel";
import { PrizeModel } from "@/src/models/PrizeModel";
import {
  PrizeTokenURIMap,
  prizeTokenURIMapState,
  prizeTokenURIs,
} from "@/src/stores/prizeTokenURIMapState";
import { toIPFSGatewayURL } from "@/src/util/ipfs";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface PrizeTokenURIMapController {
  init: (communityId: string, prizeList: PrizeModel[]) => Promise<void>;
  update: (userId: string, prizeList: PrizeModel[]) => Promise<void>;
}

export const usePrizeTokenURIs = (key?: string): OpenSeaTokenURIModel[] => {
  if (key === undefined) key = "";
  return useRecoilValue(prizeTokenURIs(key));
};

export const usePrizeTokenURIMapValue = (): PrizeTokenURIMap => {
  return useRecoilValue(prizeTokenURIMapState);
};

export const usePrizeTokenURIMapController = (): PrizeTokenURIMapController => {
  const setPrizeTokenURIMap = useSetRecoilState(prizeTokenURIMapState);

  /**
   * コミュニティIDごとのPrizeTokenURIsを初期化
   * @param communityId コミュニティID
   * @param prizeList tokenURIs
   */
  const init = async (
    communityId: string,
    prizeList: PrizeModel[],
  ): Promise<void> => {
    const promiseList = [];
    for (let i = 0; i < prizeList.length; i++) {
      const url = toIPFSGatewayURL(prizeList[i].uri);
      promiseList.push(axios.get(url));
    }
    const results = await Promise.all(promiseList);
    setPrizeTokenURIMap((prevState) => {
      const newMap = _deepCpyPrizeTokenURIMap(prevState);
      const openSeaTokenModels: OpenSeaTokenURIModel[] = [];
      for (let i = 0; i < results.length; i++) {
        const res = results[i];
        if (res.status !== 200) throw new Error(res.data.message);
        const openSeaTokenModel = OpenSeaTokenURIModel.fromData(
          prizeList[i].id,
          res.data,
        );
        openSeaTokenModels.push(openSeaTokenModel);
      }
      newMap.set(communityId, openSeaTokenModels);
      return newMap;
    });
  };

  /**
   * PrizeTokenURIsを更新
   * @param userId tokenURIs
   * @param prizeList tokenURIs
   */
  const update = async (
    userId: string,
    prizeList: PrizeModel[],
  ): Promise<void> => {
    if (prizeList.length === 0) return;
    const promiseList = [];
    for (let i = 0; i < prizeList.length; i++) {
      const url = toIPFSGatewayURL(prizeList[i].uri);
      promiseList.push(axios.get(url));
    }
    const results = await Promise.all(promiseList);
    setPrizeTokenURIMap((prevState) => {
      const newMap = _deepCpyPrizeTokenURIMap(prevState);
      const openSeaTokenModels: OpenSeaTokenURIModel[] = [];
      for (let i = 0; i < results.length; i++) {
        const res = results[i];
        if (res.status !== 200) throw new Error(res.data.message);
        const openSeaTokenModel = OpenSeaTokenURIModel.fromData(
          prizeList[i].id,
          res.data,
        );
        openSeaTokenModels.push(openSeaTokenModel);
      }
      newMap.set(userId, openSeaTokenModels);
      return newMap;
    });
  };

  const controller: PrizeTokenURIMapController = {
    init,
    update,
  };
  return controller;
};

export const usePrizeTokenURIMapState = (): [
  PrizeTokenURIMap,
  PrizeTokenURIMapController,
] => [usePrizeTokenURIMapValue(), usePrizeTokenURIMapController()];

/**
 * PrizeTokenURIMapをディープコピー
 * @param prizeTokenURIMap コピー元
 * @return {PrizeTokenURIMap} PrizeTokenURIMap
 */
const _deepCpyPrizeTokenURIMap = (
  prizeTokenURIMap: PrizeTokenURIMap,
): PrizeTokenURIMap => {
  const newMap: PrizeTokenURIMap = new Map();
  const keys = prizeTokenURIMap.keys();
  for (const key of keys) {
    newMap.set(key, prizeTokenURIMap.get(key)!);
  }
  return newMap;
};
