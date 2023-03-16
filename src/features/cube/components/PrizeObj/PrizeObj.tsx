import { PRIZE_OBJ_TYPE } from "@/src/const/cube";
import { Box, Gltf, Triangle, toCubeIndex } from "@/src/features/cube";
import { useCubeTmpController } from "@/src/hooks/useCubeTmp";
import { usePrizeDetailValue } from "@/src/hooks/usePrizeDetail";
import { PrizeDetailModel } from "@/src/models/PrizeDetailModel";
import { clickingCubeObjState } from "@/src/stores/clickingCubeObjState";
import { Position } from "@/src/types/Position";
import { PrizeId } from "@/src/types/PrizeId";
import { Rotation } from "@/src/types/Rotation";
import { isThreeBox, isThreeGltf, isThreeTriangle } from "@/src/util/threeUtil";
import { useSetRecoilState } from "recoil";

export type PrizeObjProps = {
  prizeId: PrizeId;
  position: Position;
  rotation: Rotation;
  type?: PRIZE_OBJ_TYPE;
};

/**
 * 報酬モデル表示
 * @feature
 * @author keit
 * @param prizeId 報酬ID
 * @param position 表示位置
 * @param rotation 表示角度
 * @param type 報酬タイプ
 */
export const PrizeObj = ({
  prizeId,
  position,
  rotation,
  type = PRIZE_OBJ_TYPE.cube,
}: PrizeObjProps) => {
  const prizeDetailState = usePrizeDetailValue();

  const setClickingCubeObj = useSetRecoilState(clickingCubeObjState);
  const cubeTmpController = useCubeTmpController();

  const handlePointerDown = () => {
    setClickingCubeObj(prizeId);
  };

  const handlePointerUp = () => {
    setClickingCubeObj("");
  };

  const handleRightClick = () => {
    setClickingCubeObj("");
    cubeTmpController.deleteCubeTmp(toCubeIndex(position), prizeId);
  };

  return _buildPrizeItem(
    position,
    rotation,
    prizeDetailState.get(prizeId)!,
    handlePointerDown,
    handlePointerUp,
    handleRightClick,
    type,
  );
};

const _buildPrizeItem = (
  position: Position,
  rotation: Rotation,
  prizeDetail: PrizeDetailModel,
  onPointerDown: () => void,
  onPointerUp: () => void,
  onContextMenu: () => void,
  type?: PRIZE_OBJ_TYPE,
) => {
  if (isThreeBox(prizeDetail.attributes))
    return (
      <Box
        position={position}
        rotation={rotation}
        prizeDetail={prizeDetail}
        type={type}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onContextMenu={onContextMenu}
      />
    );
  if (isThreeTriangle(prizeDetail.attributes))
    return (
      <Triangle
        position={position}
        rotation={rotation}
        prizeDetail={prizeDetail}
        type={type}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onContextMenu={onContextMenu}
      />
    );
  if (isThreeGltf(prizeDetail.attributes))
    return (
      <Gltf
        position={position}
        rotation={rotation}
        prizeDetail={prizeDetail}
        type={type}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onContextMenu={onContextMenu}
      />
    );
  return <></>;
};
