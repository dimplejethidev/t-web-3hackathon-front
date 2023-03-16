import { ethers } from "ethers";

export class Verification {
  private static _instance: Verification;

  private constructor() {}

  /**
   * インスタンスの取得
   * @return {Verification} ウォレットインスタンス
   */
  public static instance(): Verification {
    if (!this._instance) {
      this._instance = new Verification();
    }
    return this._instance;
  }

  /**
   * 署名を検証
   * @param message 署名メッセージ
   * @param address 署名アドレス
   * @param signature 署名
   * @return {boolean} 検証成否
   */
  isCorrectSign = (
    message: string,
    address: string,
    signature: ethers.SignatureLike,
  ): boolean => {
    const digest = ethers.hashMessage(message);
    const actual = ethers.recoverAddress(digest, signature);
    return actual.toLowerCase() === address.toLowerCase();
  };
}
