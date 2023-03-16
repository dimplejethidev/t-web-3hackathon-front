import { CUBE_ABI, CUBE_ADDRESS } from "@/src/const/contract";
import { NOT_FOUND_CONNECTED_ADDRESS } from "@/src/const/errormessage";
import { CubeContract } from "@/src/features/cube/types";
import { ClientWallet } from "@/src/lib/wallet";
import { CubeModel } from "@/src/models/CubeModel";
import { ethers } from "ethers";

export type CubeObjContract = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  boolean,
];

export class ClientCube {
  private static _instance: ClientCube;
  private _writer?: ethers.Contract;

  private constructor(
    private readonly _wallet: ClientWallet,
    private readonly _reader: ethers.Contract,
  ) {}

  /**
   * インスタンスの取得
   * @return {Promise<ClientCube>} インスタンス
   */
  public static async instance(): Promise<ClientCube> {
    if (!this._instance) {
      const wallet = await ClientWallet.instance();
      const reader = new ethers.Contract(
        CUBE_ADDRESS,
        CUBE_ABI,
        wallet.provider,
      );
      this._instance = new ClientCube(wallet, reader);
    }
    return this._instance;
  }

  /**
   * toCubeContract
   * @param cubeModel CubeModel
   * @return {CubeContract} CubeContract
   */
  public static toCubeContract(cubeModel: CubeModel): CubeContract {
    return {
      prizeId: Number(cubeModel.prizeId),
      positionX: cubeModel.position.x,
      positionY: cubeModel.position.y,
      positionZ: cubeModel.position.z,
      rotationX: cubeModel.rotation.x,
      rotationY: cubeModel.rotation.y,
      rotationZ: cubeModel.rotation.z,
      set: cubeModel.set,
    };
  }

  /**
   * toCubeObj
   * @param cubeModel CubeModel
   * @return {CubeObjContract} CubeObj
   */
  public static toCubeObj = (cubeModel: CubeModel): CubeObjContract => [
    Number(cubeModel.prizeId),
    cubeModel.position.x,
    cubeModel.position.y,
    cubeModel.position.z,
    cubeModel.rotation.x,
    cubeModel.rotation.y,
    cubeModel.rotation.z,
    cubeModel.set,
  ];

  /**
   * setBatchCubeObj
   * @param prizeId 報酬ID
   * @return {Promise<ethers.ContractTransactionReceipt>} レシート
   */
  setBatchCubeObj = async (
    cubeObjList: CubeObjContract[],
  ): Promise<ethers.ContractTransactionReceipt> => {
    await this._beforeWrite();
    const tx = await this._writer!.setBatchCubeObj(cubeObjList);
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
      CUBE_ADDRESS,
      CUBE_ABI,
      await this._wallet.getSigner(),
    );
  };
}
