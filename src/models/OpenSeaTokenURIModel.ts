import { ObjectCopier } from "@/src/models/ObjectCopier";
import { Attribute } from "@/src/types/Attribute";

export class OpenSeaTokenURIModel extends ObjectCopier {
  constructor(
    public readonly prizeId: string = "",
    public readonly name: string = "",
    public readonly description: string = "",
    public readonly image: string = "",
    public readonly external_url: string = "",
    public readonly attributes: Attribute[] = [],
  ) {
    super();
  }

  /**
   * fromData
   * @param prizeId 報酬ID
   * @param data OpenSeaTokenURIJson
   * @return {OpenSeaTokenURIModel} OpenSeaTokenURIModel
   */
  public static fromData(prizeId: string, data: any): OpenSeaTokenURIModel {
    return new OpenSeaTokenURIModel(
      prizeId,
      data.name,
      data.description,
      data.image,
      data.external_url,
      data.attributes,
    );
  }
}
