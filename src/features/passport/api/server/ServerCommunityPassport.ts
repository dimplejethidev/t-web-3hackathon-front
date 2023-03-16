import { COMMUNITY_PASSPORT_ABI } from "@/src/const/contract";
import { PassportContract } from "@/src/features/passport/types/PassportContract";
import { ServerWallet } from "@/src/lib/wallet";
import { ethers } from "ethers";

export class ServerCommunityPassport {
  public readonly communityPassport: ethers.Contract;
  private readonly _wallet: ServerWallet;
  public readonly PAGE_SIZE: number = 100;

  constructor(rpcURL: string, contractAddress: string) {
    this._wallet = ServerWallet.instance(rpcURL);
    this.communityPassport = new ethers.Contract(
      contractAddress,
      COMMUNITY_PASSPORT_ABI,
      this._wallet.signer,
    );
  }

  /**
   * ファンの総数を取得
   * @return {Promise<number>} ファンの総数
   */
  getAllFanListLength = async (): Promise<number> => {
    return await this.communityPassport.totalSupply();
  };

  /**
   * 任意の数だけファンを取得
   * @return {Promise<string[]>} ファンリスト
   */
  getFanList = async (page: number, pageSize: number): Promise<string[]> => {
    const data = await this.communityPassport.getFanList(page, pageSize);
    const fanList: string[] = [];
    for (let i = 0; i < data[0].length; i++) {
      fanList.push(data[0][i]);
    }
    return fanList;
  };

  /**
   * 全ファンリストを取得
   * @return {Promise<string[]>} 全ファンリスト
   */
  getAllFanList = async (): Promise<string[]> => {
    const fanLength = await this.getAllFanListLength();
    const promiseList = [];
    let page = 0;
    while (true) {
      promiseList.push(this.getFanList(page, this.PAGE_SIZE));
      page++;
      if (page * this.PAGE_SIZE >= fanLength) break;
    }
    const results = await Promise.all(promiseList);
    const fanList: string[] = [];
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < results[i].length; j++) {
        fanList.push(results[i][j]);
      }
    }
    return fanList;
  };

  /**
   * 任意の数だけパスポートを取得
   * @return {Promise<PassportContract[]>} パスポートリスト
   */
  getPassportList = async (
    page: number,
    pageSize: number,
  ): Promise<PassportContract[]> => {
    const data = await this.communityPassport.getPassportList(page, pageSize);
    const passportList: PassportContract[] = [];
    for (let i = 0; i < data[0].length; i++) {
      const passport = this.toPassport(data[0][i]);
      passportList.push(passport);
    }
    return passportList;
  };

  /**
   * 全パスポートリストを取得
   * @return {Promise<PassportContract[]>} 全パスポートリスト
   */
  getAllPassportList = async (): Promise<PassportContract[]> => {
    const fanLength = await this.getAllFanListLength();
    const promiseList = [];
    let page = 0;
    while (true) {
      promiseList.push(this.getPassportList(page, this.PAGE_SIZE));
      page++;
      if (page * this.PAGE_SIZE >= fanLength) break;
    }
    const results = await Promise.all(promiseList);
    let passportList: PassportContract[] = [];
    for (let i = 0; i < results.length; i++) {
      passportList = passportList.concat(results[i]);
    }
    return passportList;
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
  //  * Transferイベントログを取得
  //  * @param passportCurrentBlockHeight パスポートコントラクトの現在のブロック高さ
  //  * @return {Promise<TransferEvent[]>} Transferイベントログ
  //  */
  // getTransferEvents = async (
  //   passportCurrentBlockHeight: number
  // ): Promise<TransferEvent[]> => {
  //   const logs: ethers.EventLog[] = await this._getAllTransferLogs(
  //     passportCurrentBlockHeight
  //   );
  //   const events: TransferEvent[] = [];
  //   for (let i = 0; i < logs.length; i++) {
  //     events.push(this._toTransferEvent(logs[i]));
  //   }
  //   return events;
  // };

  // /**
  //  * 全てのTransferイベントログを取得
  //  * @param passportCurrentBlockHeight パスポートコントラクトの現在のブロック高さ
  //  * @return {Promise<ethers.EventLog[]>} 全てのCreateイベントログ
  //  */
  // private _getAllTransferLogs = async (
  //   passportCurrentBlockHeight: number
  // ): Promise<ethers.EventLog[]> => {
  //   let startBlockHeight = START_BLOCK_HEIGHT;
  //   let logs: ethers.EventLog[] = [];
  //   while (startBlockHeight < passportCurrentBlockHeight) {
  //     let endBlockHeight = startBlockHeight + MAX_REQ_BLOCK_HEIGHT;
  //     if (endBlockHeight >= passportCurrentBlockHeight) {
  //       endBlockHeight = passportCurrentBlockHeight;
  //       const logsTmp = await this.passportContract.queryFilter(
  //         this.passportContract.filters.Transfer(),
  //         startBlockHeight,
  //         endBlockHeight
  //       );
  //       logs = [...logs, ...(logsTmp as ethers.EventLog[])];
  //       break;
  //     }
  //     const logsTmp = await this.passportContract.queryFilter(
  //       this.passportContract.filters.Transfer(),
  //       startBlockHeight,
  //       endBlockHeight
  //     );
  //     startBlockHeight = endBlockHeight + 1;
  //     logs = [...logs, ...(logsTmp as ethers.EventLog[])];
  //   }
  //   return logs;
  // };

  // /**
  //  * TransferイベントログをTransferEvent型へ変換
  //  * @return {TransferEvent} TransferEvent
  //  */
  // private _toTransferEvent = (createLog: ethers.EventLog): TransferEvent => {
  //   const from = createLog.args.from as string;
  //   const to = createLog.args.to as string;
  //   const tokenId = createLog.args.tokenId as BigInt;
  //   const event: TransferEvent = {
  //     from,
  //     to,
  //     tokenId,
  //   };
  //   return event;
  // };
}
