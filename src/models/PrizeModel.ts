import { PrizeContract } from "@/src/features/prize/types/PrizeContract";
import { ObjectCopier } from "@/src/models/ObjectCopier";
import { PrizeId } from "@/src/types/PrizeId";

export class PrizeModel extends ObjectCopier {
  constructor(
    public readonly id: PrizeId = "",
    public readonly communityId: string = "",
    public readonly requiredExp: number = 0,
    public readonly requiredQuestId: string = "",
    public readonly questRequired: boolean = false,
    public readonly closed: boolean = false,
    public readonly uri: string = "",
  ) {
    super();
  }

  /**
   * fromData
   * @param id プライズID
   * @param prizeContract コントラクトから取得したプライズ情報
   * @return {PrizeModel} PrizeModel
   */
  public static fromData(
    id: PrizeId,
    prizeContract: PrizeContract,
  ): PrizeModel {
    return new PrizeModel(
      id,
      prizeContract.communityId.toString(),
      prizeContract.requiredExp,
      prizeContract.requiredQuestId.toString(),
      prizeContract.questRequired,
      prizeContract.closed,
      prizeContract.tokenURI,
    );
  }

  /**
   * toIds
   * @param prizeList プライズ配列
   * @return {PrizeModel} PrizeModel
   */
  public static toIds(prizeList: PrizeModel[]): PrizeId[] {
    return prizeList.map((prize) => prize.id);
  }
}
