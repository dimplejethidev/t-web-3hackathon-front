import { CubeContract, toCubePosition } from "@/src/features/cube";
import { ObjectCopier } from "@/src/models/ObjectCopier";
import { Position } from "@/src/types/Position";
import { PrizeId } from "@/src/types/PrizeId";
import { Rotation } from "@/src/types/Rotation";
import { UserId } from "@/src/types/UserId";

export class CubeModel extends ObjectCopier {
  constructor(
    public readonly userId: UserId = "",
    public readonly prizeId: PrizeId = "",
    public readonly position: Position = { x: 0, y: 0, z: 0 },
    public readonly rotation: Rotation = { x: 0, y: 0, z: 0 },
    public readonly set: boolean = false,
  ) {
    super();
  }

  /**
   * fromData
   * @param userId ユーザーID
   * @param cubeContract コントラクトから取得した箱庭情報
   * @param index 箱庭index
   * @return {CubeModel} CubeModel
   */
  public static fromData(
    userId: UserId,
    cubeContract: CubeContract,
    index: number,
  ): CubeModel {
    const position: Position = {
      x: cubeContract.positionX,
      y: cubeContract.positionY,
      z: cubeContract.positionZ,
    };
    const rotation: Rotation = {
      x: cubeContract.rotationX,
      y: cubeContract.rotationY,
      z: cubeContract.rotationZ,
    };
    return new CubeModel(
      userId,
      cubeContract.prizeId.toString(),
      cubeContract.set ? position : toCubePosition(index),
      rotation,
      cubeContract.set,
    );
  }

  public static isEqualPosition = (a: Position, b: Position): boolean =>
    a.x == b.x && a.y == b.y && a.z == b.z;

  public static isEqualRotation = (a: Rotation, b: Rotation): boolean =>
    a.x == b.x && a.y == b.y && a.z == b.z;

  public static isEqualCube = (a: CubeModel, b: CubeModel): boolean => {
    if (a.userId !== b.userId) return false;
    if (a.prizeId !== b.prizeId) return false;
    if (!this.isEqualPosition(a.position, b.position)) return false;
    if (!this.isEqualRotation(a.rotation, b.rotation)) return false;
    if (a.set !== b.set) return false;
    return true;
  };
}
