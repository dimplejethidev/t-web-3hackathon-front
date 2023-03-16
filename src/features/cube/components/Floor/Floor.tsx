import { FLOOR_TYPE } from "@/src/const/cube";
import { FloorSingle } from "@/src/features/cube";
import { Position } from "@/src/types/Position";

export type FloorProps = {
  type?: FLOOR_TYPE;
};

/**
 * 床
 * @feature
 * @author keit
 * @param type フロアタイプ
 */
export const Floor = ({ type = FLOOR_TYPE.mybase }: FloorProps) => {
  const positions = _getPositions();
  return (
    <>
      {positions.map((position, index) => (
        <FloorSingle key={index} position={position} type={type} />
      ))}
    </>
  );
};

const _getPositions = () => {
  const positions: Position[] = [];
  for (let z = 0; z < 10; z++) {
    for (let x = 0; x < 10; x++) {
      positions.push({ x, y: 0, z });
    }
  }
  return positions;
};
