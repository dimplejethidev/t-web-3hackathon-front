import { COMMUNITY_PASSPORT_ABI } from "@/src/const/contract";
import { NOT_FOUND_CONNECTED_ADDRESS } from "@/src/const/errormessage";
import { PassportContract } from "@/src/features/passport/types/PassportContract";
import { ClientWallet } from "@/src/lib/wallet";
import { ethers } from "ethers";

export class ClientCommunityPassport {
  private _writer?: ethers.Contract;

  private constructor(
    private readonly _wallet: ClientWallet,
    private readonly _reader: ethers.Contract,
    public readonly contractAddress: string,
  ) {}

  /**
   * インスタンスの取得
   * @return {Promise<ClientCommunityPassport>} インスタンス
   */
  public static async instance(
    contractAddress: string,
  ): Promise<ClientCommunityPassport> {
    const wallet = await ClientWallet.instance();
    const reader = new ethers.Contract(
      contractAddress,
      COMMUNITY_PASSPORT_ABI,
      wallet.provider,
    );
    return new ClientCommunityPassport(wallet, reader, contractAddress);
  }

  /**
   * CommunityPassportをmint
   * @return {Promise<ethers.ContractTransactionReceipt>} レシート
   */
  mint = async (): Promise<ethers.ContractTransactionReceipt> => {
    await this._beforeWrite();
    const tx = await this._writer!.safeMint();
    return (await tx.wait()) as ethers.ContractTransactionReceipt;

    // txレシートからイベントを取得する方法（いずれ使うかもしてないので一応残す）
    // const test = (await tx.wait()) as ethers.ContractTransactionReceipt;
    // const logs = test.logs;
    // const events: ethers.EventLog[] = [];
    // for (let i = 0; i < logs.length; i++) {
    //   const flagment = this.passportContract.interface.getEvent(
    //     logs[i].topics[0]
    //   );
    //   if (flagment) events.push(logs[i] as ethers.EventLog);
    // }
    // for (let i = 0; i < events.length; i++) {
    //   console.log(events[i].args);
    // }
  };

  /**
   * CommunityPassportをburn
   * @return {Promise<ethers.ContractTransactionReceipt>} レシート
   */
  burn = async (): Promise<ethers.ContractTransactionReceipt> => {
    await this._beforeWrite();
    const tx = await this._writer!.burn();
    return (await tx.wait()) as ethers.ContractTransactionReceipt;
  };

  /**
   * パスポート情報をコントラクトから取得
   * @return {Promise<PassportContract>} パスポート
   */
  getPassport = async (
    communityId: string,
    fan: string,
  ): Promise<PassportContract> => {
    const data = await this._reader.getPassport(fan);
    return this.toPassport(data);
  };

  /**
   * type Passport へ変換
   * @param data コントラクトからのパスポート情報
   * @return {PassportContract} Passport
   */
  toPassport = (data: any[]): PassportContract => {
    const passport: PassportContract = {
      uri: data[0],
      userId: data[1].toLowerCase(),
      exp: Number(data[2]),
    };
    return passport;
  };

  // /**
  //  * イベント登録
  //  */
  // on = async (
  //   event: string,
  //   callback: (...args: Array<any>) => void
  // ): Promise<void> => {
  //   this._wallet.provider.once("block", () => {
  //     this._reader.on(event, callback);
  //   });
  // };

  /**
   * 書き込み前処理
   */
  private _beforeWrite = async (): Promise<void> => {
    const connectedAddressList = await this._wallet.getConnectedAddresses();
    if (connectedAddressList.length === 0)
      throw Error(NOT_FOUND_CONNECTED_ADDRESS);
    if (this._writer !== undefined) return;
    this._writer = new ethers.Contract(
      this.contractAddress,
      COMMUNITY_PASSPORT_ABI,
      await this._wallet.getSigner(),
    );
  };
}
