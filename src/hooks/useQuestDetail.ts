import { QuestDetailModel } from "@/src/models/QuestDetailModel";
import {
  QuestDetailState,
  questDetailState,
} from "@/src/stores/questDetailState";
import { QuestId } from "@/src/types/QuestId";
import { QuestJson } from "@/src/types/QuestJson";
import { deepCpyMap } from "@/src/util/deepCpy";
import { toIPFSGatewayURL } from "@/src/util/ipfs";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface QuestDetailController {
  fetch: (questId: QuestId, uri: string) => Promise<void>;
}

export const useQuestDetailValue = (): QuestDetailState => {
  return useRecoilValue(questDetailState);
};

export const useQuestDetailController = (): QuestDetailController => {
  const setQuestDetail = useSetRecoilState(questDetailState);

  /**
   * クエスト詳細を取得
   */
  const fetch = async (questId: QuestId, uri: string): Promise<void> => {
    const url = toIPFSGatewayURL(uri);
    const res = await axios.get(url);
    if (res.status !== 200) throw new Error(res.data.message);
    const json = res.data as QuestJson;
    setQuestDetail((prevState) => {
      const newMap = deepCpyMap(prevState);
      newMap.set(questId, QuestDetailModel.fromData(questId, json));
      return newMap;
    });
  };

  const questController: QuestDetailController = { fetch };
  return questController;
};

export const useQuestDetailState = (): [
  QuestDetailState,
  QuestDetailController,
] => [useQuestDetailValue(), useQuestDetailController()];
