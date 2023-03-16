import { CUBE_POSITION_MAP, ERROR, FLOOR_SIZE } from "@/src/const/cube";
import { Position } from "@/src/types/Position";

export const toCubeIndex = (position: Position): number => {
  let cnt = 0;
  for (let z = 0; z < FLOOR_SIZE; z++) {
    for (let x = 0; x < FLOOR_SIZE; x++) {
      if (isEqualPosition(position, { x, y: 0, z })) return cnt;
      cnt++;
    }
  }
  return ERROR;
};

export const toCubePosition = (index: number): Position =>
  CUBE_POSITION_MAP[index];

export const isEqualPosition = (a: Position, b: Position) =>
  a.x == b.x && a.y == b.y && a.z == b.z;
