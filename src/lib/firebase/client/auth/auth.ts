import { clientAuth } from "@/src/lib/firebase/client/client";
import {
  NextOrObserver,
  User,
  signInWithCustomToken,
  signOut,
} from "firebase/auth";

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
   * カスタムトークンでログイン
   * @param token カスタムトークン
   * @return {Promise<User>} ログインユーザー情報
   */
  loginWithCustomToken = async (token: string) => {
    const userCredential = await signInWithCustomToken(clientAuth, token);
    return userCredential.user;
  };

  /**
   * ログアウト
   */
  logout = async () => {
    const userCredential = await signOut(clientAuth);
  };

  /**
   * ログイン状態を監視
   * @param callback ログイン状態が変化したときに実行される関数
   */
  onAuthStateChanged = async (callback: NextOrObserver<User | null>) => {
    clientAuth.onAuthStateChanged(callback);
  };
}
