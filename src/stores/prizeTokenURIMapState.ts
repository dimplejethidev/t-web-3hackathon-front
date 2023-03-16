import { OpenSeaTokenURIModel } from "@/src/models/OpenSeaTokenURIModel";
import { atom, selectorFamily } from "recoil";

export type PrizeTokenURIMap = Map<string, OpenSeaTokenURIModel[]>;

export const prizeTokenURIMapState = atom<PrizeTokenURIMap>({
  key: "prizeTokenURIMapState",
  default: new Map(),
});

export const prizeTokenURIs = selectorFamily<OpenSeaTokenURIModel[], string>({
  key: "prizeTokenURIs",
  get:
    (key) =>
    ({ get }) => {
      const prizeTokenURIMap = get(prizeTokenURIMapState);
      let openSeaTokenURIs = prizeTokenURIMap.get(key);
      if (openSeaTokenURIs === undefined) openSeaTokenURIs = [];
      return openSeaTokenURIs;
    },
});
