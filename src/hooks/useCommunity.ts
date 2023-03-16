import { Community } from "@/src/features/community/types/Community";
import { CommunityJson, CommunityModel } from "@/src/models/CommunityModel";
import { CommunityState, communityState } from "@/src/stores/communityState";
import { CommunityId } from "@/src/types/CommunityId";
import { toIPFSGatewayURL } from "@/src/util/ipfs";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface CommunityController {
  init: () => Promise<void>;
}

export const useCommunityStateValue = (): CommunityState => {
  return useRecoilValue(communityState);
};

export const useCommunityController = (): CommunityController => {
  const setCommunityList = useSetRecoilState(communityState);

  /**
   * 初期化
   */
  const init = async (): Promise<void> => {
    const res = await axios.post("/api/fetch/community");
    if (res.status !== 200) throw new Error(res.data.message);
    const communityList = res.data as Community[];
    const promiseList = [];
    for (let i = 0; i < communityList.length; i++) {
      const url = toIPFSGatewayURL(communityList[i].uri);
      promiseList.push(axios.get(url));
    }
    const results = await Promise.all(promiseList);
    const newState: CommunityState = new Map();
    for (let i = 0; i < results.length; i++) {
      const res = results[i];
      if (res.status !== 200) throw new Error(res.data.message);
      const communityJson = res.data as CommunityJson;
      newState.set(
        i.toString(),
        CommunityModel.fromData(i.toString(), communityList[i], communityJson),
      );
    }
    setCommunityList((prevState) => {
      return newState;
    });
  };

  const communityController: CommunityController = {
    init,
  };
  return communityController;
};

export const useCommunityListState = (): [
  CommunityState,
  CommunityController,
] => [useCommunityStateValue(), useCommunityController()];

export const useCommunityValue = (
  communityId: CommunityId,
): CommunityModel | undefined => {
  return useRecoilValue(communityState).get(communityId);
};
