import { ObjectCopier } from "@/src/models/ObjectCopier";
import { Attribute } from "@/src/types/Attribute";
import { PrizeId } from "@/src/types/PrizeId";
import { PrizeJson } from "@/src/types/PrizeJson";
import { toIPFSGatewayURL } from "@/src/util/ipfs";

export class PrizeDetailModel extends ObjectCopier {
  constructor(
    public readonly prizeId: PrizeId = "",
    public readonly name: string = "",
    public readonly description: string = "",
    public readonly image: string = "",
    public readonly externalUrl: string = "",
    public readonly attributes: Attribute[] = [],
  ) {
    super();
  }

  /**
   * fromData
   * @param prizeId プライズID
   * @param json prizeURIから取得した報酬情報
   * @return {PrizeDetailModel} PrizeDetailModel
   */
  public static fromData(prizeId: PrizeId, json: PrizeJson): PrizeDetailModel {
    return new PrizeDetailModel(
      prizeId,
      json.name,
      json.description,
      toIPFSGatewayURL(json.image),
      json.external_url,
      json.attributes,
    );
  }
}
