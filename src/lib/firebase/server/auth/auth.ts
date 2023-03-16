import { adminAuth } from "@/src/lib/firebase/server";

export class Auth {
  private static _instance: Auth;

  /**
   * コンストラクタ
   */
  private constructor() {}

  /**
   * インスタンスの取得
   * @return  {Auth} インスタンス
   */
  public static instance(): Auth {
    if (!this._instance) {
      this._instance = new Auth();
    }
    return this._instance;
  }

  /**
   * カスタムトークンを作成
   * @param uid ID
   * @return {Promise<string>} カスタムトークン
   */
  createCustomToken = async (uid: string) => {
    return await adminAuth.createCustomToken(uid);
  };
}
