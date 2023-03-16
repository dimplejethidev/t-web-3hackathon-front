import { Attribute } from "@/src/types/Attribute";
import { Requirements } from "@/src/types/Requirements";

export type QuestJson = {
  questId: string;
  name: string;
  description: string;
  image: string;
  external_url: number;
  attributes: Attribute[];
  requirements: Requirements[];
};
