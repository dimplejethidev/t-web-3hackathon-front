import { ethers } from "ethers";

export const RPC_URL = {
  mumbai: "https://rpc-mumbai.maticvigil.com/",
};

export class ServerWallet {
  private static _instance: ServerWallet;

  private constructor(
    public readonly provider: ethers.JsonRpcProvider,
    public readonly signer: ethers.Wallet,
  ) {}

  /**
   * インスタンスの取得
   * @return {ServerWallet} ウォレットインスタンス
   */
  public static instance(rpcURL: string): ServerWallet {
    if (!this._instance) {
      const provider = new ethers.JsonRpcProvider(rpcURL);
      const signer = new ethers.Wallet(
        process.env.PRIVATE_KEY as string,
        provider,
      );
      this._instance = new ServerWallet(provider, signer);
    }
    return this._instance;
  }

  /**
   * 現在のBlock Heightを取得
   * @return {Promise<number>} 接続したウォレットアドレス一覧
   */
  getCurrentBlockHeight = async (): Promise<number> => {
    return await this.provider.getBlockNumber();
  };
}
