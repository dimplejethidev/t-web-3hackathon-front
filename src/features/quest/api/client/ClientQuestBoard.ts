import { QUEST_BOARD_ABI, QUEST_BOARD_ADDRESS } from "@/src/const/contract";
import { NOT_FOUND_CONNECTED_ADDRESS } from "@/src/const/errormessage";
import { ClientWallet } from "@/src/lib/wallet";
import { ethers } from "ethers";

export class ClientQuestBoard {
  private static _instance: ClientQuestBoard;
  private _writer?: ethers.Contract;

  private constructor(
    private readonly _wallet: ClientWallet,
    private readonly _reader: ethers.Contract,
  ) {}

  /**
   * インスタンスの取得
   * @return {Promise<ClientQuestBoard>} コミュニティコントラクトインスタンス
   */
  public static async instance(): Promise<ClientQuestBoard> {
    if (!this._instance) {
      const wallet = await ClientWallet.instance();
      const reader = new ethers.Contract(
        QUEST_BOARD_ADDRESS,
        QUEST_BOARD_ABI,
        wallet.provider,
      );
      this._instance = new ClientQuestBoard(wallet, reader);
    }
    return this._instance;
  }

  /**
   * クエストクリアを申請
   * @param questId クエストID
   * @return {Promise<ethers.ContractTransactionReceipt>} レシート
   */
  claim = async (
    questId: number,
  ): Promise<ethers.ContractTransactionReceipt> => {
    await this._beforeWrite();
    const tx = await this._writer!.claim(questId);
    return (await tx.wait()) as ethers.ContractTransactionReceipt;
  };

  /**
   * クエストクリアで取得したERC1155をburn
   * @param questId クエストID
   * @return {Promise<ethers.ContractTransactionReceipt>} レシート
   */
  burn = async (
    questId: number,
  ): Promise<ethers.ContractTransactionReceipt> => {
    await this._beforeWrite();
    const tx = await this._writer!.burn(questId);
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
      QUEST_BOARD_ADDRESS,
      QUEST_BOARD_ABI,
      await this._wallet.getSigner(),
    );
  };
}
