import { Position } from "@/src/types/Position";
import { PrizeId } from "@/src/types/PrizeId";
import { Rotation } from "@/src/types/Rotation";

export enum PRIZE_OBJ_TYPE {
  passport,
  cube,
  none,
}

export enum FLOOR_TYPE {
  mybase,
  cube,
  none,
}

export const BASE_Y = 0;
export const BASE_POSITION = -5;
export const FLOOR_SIZE = 10;
export const MAX_ZOOM = 40;
export const BOX_SIZE = {
  x: 1,
  y: 1,
  z: 1,
};
export const FLOOR_HEIGHT = 0.2;
export const ERROR = -1;

export const CUBE_POSITION_MAP = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 2, y: 0, z: 0 },
  { x: 3, y: 0, z: 0 },
  { x: 4, y: 0, z: 0 },
  { x: 5, y: 0, z: 0 },
  { x: 6, y: 0, z: 0 },
  { x: 7, y: 0, z: 0 },
  { x: 8, y: 0, z: 0 },
  { x: 9, y: 0, z: 0 },

  { x: 0, y: 0, z: 1 },
  { x: 1, y: 0, z: 1 },
  { x: 2, y: 0, z: 1 },
  { x: 3, y: 0, z: 1 },
  { x: 4, y: 0, z: 1 },
  { x: 5, y: 0, z: 1 },
  { x: 6, y: 0, z: 1 },
  { x: 7, y: 0, z: 1 },
  { x: 8, y: 0, z: 1 },
  { x: 9, y: 0, z: 1 },

  { x: 0, y: 0, z: 2 },
  { x: 1, y: 0, z: 2 },
  { x: 2, y: 0, z: 2 },
  { x: 3, y: 0, z: 2 },
  { x: 4, y: 0, z: 2 },
  { x: 5, y: 0, z: 2 },
  { x: 6, y: 0, z: 2 },
  { x: 7, y: 0, z: 2 },
  { x: 8, y: 0, z: 2 },
  { x: 9, y: 0, z: 2 },

  { x: 0, y: 0, z: 3 },
  { x: 1, y: 0, z: 3 },
  { x: 2, y: 0, z: 3 },
  { x: 3, y: 0, z: 3 },
  { x: 4, y: 0, z: 3 },
  { x: 5, y: 0, z: 3 },
  { x: 6, y: 0, z: 3 },
  { x: 7, y: 0, z: 3 },
  { x: 8, y: 0, z: 3 },
  { x: 9, y: 0, z: 3 },

  { x: 0, y: 0, z: 4 },
  { x: 1, y: 0, z: 4 },
  { x: 2, y: 0, z: 4 },
  { x: 3, y: 0, z: 4 },
  { x: 4, y: 0, z: 4 },
  { x: 5, y: 0, z: 4 },
  { x: 6, y: 0, z: 4 },
  { x: 7, y: 0, z: 4 },
  { x: 8, y: 0, z: 4 },
  { x: 9, y: 0, z: 4 },

  { x: 0, y: 0, z: 5 },
  { x: 1, y: 0, z: 5 },
  { x: 2, y: 0, z: 5 },
  { x: 3, y: 0, z: 5 },
  { x: 4, y: 0, z: 5 },
  { x: 5, y: 0, z: 5 },
  { x: 6, y: 0, z: 5 },
  { x: 7, y: 0, z: 5 },
  { x: 8, y: 0, z: 5 },
  { x: 9, y: 0, z: 5 },

  { x: 0, y: 0, z: 6 },
  { x: 1, y: 0, z: 6 },
  { x: 2, y: 0, z: 6 },
  { x: 3, y: 0, z: 6 },
  { x: 4, y: 0, z: 6 },
  { x: 5, y: 0, z: 6 },
  { x: 6, y: 0, z: 6 },
  { x: 7, y: 0, z: 6 },
  { x: 8, y: 0, z: 6 },
  { x: 9, y: 0, z: 6 },

  { x: 0, y: 0, z: 7 },
  { x: 1, y: 0, z: 7 },
  { x: 2, y: 0, z: 7 },
  { x: 3, y: 0, z: 7 },
  { x: 4, y: 0, z: 7 },
  { x: 5, y: 0, z: 7 },
  { x: 6, y: 0, z: 7 },
  { x: 7, y: 0, z: 7 },
  { x: 8, y: 0, z: 7 },
  { x: 9, y: 0, z: 7 },

  { x: 0, y: 0, z: 8 },
  { x: 1, y: 0, z: 8 },
  { x: 2, y: 0, z: 8 },
  { x: 3, y: 0, z: 8 },
  { x: 4, y: 0, z: 8 },
  { x: 5, y: 0, z: 8 },
  { x: 6, y: 0, z: 8 },
  { x: 7, y: 0, z: 8 },
  { x: 8, y: 0, z: 8 },
  { x: 9, y: 0, z: 8 },

  { x: 0, y: 0, z: 9 },
  { x: 1, y: 0, z: 9 },
  { x: 2, y: 0, z: 9 },
  { x: 3, y: 0, z: 9 },
  { x: 4, y: 0, z: 9 },
  { x: 5, y: 0, z: 9 },
  { x: 6, y: 0, z: 9 },
  { x: 7, y: 0, z: 9 },
  { x: 8, y: 0, z: 9 },
  { x: 9, y: 0, z: 9 },
];

export type PosRot = {
  position: Position;
  rotation: Rotation;
};

export const GLTF_POSITION_ROTATION_MAP = new Map<PrizeId, PosRot>([
  ["0", { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 180, z: 0 } }],
  ["1", { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 180, z: 0 } }],
  ["2", { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 180, z: 0 } }],
  ["3", { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }],
  ["4", { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 180, z: 0 } }],
  ["5", { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 180, z: 0 } }],
]);

export const GLTF_POSITION_ROTATION_MAP_FOR_PASSPORT = new Map<PrizeId, PosRot>(
  [
    [
      "0",
      { position: { x: 0, y: -0.25, z: 0 }, rotation: { x: 0, y: 180, z: 0 } },
    ],
    [
      "1",
      { position: { x: 0, y: -0.25, z: 0 }, rotation: { x: 0, y: 180, z: 0 } },
    ],
    [
      "2",
      { position: { x: 0, y: -0.25, z: 0 }, rotation: { x: 0, y: 180, z: 0 } },
    ],
    [
      "3",
      { position: { x: 0, y: -0.5, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
    ],
    [
      "4",
      { position: { x: 0, y: -0.25, z: 0 }, rotation: { x: 0, y: 180, z: 0 } },
    ],
    [
      "5",
      { position: { x: 0, y: -0.25, z: 0 }, rotation: { x: 0, y: 180, z: 0 } },
    ],
  ],
);
