import { CubeModel } from "@/src/models/CubeModel";
import { CubeTmpState, cubeTmpState } from "@/src/stores/cubeTmpState";
import { PrizeId } from "@/src/types/PrizeId";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface CubeTmpController {
  init: (cube: CubeModel[]) => void;
  update: (index: number, prizeId: PrizeId) => void;
  deleteCubeTmp: (index: number, prizeId: PrizeId) => void;
}

export const useCubeTmpValue = (): CubeTmpState => useRecoilValue(cubeTmpState);

export const useCubeTmpController = (): CubeTmpController => {
  const setCubeTmpState = useSetRecoilState(cubeTmpState);

  /**
   * 初期化
   * @param cube 箱庭
   */
  const init = (cube: CubeModel[]): void => setCubeTmpState(cube);

  /**
   * 更新
   * @param index 箱庭objインデックス
   * @param prizeId 報酬ID
   */
  const update = (index: number, prizeId: PrizeId): void => {
    setCubeTmpState((prevState) => {
      if (prevState[index].set && prevState[index].prizeId !== prizeId)
        return prevState;
      return prevState.map((prevCubeObj, i) => {
        if (prevCubeObj.prizeId === prizeId && prevCubeObj.set)
          return prevCubeObj.copyWith({
            prizeId: "0",
            set: false,
          });
        if (index !== i) return prevCubeObj;
        return prevCubeObj.copyWith({
          prizeId,
          set: true,
        });
      });
    });
  };

  /**
   * 削除
   * @param index 箱庭objインデックス
   * @param prizeId 報酬ID
   */
  const deleteCubeTmp = (index: number, prizeId: PrizeId): void => {
    setCubeTmpState((prevState) => {
      return prevState.map((prevCubeObj, i) => {
        if (index === i)
          return prevCubeObj.copyWith({
            prizeId: "0",
            set: false,
          });
        return prevCubeObj;
      });
    });
  };

  const controller: CubeTmpController = {
    init,
    update,
    deleteCubeTmp,
  };
  return controller;
};

export const useCubeTmpState = (): [CubeTmpState, CubeTmpController] => [
  useCubeTmpValue(),
  useCubeTmpController(),
];
