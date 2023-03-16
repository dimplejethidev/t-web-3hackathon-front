import { CUBE_ABI, CUBE_ADDRESS } from "@/src/const/contract";
import { CubeContract } from "@/src/features/cube/types";
import { ServerWallet } from "@/src/lib/wallet";
import { UserId } from "@/src/types/UserId";
import { ethers } from "ethers";

export class ServerCube {
  private static _instance: ServerCube;
  public readonly PAGE_SIZE: number = 100;

  private constructor(
    public readonly cube: ethers.Contract,
    private readonly _wallet: ServerWallet,
  ) {}

  /**
   * インスタンスの取得
   * @param rpcURL RPC URL
   * @return {Promise<ServerCube>} コミュニティコントラクトインスタンス
   */
  public static instance(rpcURL: string): ServerCube {
    if (!this._instance) {
      const wallet = ServerWallet.instance(rpcURL);
      const cube = new ethers.Contract(CUBE_ADDRESS, CUBE_ABI, wallet.signer);
      this._instance = new ServerCube(cube, wallet);
    }
    return this._instance;
  }

  /**
   * cube情報を取得
   * @return {Promise<CubeContract[][]>} baseURL
   */
  getCube = async (userId: UserId): Promise<CubeContract[][]> => {
    // getCube = async (userId: UserId): Promise<any> => {
    const data = await this.cube.getCube(userId);
    const cubeXZ: CubeContract[][] = [];
    for (let z = 0; z < data.length; z++) {
      const dataX = data[z];
      const cubeX: CubeContract[] = [];
      for (let x = 0; x < dataX.length; x++) {
        cubeX.push(this.toCube(dataX[x]));
      }
      cubeXZ.push(cubeX);
    }
    return cubeXZ;
  };

  /**
   * CubeContractへ変換
   * @param data コントラクトから受け取った箱庭情報
   * @return {CubeContract} CubeContract
   */
  toCube = (data: any): CubeContract => {
    const cubeObj: CubeContract = {
      prizeId: Number(data[0]),
      positionX: Number(data[1]),
      positionY: Number(data[2]),
      positionZ: Number(data[3]),
      rotationX: Number(data[4]),
      rotationY: Number(data[5]),
      rotationZ: Number(data[6]),
      set: data[7],
    };
    return cubeObj;
  };
}
