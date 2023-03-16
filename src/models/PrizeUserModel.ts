import { ObjectCopier } from "@/src/models/ObjectCopier";
import { PrizeId } from "@/src/types/PrizeId";

export class PrizeUserModel extends ObjectCopier {
  constructor(
    public readonly prizeId: PrizeId = "",
    public readonly obtainable: boolean = false,
    public readonly obtained: boolean = false,
  ) {
    super();
  }

  /**
   * fromData
   * @param prizeId プライズID
   * @param obtanable コントラクトから取得した獲得可能かどうか
   * @param obtained コントラクトから取得した獲得したかどうか
   * @return {PrizeUserModel} PrizeUserModel
   */
  public static fromData(
    prizeId: PrizeId,
    obtanable: boolean = false,
    obtained: boolean = false,
  ): PrizeUserModel {
    return new PrizeUserModel(prizeId, obtanable, obtained);
  }
}
