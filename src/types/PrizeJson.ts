import { Attribute } from "@/src/types/Attribute";

export type PrizeJson = {
  questId: string;
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Attribute[];
};
