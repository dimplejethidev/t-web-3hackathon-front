import { ObjectCopier } from "@/src/models/ObjectCopier";

export class QuestUserModel extends ObjectCopier {
  constructor(
    public readonly questId: string = "",
    public readonly claimable: boolean = false,
    public readonly claimed: boolean = false,
  ) {
    super();
  }

  /**
   * fromData
   * @param questId クエストID
   * @param claimable コントラクトから取得したclaim可能かどうか
   * @param claimed コントラクトから取得したclaim済みか
   * @return {QuestUserModel} QuestUserModel
   */
  public static fromData(
    questId: string,
    claimable: boolean = false,
    claimed: boolean = false,
  ): QuestUserModel {
    return new QuestUserModel(questId, claimable, claimed);
  }
}
