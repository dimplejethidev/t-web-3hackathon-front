import { PRIZE_POAP_ABI, PRIZE_POAP_ADDRESS } from "@/src/const/contract";
import { PrizeContract } from "@/src/features/prize/types/PrizeContract";
import { ServerWallet } from "@/src/lib/wallet";
import { ethers } from "ethers";

export class ServerPrizePoap {
  private static _instance: ServerPrizePoap;
  public readonly PAGE_SIZE: number = 100;

  private constructor(
    public readonly prizePoap: ethers.Contract,
    private readonly _wallet: ServerWallet,
  ) {}

  /**
   * インスタンスの取得
   * @param rpcURL RPC URL
   * @return {Promise<ServerPrizePoap>} コミュニティコントラクトインスタンス
   */
  public static instance(rpcURL: string): ServerPrizePoap {
    if (!this._instance) {
      const wallet = ServerWallet.instance(rpcURL);
      const prizePoap = new ethers.Contract(
        PRIZE_POAP_ADDRESS,
        PRIZE_POAP_ABI,
        wallet.signer,
      );
      this._instance = new ServerPrizePoap(prizePoap, wallet);
    }
    return this._instance;
  }

  /**
   * baseURLを取得
   * @return {Promise<string>} baseURL
   */
  getBaseURL = async (): Promise<string> => {
    return await this.prizePoap.getBaseURI();
  };

  /**
   * 総プライズ数を取得
   * @return {Promise<number>} 総プライズ数
   */
  getPrizeListLength = async (): Promise<number> => {
    return Number(await this.prizePoap.getPrizeListLength());
  };

  /**
   * 総プライズ数からプライズID配列へ変換
   * @return {string[]} プライズID配列
   */
  toPrizeIds = (prizeListLength: number): string[] => {
    const prizeIds: string[] = [];
    for (let i = 0; i < prizeListLength; i++) {
      prizeIds.push(i.toString());
    }
    return prizeIds;
  };

  /**
   * 任意の数だけプライズリストを取得
   * @param page ページ
   * @param pageSize ページサイズ
   * @return {Promise<PrizeContract[]>} プライズリスト
   */
  getPrizeList = async (
    page: number,
    pageSize: number,
  ): Promise<PrizeContract[]> => {
    const data = await this.prizePoap.getPrizeList(page, pageSize);
    const prizeList: PrizeContract[] = [];
    for (let i = 0; i < data[0].length; i++) {
      prizeList.push(this.toPrize(data[0][i]));
    }
    return prizeList;
  };

  /**
   * 全プライズリストを取得
   * @return {Promise<PrizeContract[]>} 全プライズリスト
   */
  getAllPrizeList = async (): Promise<PrizeContract[]> => {
    const prizeLength = await this.getPrizeListLength();
    const promiseList = [];
    let page = 0;
    promiseList.push(this.getBaseURL());
    while (true) {
      promiseList.push(this.getPrizeList(page, this.PAGE_SIZE));
      page++;
      if (page * this.PAGE_SIZE >= prizeLength) break;
    }
    const results = await Promise.all(promiseList);
    const baseURL = results[0];
    const prizeList: PrizeContract[] = [];
    for (let i = 1; i < results.length; i++) {
      for (let j = 0; j < results[i].length; j++) {
        const prize = results[i][j] as unknown as PrizeContract;
        prize.tokenURI = baseURL + prize.tokenURI;
        prizeList.push(prize);
      }
    }
    return prizeList;
  };

  /**
   * type Prize へ変換
   * @param data コントラクトから受け取ったプライズ情報
   * @return {PrizeContract} Prize
   */
  toPrize = (data: any): PrizeContract => {
    const prize: PrizeContract = {
      tokenURI: data[0],
      communityId: data[1].toString(),
      requiredExp: Number(data[2]),
      requiredQuestId: Number(data[3]),
      questRequired: data[4],
      closed: data[5],
    };
    return prize;
  };

  /**
   * プライズがclaim可能か一括チェック
   * @param userId ユーザーID
   * @param prizeIds プライズID配列
   * @return {Promise<boolean[]>} プライズclaim可否リスト
   */
  checkBatchObtainable = async (
    userId: string,
    prizeIds: string[],
  ): Promise<boolean[]> => {
    if (userId === "") {
      const prizeObtainable: boolean[] = [];
      for (let i = 0; i < prizeIds.length; i++) {
        prizeObtainable.push(false);
      }
      return prizeObtainable;
    }
    const prizeIdsNumber: number[] = [];
    const userList: string[] = [];
    for (let i = 0; i < prizeIds.length; i++) {
      userList.push(userId);
      prizeIdsNumber.push(Number(prizeIds[i]));
    }
    const data = await this.prizePoap.checkBatchObtainable(userList, prizeIds);
    return data;
  };

  /**
   * プライズが既にclaimされているか一括チェック
   * @param userId ユーザーID
   * @param prizeIds プライズID配列
   * @return {Promise<boolean[]>} プライズclaim済みかリスト
   */
  checkBatchObtained = async (
    userId: string,
    prizeIds: string[],
  ): Promise<boolean[]> => {
    let prizeObtained: boolean[] = [];
    if (userId === "") {
      for (let i = 0; i < prizeIds.length; i++) {
        prizeObtained.push(false);
      }
      return prizeObtained;
    }
    const prizeIdsNumber: number[] = [];
    const userList: string[] = [];
    for (let i = 0; i < prizeIds.length; i++) {
      userList.push(userId);
      prizeIdsNumber.push(Number(prizeIds[i]));
    }
    const data = await this.prizePoap.balanceOfBatch(userList, prizeIds);
    for (let i = 0; i < data.length; i++) {
      prizeObtained.push(data[i] > 0);
    }
    return prizeObtained;
  };
}
