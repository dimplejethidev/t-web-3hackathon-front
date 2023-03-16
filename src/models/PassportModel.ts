import { PassportContract } from "@/src/features/passport/types/PassportContract";
import { ObjectCopier } from "@/src/models/ObjectCopier";

export class PassportModel extends ObjectCopier {
  constructor(
    public readonly userId: string = "",
    public readonly communityId: string = "",
    public readonly exp: number = 0,
    public readonly uri: string = "",
  ) {
    super();
  }

  /**
   * fromData
   * @param communityId コミュニティID
   * @param passport コントラクトから取得したパスポート情報
   * @return {PassportModel} PassportModel
   */
  public static fromData(
    communityId: string,
    passport: PassportContract,
  ): PassportModel {
    return new PassportModel(
      passport.userId.toLowerCase(),
      communityId,
      Number(passport.exp),
      passport.uri,
    );
  }
}
