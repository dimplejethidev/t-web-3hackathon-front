import { Suspense, useRef } from "react";
import {
  BASE_POSITION,
  BASE_Y,
  FLOOR_HEIGHT,
  GLTF_POSITION_ROTATION_MAP,
  GLTF_POSITION_ROTATION_MAP_FOR_PASSPORT,
  PRIZE_OBJ_TYPE,
} from "@/src/const/cube";
import { PrizeDetailModel } from "@/src/models/PrizeDetailModel";
import { Position } from "@/src/types/Position";
import { PrizeId } from "@/src/types/PrizeId";
import { Rotation } from "@/src/types/Rotation";
import { toRadian } from "@/src/util/threeUtil";
import { Clone } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { BufferGeometry, Material, Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export type GltfProps = {
  position: Position;
  rotation: Rotation;
  prizeDetail: PrizeDetailModel;
  type?: PRIZE_OBJ_TYPE;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  onContextMenu?: () => void;
};

/**
 * GLTF表示
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
export const Gltf = ({
  position,
  rotation,
  prizeDetail,
  type = PRIZE_OBJ_TYPE.cube,
  onPointerDown,
  onPointerUp,
  onContextMenu,
}: GltfProps) => {
  const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
  const gltf = useLoader(GLTFLoader, prizeDetail.image);

  useFrame((state, delta) => {
    if (type === PRIZE_OBJ_TYPE.passport) {
      meshRef.current!.rotation.y += delta;
    }
    return;
  });

  const adjPos = _adjustPos(prizeDetail.prizeId, position, type);
  const adjRot = _adjustRot(prizeDetail.prizeId, rotation, type);
  return (
    <mesh
      ref={meshRef}
      position={[adjPos.x, adjPos.y, adjPos.z]}
      rotation={[adjRot.x, adjRot.y, adjRot.z]}
      scale={[0.5, 0.5, 0.5]}
      onPointerDown={
        type === PRIZE_OBJ_TYPE.passport ? () => {} : onPointerDown
      }
      onPointerUp={type === PRIZE_OBJ_TYPE.passport ? () => {} : onPointerUp}
      onContextMenu={
        type === PRIZE_OBJ_TYPE.passport ? () => {} : onContextMenu
      }
    >
      <Suspense fallback={null}>
        <Clone object={gltf.scene} />
      </Suspense>
    </mesh>
  );
};

const _adjustPos = (
  prizeId: PrizeId,
  position: Position,
  type: PRIZE_OBJ_TYPE,
): Position => {
  if (type === PRIZE_OBJ_TYPE.passport) {
    const prPass = GLTF_POSITION_ROTATION_MAP_FOR_PASSPORT.get(prizeId);
    const prPosPass: Position =
      prPass === undefined ? { x: 0, y: 0, z: 0 } : prPass.position;
    return { x: prPosPass.x, y: prPosPass.y, z: prPosPass.z };
  }
  const pr = GLTF_POSITION_ROTATION_MAP.get(prizeId);
  const prPos: Position = pr === undefined ? { x: 0, y: 0, z: 0 } : pr.position;
  return {
    x: position.x + BASE_POSITION + prPos.x,
    y: position.y + BASE_Y + FLOOR_HEIGHT / 2 + prPos.y,
    z: position.z + BASE_POSITION + prPos.z,
  };
};

const _adjustRot = (
  prizeId: PrizeId,
  rotation: Rotation,
  type: PRIZE_OBJ_TYPE,
): Position => {
  if (type === PRIZE_OBJ_TYPE.passport) {
    const prPass = GLTF_POSITION_ROTATION_MAP_FOR_PASSPORT.get(prizeId);
    const prRotPass: Rotation =
      prPass === undefined ? { x: 0, y: 0, z: 0 } : prPass.rotation;
    return { x: prRotPass.x, y: prRotPass.y, z: prRotPass.z };
  }
  const pr = GLTF_POSITION_ROTATION_MAP.get(prizeId);
  const prRot: Position = pr === undefined ? { x: 0, y: 0, z: 0 } : pr.rotation;
  return {
    x: toRadian(rotation.x + prRot.x),
    y: toRadian(rotation.y + prRot.y),
    z: toRadian(rotation.z + prRot.z),
  };
};
