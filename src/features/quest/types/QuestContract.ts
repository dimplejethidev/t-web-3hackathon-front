export type QuestContract = {
  title: string;
  questURI: string;
  questCheckerAddress: string;
  communityId: number;
  obtainableExp: number;
  obtainablePrizeId: number;
  prizeObtainable: boolean;
  closed: boolean;
};
