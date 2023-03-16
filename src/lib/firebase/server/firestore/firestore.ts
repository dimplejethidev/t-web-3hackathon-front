import { FIRESTORE_COL_PASSPORTS } from "@/src/const/database";
import { FIRESTORE_NOT_FOUND_DOC } from "@/src/const/errormessage";
import { adminDB } from "@/src/lib/firebase/server";

export class FireStore {
  private static _instance: FireStore;

  /**
   * コンストラクタ
   */
  private constructor() {}

  /**
   * インスタンスの取得
   * @return  {FireStore} インスタンス
   */
  public static instance(): FireStore {
    if (!this._instance) {
      this._instance = new FireStore();
    }
    return this._instance;
  }

  /**
   * ブロック高さを取得
   * @param passportContractAddress パスポートコントラクトアドレス
   * @return {Promise<number>} ブロック高さ
   */
  getBlockHeight = async (passportContractAddress: string): Promise<number> => {
    const ref = adminDB
      .collection(FIRESTORE_COL_PASSPORTS)
      .doc(passportContractAddress);
    const doc = await ref.get();
    if (!doc.exists) throw Error(FIRESTORE_NOT_FOUND_DOC);
    return doc.get("blockHeight");
  };

  /**
   * ブロック高さを更新
   * @param passportContractAddress パスポートコントラクトアドレス
   * @param newBlockHeight ブロック高さ
   */
  updateBlockHeight = async (
    passportContractAddress: string,
    newBlockHeight: number,
  ): Promise<void> => {
    const ref = adminDB
      .collection(FIRESTORE_COL_PASSPORTS)
      .doc(passportContractAddress);
    await ref.update({
      blockHeight: newBlockHeight,
    });
  };

  /**
   * ブロック高さを追加
   * @param passportContractAddress パスポートコントラクトアドレス
   * @param newBlockHeight ブロック高さ
   * @return {Promise<string>} カスタムトークン
   */
  addBlockHeight = async (
    passportContractAddress: string,
    newBlockHeight: number,
  ): Promise<void> => {
    const ref = adminDB
      .collection(FIRESTORE_COL_PASSPORTS)
      .doc(passportContractAddress);
    await ref.set({
      blockHeight: newBlockHeight,
    });
  };
}
