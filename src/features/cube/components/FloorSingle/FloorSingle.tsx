import { useState } from "react";
import {
  BASE_POSITION,
  BASE_Y,
  FLOOR_HEIGHT,
  FLOOR_TYPE,
} from "@/src/const/cube";
import { toCubeIndex } from "@/src/features/cube/api";
import { useCubeTmpController } from "@/src/hooks/useCubeTmp";
import { CubeModel } from "@/src/models/CubeModel";
import { clickingCubeObjState } from "@/src/stores/clickingCubeObjState";
import { floorHoveredState } from "@/src/stores/floorHoveredState";
import { Position } from "@/src/types/Position";
import { layoutEffectOfSSR } from "@/src/util/layoutEffectOfSSR";
import { Edges } from "@react-three/drei";
import { useRecoilState, useRecoilValue } from "recoil";

const COLOR = {
  primary: 0xea4e1f,
  gray: 0x6b6d71,
  black: 0x1c1c1c,
};

export type FloorSingleProps = {
  position: Position;
  type?: FLOOR_TYPE;
};

/**
 * 床
 * @feature
 * @author keit
 * @param position 位置xyz
 * @param type フロアタイプ
 */
export const FloorSingle = ({
  position,
  type = FLOOR_TYPE.mybase,
}: FloorSingleProps) => {
  const clickingCubeObj = useRecoilValue(clickingCubeObjState);
  const [hovered, setHover] = useState(false);
  const [floorHovered, setFloorHovered] = useRecoilState(floorHoveredState);
  const cubeTmpController = useCubeTmpController();
  const useLayoutEffectOfSSR = layoutEffectOfSSR();

  const handlePointerOver = () => {
    setFloorHovered((prevState) => [...prevState, position]);
  };

  const handlePointerOut = () => {
    setFloorHovered((prevState) =>
      prevState.filter(
        (prevPosition) => !CubeModel.isEqualPosition(position, prevPosition),
      ),
    );
  };

  useLayoutEffectOfSSR(() => {
    if (floorHovered.length === 0) {
      setHover(false);
      return;
    }
    if (!CubeModel.isEqualPosition(position, floorHovered[0])) {
      setHover(false);
      return;
    }
    setHover(true);
  }, [floorHovered]);

  useLayoutEffectOfSSR(() => {
    if (clickingCubeObj === "" || !hovered) return;
    const index = toCubeIndex(position);
    cubeTmpController.update(index, clickingCubeObj);
  }, [hovered]);

  return (
    <mesh
      position={[
        position.x + BASE_POSITION,
        position.y + BASE_Y,
        position.z + BASE_POSITION,
      ]}
      onPointerOver={type === FLOOR_TYPE.mybase ? () => {} : handlePointerOver}
      onPointerOut={type === FLOOR_TYPE.mybase ? () => {} : handlePointerOut}
    >
      <boxGeometry args={[1, FLOOR_HEIGHT, 1]} />
      <meshLambertMaterial color={hovered ? COLOR.primary : COLOR.gray} />
      <Edges color={COLOR.black} />
    </mesh>
  );
};
