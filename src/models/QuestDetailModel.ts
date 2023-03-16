import { ObjectCopier } from "@/src/models/ObjectCopier";
import { Attribute } from "@/src/types/Attribute";
import { QuestJson } from "@/src/types/QuestJson";
import { Requirements } from "@/src/types/Requirements";

export class QuestDetailModel extends ObjectCopier {
  constructor(
    public readonly questId: string = "",
    public readonly name: string = "",
    public readonly description: string = "",
    public readonly image: string = "",
    public readonly externalUrl: number = 0,
    public readonly attributes: Attribute[] = [],
    public readonly requirements: Requirements[] = [],
  ) {
    super();
  }

  /**
   * fromData
   * @param questId クエストID
   * @param json questURIから取得したクエスト情報
   * @return {QuestDetailModel} QuestDetailModel
   */
  public static fromData(questId: string, json: QuestJson): QuestDetailModel {
    return new QuestDetailModel(
      questId,
      json.name,
      json.description,
      json.image,
      json.external_url,
      json.attributes,
      json.requirements,
    );
  }
}
