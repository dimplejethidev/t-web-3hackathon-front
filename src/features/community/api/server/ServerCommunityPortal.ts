import {
  COMMUNITY_PORTAL_ABI,
  COMMUNITY_PORTAL_ADDRESS,
  MAX_REQ_BLOCK_HEIGHT,
  START_BLOCK_HEIGHT,
} from "@/src/const/contract";
import { Community } from "@/src/features/community/types/Community";
import { CreateEvent } from "@/src/features/community/types/CreateEvent";
import { ServerWallet } from "@/src/lib/wallet";
import { ethers } from "ethers";

export class ServerCommunityPortal {
  private static _instance: ServerCommunityPortal;
  public readonly PAGE_SIZE: number = 100;

  private constructor(
    public readonly communityPortal: ethers.Contract,
    private readonly wallet: ServerWallet,
  ) {}

  /**
   * インスタンスの取得
   * @return {Promise<ServerCommunityPortal>} コミュニティコントラクトインスタンス
   */
  public static instance(rpcURL: string): ServerCommunityPortal {
    if (!this._instance) {
      const wallet = ServerWallet.instance(rpcURL);
      const communityPortal = new ethers.Contract(
        COMMUNITY_PORTAL_ADDRESS,
        COMMUNITY_PORTAL_ABI,
        wallet.signer,
      );
      this._instance = new ServerCommunityPortal(communityPortal, wallet);
    }
    return this._instance;
  }

  /**
   * 総コミュニティ数を取得
   * @return {Promise<number>} 総コミュニティ数
   */
  getCommunityListLength = async (): Promise<number> => {
    return await this.communityPortal.communitySupply();
  };

  /**
   * 任意の数だけコミュニティリストを取得
   * @return {Promise<Community[]>} コミュニティリスト
   */
  getCommunityList = async (
    page: number,
    pageSize: number,
  ): Promise<Community[]> => {
    const data = await this.communityPortal.getCommunityList(page, pageSize);
    const communityList: Community[] = [];
    for (let i = 0; i < data[0].length; i++) {
      communityList.push(this.toCommunity(data[0][i]));
    }
    return communityList;
  };

  /**
   * 全コミュニティリストを取得
   * @return {Promise<Community[]>} 全コミュニティリスト
   */
  getAllCommunityList = async (): Promise<Community[]> => {
    const communityLength = await this.getCommunityListLength();
    const promiseList = [];
    let page = 0;
    while (true) {
      promiseList.push(this.getCommunityList(page, this.PAGE_SIZE));
      page++;
      if (page * this.PAGE_SIZE >= communityLength) break;
    }
    const results = await Promise.all(promiseList);
    const communityList: Community[] = [];
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < results[i].length; j++) {
        communityList.push(results[i][j]);
      }
    }
    return communityList;
  };

  /**
   * type Community へ変換
   * @return {Community} Community
   */
  toCommunity = (data: any): Community => {
    const community: Community = {
      uri: data[0],
      passport: data[1],
      closed: data[2],
    };
    return community;
  };

  /**
   * Createイベントログを取得
   * @return {Promise<CreateEvent[]>} Createイベントログ
   */
  getCreateEvents = async (): Promise<CreateEvent[]> => {
    const createLogs: ethers.EventLog[] = await this._getAllCreateLogs();
    const events: CreateEvent[] = [];
    for (let i = 0; i < createLogs.length; i++) {
      const createLog = createLogs[i];
      events.push(this._toCreateEvent(createLog));
    }
    return events;
  };

  /**
   * 全てのCreateイベントログを取得
   * @return {Promise<ethers.EventLog[]>} 全てのCreateイベントログ
   */
  private _getAllCreateLogs = async (): Promise<ethers.EventLog[]> => {
    let startBlockHeight = START_BLOCK_HEIGHT;
    const promiseAll = Promise.all([
      this.wallet.getCurrentBlockHeight(),
      this.communityPortal.communitySupply(),
    ]);
    const list = await promiseAll;
    const currentBlockHeight = list[0];
    const communityTotalSupply = list[1];
    let createLogs: ethers.EventLog[] = [];
    while (createLogs.length < communityTotalSupply) {
      let endBlockHeight = startBlockHeight + MAX_REQ_BLOCK_HEIGHT;
      if (endBlockHeight >= currentBlockHeight) {
        endBlockHeight = currentBlockHeight;
        const createLogsTmp = await this.communityPortal.queryFilter(
          this.communityPortal.filters.Create(COMMUNITY_PORTAL_ADDRESS),
          startBlockHeight,
          endBlockHeight,
        );
        createLogs = [...createLogs, ...(createLogsTmp as ethers.EventLog[])];
        break;
      }
      const createLogsTmp = await this.communityPortal.queryFilter(
        this.communityPortal.filters.Create(COMMUNITY_PORTAL_ADDRESS),
        startBlockHeight,
        endBlockHeight,
      );
      startBlockHeight = endBlockHeight + 1;
      createLogs = [...createLogs, ...(createLogsTmp as ethers.EventLog[])];
    }
    if (BigInt(createLogs.length) !== communityTotalSupply)
      console.log("コミュニティ一覧に過不足が生じています。");
    return createLogs;
  };
  /**
   * CreateイベントログをCreateEvent型へ変換
   * @return {CreateEvent} CreateEvent
   */
  private _toCreateEvent = (createLog: ethers.EventLog): CreateEvent => {
    const publisher = createLog.args.publisher as string;
    const creater = createLog.args.creater as string;
    const communityId = createLog.args.communityId as BigInt;
    const passport = createLog.args.passport as string;
    const communityURI = createLog.args.communityURI as string;
    const event: CreateEvent = {
      publisher,
      creater,
      communityId,
      passport,
      communityURI,
    };
    return event;
  };
}
