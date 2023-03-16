import { PrizeDetailModel } from "@/src/models/PrizeDetailModel";
import { Attribute } from "@/src/types/Attribute";

export const THREE_SQUARE = "cube";
export const THREE_TRIANGLE = "triangle";
export const THREE_GLTF = "gltf";

export type CubePosition = {
  x: number;
  y: number;
  z: number;
};

export type CubeObj = {
  detail: PrizeDetailModel;
  position: CubePosition;
};

export const isThreeBox = (attributes: Attribute[]): boolean => {
  return attributes.some((attribute) => attribute.value === THREE_SQUARE);
};

export const isThreeTriangle = (attributes: Attribute[]): boolean => {
  return attributes.some((attribute) => attribute.value === THREE_TRIANGLE);
};

export const isThreeGltf = (attributes: Attribute[]): boolean => {
  return attributes.some((attribute) => attribute.value === THREE_GLTF);
};

export const getColor = (attributes: Attribute[]) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].trait_type !== "color") continue;
    return attributes[i].value;
  }
  return "#FFFFFF";
};

export const toRadian = (angle: number) => (Math.PI / 180) * angle;

export const getCameraDistance = (height: number, fov: number) =>
  height / 2 / Math.tan(toRadian(fov));
