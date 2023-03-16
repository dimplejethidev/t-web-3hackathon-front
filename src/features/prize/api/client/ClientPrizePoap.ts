import { PRIZE_POAP_ABI, PRIZE_POAP_ADDRESS } from "@/src/const/contract";
import { NOT_FOUND_CONNECTED_ADDRESS } from "@/src/const/errormessage";
import { ClientWallet } from "@/src/lib/wallet";
import { ethers } from "ethers";

export class ClientPrizePoap {
  private static _instance: ClientPrizePoap;
  private _writer?: ethers.Contract;

  private constructor(
    private readonly _wallet: ClientWallet,
    private readonly _reader: ethers.Contract,
  ) {}

  /**
   * インスタンスの取得
   * @return {Promise<ClientPrizePoap>} インスタンス
   */
  public static async instance(): Promise<ClientPrizePoap> {
    if (!this._instance) {
      const wallet = await ClientWallet.instance();
      const reader = new ethers.Contract(
        PRIZE_POAP_ADDRESS,
        PRIZE_POAP_ABI,
        wallet.provider,
      );
      this._instance = new ClientPrizePoap(wallet, reader);
    }
    return this._instance;
  }

  /**
   * mint
   * @param prizeId 報酬ID
   * @return {Promise<ethers.ContractTransactionReceipt>} レシート
   */
  mint = async (
    prizeId: number,
  ): Promise<ethers.ContractTransactionReceipt> => {
    await this._beforeWrite();
    const tx = await this._writer!.mint(prizeId);
    return (await tx.wait()) as ethers.ContractTransactionReceipt;
  };

  /**
   * burn
   * @param prizeId 報酬ID
   * @return {Promise<ethers.ContractTransactionReceipt>} レシート
   */
  burn = async (
    prizeId: number,
  ): Promise<ethers.ContractTransactionReceipt> => {
    await this._beforeWrite();
    const tx = await this._writer!.burn(prizeId);
    return (await tx.wait()) as ethers.ContractTransactionReceipt;
  };

  /**
   * 書き込み前処理
   */
  private _beforeWrite = async (): Promise<void> => {
    const connectedAddressList = await this._wallet.getConnectedAddresses();
    if (connectedAddressList.length === 0)
      throw Error(NOT_FOUND_CONNECTED_ADDRESS);
    if (this._writer !== undefined) return;
    this._writer = new ethers.Contract(
      PRIZE_POAP_ADDRESS,
      PRIZE_POAP_ABI,
      await this._wallet.getSigner(),
    );
  };
}
