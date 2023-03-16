import { Community } from "@/src/features/community/types/Community";
import { ObjectCopier } from "@/src/models/ObjectCopier";
import { Linkage } from "@/src/types/Linkage";
import { toIPFSGatewayURL } from "@/src/util/ipfs";

type CommunityAttribute = {
  trait_type: string;
  value: string;
};

type CommunityFront = {
  title: string;
  description: string;
  icon: string;
  thumbnail: string;
  linkage: Linkage;
};

export type CommunityJson = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: CommunityAttribute[];
  front: CommunityFront;
};

export class CommunityModel extends ObjectCopier {
  constructor(
    public readonly id: string = "",
    public readonly title: string = "",
    public readonly description: string = "",
    public readonly icon: string = "",
    public readonly thumbnail: string = "",
    public readonly closed: boolean = false,
    public readonly passport: string = "",
    public readonly linkage: Linkage = {
      twitter: "",
      discord: "",
      line: "",
    },
  ) {
    super();
  }

  /**
   * fromData
   * @return {Promise<CommunityModel>} CommunityModel
   */
  public static fromData(
    communityId: string,
    community: Community,
    communityJson: CommunityJson,
  ): CommunityModel {
    return new CommunityModel(
      communityId,
      communityJson.front.title,
      communityJson.front.description,
      toIPFSGatewayURL(communityJson.front.icon),
      toIPFSGatewayURL(communityJson.front.thumbnail),
      community.closed,
      community.passport,
      communityJson.front.linkage,
    );
  }
}
