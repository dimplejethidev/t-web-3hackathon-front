import { QuestContract } from "@/src/features/quest/types/QuestContract";
import { ObjectCopier } from "@/src/models/ObjectCopier";
import { QuestId } from "@/src/types/QuestId";

export class QuestModel extends ObjectCopier {
  constructor(
    public readonly id: QuestId = "",
    public readonly communityId: string = "",
    public readonly title: string = "",
    public readonly exp: number = 0,
    public readonly closed: boolean = false,
    public readonly questURI: string = "",
  ) {
    super();
  }

  /**
   * fromData
   * @param questId クエストID
   * @param quest コントラクトから取得したクエスト情報
   * @return {QuestModel} QuestModel
   */
  public static fromData(questId: string, quest: QuestContract): QuestModel {
    return new QuestModel(
      questId,
      quest.communityId.toString(),
      quest.title,
      quest.obtainableExp,
      quest.closed,
      quest.questURI,
    );
  }

  /**
   * toIds
   * @param questList クエスト配列
   * @return {QuestModel} QuestModel
   */
  public static toIds(questList: QuestModel[]): QuestId[] {
    return questList.map((quest) => quest.id);
  }
}
