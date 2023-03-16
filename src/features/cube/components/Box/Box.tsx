import { useRef } from "react";
import {
  BASE_POSITION,
  BASE_Y,
  BOX_SIZE,
  FLOOR_HEIGHT,
  PRIZE_OBJ_TYPE,
} from "@/src/const/cube";
import { PrizeDetailModel } from "@/src/models/PrizeDetailModel";
import { Position } from "@/src/types/Position";
import { Rotation } from "@/src/types/Rotation";
import { getColor, toRadian } from "@/src/util/threeUtil";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Material, Mesh } from "three";

export type BoxProps = {
  position: Position;
  rotation: Rotation;
  prizeDetail: PrizeDetailModel;
  type?: PRIZE_OBJ_TYPE;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  onContextMenu?: () => void;
};

/**
 * 床
 * @feature
 * @author keit
 * @param position 表示位置
 * @param rotation 表示角度
 * @param prizeDetail 報酬詳細
 * @param type 報酬タイプ
 * @param onPointerDown クリック時処理
 * @param onPointerUp クリック離し時処理
 * @param onContextMenu 右クリック時処理
 */
export const Box = ({
  position,
  rotation,
  prizeDetail,
  type = PRIZE_OBJ_TYPE.cube,
  onPointerDown,
  onPointerUp,
  onContextMenu,
}: BoxProps) => {
  const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);

  useFrame((state, delta) => {
    if (type === PRIZE_OBJ_TYPE.passport) {
      meshRef.current!.rotation.y += delta;
    }
    return;
  });

  const adjPos = _adjustPos(position, type);
  const adjRot = _adjustRot(rotation);
  return (
    <mesh
      ref={meshRef}
      position={[adjPos.x, adjPos.y, adjPos.z]}
      rotation={[adjRot.x, adjRot.y, adjRot.z]}
      onPointerDown={
        type === PRIZE_OBJ_TYPE.passport ? () => {} : onPointerDown
      }
      onPointerUp={type === PRIZE_OBJ_TYPE.passport ? () => {} : onPointerUp}
      onContextMenu={
        type === PRIZE_OBJ_TYPE.passport ? () => {} : onContextMenu
      }
    >
      <boxGeometry args={[BOX_SIZE.x, BOX_SIZE.y, BOX_SIZE.z]} />
      <meshLambertMaterial color={getColor(prizeDetail.attributes)} />
    </mesh>
  );
};

const _adjustPos = (position: Position, type: PRIZE_OBJ_TYPE): Position => {
  if (type === PRIZE_OBJ_TYPE.passport) return { x: 0, y: 0, z: 0 };
  return {
    x: position.x + BASE_POSITION,
    y: position.y + BASE_Y + BOX_SIZE.y / 2 + FLOOR_HEIGHT / 2,
    z: position.z + BASE_POSITION,
  };
};

const _adjustRot = (rotation: Rotation): Position => {
  return {
    x: toRadian(rotation.x),
    y: toRadian(rotation.y),
    z: toRadian(rotation.z),
  };
};
