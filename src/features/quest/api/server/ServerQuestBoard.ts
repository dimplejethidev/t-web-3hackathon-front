import { QUEST_BOARD_ABI, QUEST_BOARD_ADDRESS } from "@/src/const/contract";
import { QuestContract } from "@/src/features/quest/types/QuestContract";
import { ServerWallet } from "@/src/lib/wallet";
import { ethers } from "ethers";

export class ServerQuestBoard {
  private static _instance: ServerQuestBoard;
  public readonly PAGE_SIZE: number = 100;

  private constructor(
    public readonly questBoard: ethers.Contract,
    private readonly _wallet: ServerWallet,
  ) {}

  /**
   * インスタンスの取得
   * @param rpcURL RPC URL
   * @return {Promise<ServerQuestBoard>} コミュニティコントラクトインスタンス
   */
  public static instance(rpcURL: string): ServerQuestBoard {
    if (!this._instance) {
      const wallet = ServerWallet.instance(rpcURL);
      const questBoard = new ethers.Contract(
        QUEST_BOARD_ADDRESS,
        QUEST_BOARD_ABI,
        wallet.signer,
      );
      this._instance = new ServerQuestBoard(questBoard, wallet);
    }
    return this._instance;
  }

  /**
   * 総クエスト数を取得
   * @return {Promise<number>} 総クエスト数
   */
  getQuestListLength = async (): Promise<number> => {
    return await this.questBoard.questSupply();
  };

  /**
   * 総クエスト数からクエストID配列へ変換
   * @return {string[]} クエストID配列
   */
  toQuestIds = (questListLength: number): string[] => {
    const questIds: string[] = [];
    for (let i = 0; i < questListLength; i++) {
      questIds.push(i.toString());
    }
    return questIds;
  };

  /**
   * 任意の数だけクエストリストを取得
   * @param page ページ
   * @param pageSize ページサイズ
   * @return {Promise<QuestContract[]>} クエストリスト
   */
  getQuestList = async (
    page: number,
    pageSize: number,
  ): Promise<QuestContract[]> => {
    const data = await this.questBoard.getQuest(page, pageSize);
    const questList: QuestContract[] = [];
    for (let i = 0; i < data[0].length; i++) {
      questList.push(this.toQuest(data[0][i]));
    }
    return questList;
  };

  /**
   * 全クエストリストを取得
   * @return {Promise<QuestContract[]>} 全クエストリスト
   */
  getAllQuestList = async (): Promise<QuestContract[]> => {
    const questLength = await this.getQuestListLength();
    const promiseList = [];
    let page = 0;
    while (true) {
      promiseList.push(this.getQuestList(page, this.PAGE_SIZE));
      page++;
      if (page * this.PAGE_SIZE >= questLength) break;
    }
    const results = await Promise.all(promiseList);
    const questList: QuestContract[] = [];
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < results[i].length; j++) {
        questList.push(results[i][j]);
      }
    }
    return questList;
  };

  /**
   * type Quest へ変換
   * @param data コントラクトから受け取ったクエスト情報
   * @return {QuestContract} Quest
   */
  toQuest = (data: any): QuestContract => {
    const quest: QuestContract = {
      title: data[0],
      questURI: data[1],
      questCheckerAddress: data[2],
      communityId: Number(data[3]),
      obtainableExp: Number(data[4]),
      obtainablePrizeId: Number(data[5]),
      prizeObtainable: data[6],
      closed: data[7],
    };
    return quest;
  };

  /**
   * クエストがclaim可能か一括チェック
   * @param userId ユーザーアドレス
   * @param questIds クエストID配列
   * @return {Promise<boolean[]>} クエストclaim可否リスト
   */
  checkBatchClaimable = async (
    userId: string,
    questIds: string[],
  ): Promise<boolean[]> => {
    if (userId === "") {
      const questClaimable: boolean[] = [];
      for (let i = 0; i < questIds.length; i++) {
        questClaimable.push(false);
      }
      return questClaimable;
    }
    const questIdsNumber: number[] = [];
    const userList: string[] = [];
    for (let i = 0; i < questIds.length; i++) {
      userList.push(userId);
      questIdsNumber.push(Number(questIds[i]));
    }
    const data = await this.questBoard.checkBatchCompleted(
      questIdsNumber,
      userList,
    );
    return data;
  };

  /**
   * クエストが既にclaimされているか一括チェック
   * @param userId ユーザーアドレス
   * @param questIds クエストID配列
   * @return {Promise<boolean[]>} クエストclaim済みかリスト
   */
  checkBatchClaimed = async (
    userId: string,
    questIds: string[],
  ): Promise<boolean[]> => {
    let questClaimed: boolean[] = [];
    if (userId === "") {
      for (let i = 0; i < questIds.length; i++) {
        questClaimed.push(false);
      }
      return questClaimed;
    }
    const questIdsNumber: number[] = [];
    const userList: string[] = [];
    for (let i = 0; i < questIds.length; i++) {
      userList.push(userId);
      questIdsNumber.push(Number(questIds[i]));
    }
    const data = await this.questBoard.balanceOfBatch(userList, questIdsNumber);
    for (let i = 0; i < data.length; i++) {
      questClaimed.push(data[i] > 0);
    }
    return questClaimed;
  };
}
