import communityPassportAbi from "@/artifacts/CommunityPassport.json";
import communityPassportCreaterAbi from "@/artifacts/CommunityPassportCreater.json";
import communityPortalAbi from "@/artifacts/CommunityPortal.json";
import cubeAbi from "@/artifacts/Cube.json";
import questCheckerAbi from "@/artifacts/IQuestChecker.json";
import prizePoapAbi from "@/artifacts/PrizePoap.json";
import questBoardAbi from "@/artifacts/QuestBoard.json";
import questCheckerCreaterAbi from "@/artifacts/QuestCheckerCreater.json";
import questPoapAbi from "@/artifacts/QuestPoap.json";

export const COMMUNITY_PASSPORT_CREATER_ADDRESS = process.env
  .NEXT_PUBLIC_FANBASE_COMUNITY_PASSPORT_CREATER_CONTRACT as string;
export const COMMUNITY_PORTAL_ADDRESS = process.env
  .NEXT_PUBLIC_FANBASE_COMUNITY_PORTAL_CONTRACT as string;
export const QUEST_BOARD_ADDRESS = process.env
  .NEXT_PUBLIC_FANBASE_QUEST_BOARD_CONTRACT as string;
export const QUEST_CHECKER_CREATER_ADDRESS = process.env
  .NEXT_PUBLIC_FANBASE_QUEST_CHECKER_CREATER_CONTRACT as string;
export const PRIZE_POAP_ADDRESS = process.env
  .NEXT_PUBLIC_FANBASE_PRIZE_POAP_CONTRACT as string;
export const CUBE_ADDRESS = process.env
  .NEXT_PUBLIC_FANBASE_CUBE_CONTRACT as string;

export const COMMUNITY_PASSPORT_ABI = communityPassportAbi.abi;
export const COMMUNITY_PASSPORT_CREATER_ABI = communityPassportCreaterAbi.abi;
export const COMMUNITY_PORTAL_ABI = communityPortalAbi.abi;
export const QUEST_CHECKER_ABI = questCheckerAbi.abi;
export const QUEST_BOARD_ABI = questBoardAbi.abi;
export const QUEST_CHECKER_CREATER_ABI = questCheckerCreaterAbi.abi;
export const QUEST_POAP_ABI = questPoapAbi.abi;
export const PRIZE_POAP_ABI = prizePoapAbi.abi;
export const CUBE_ABI = cubeAbi.abi;

export const START_BLOCK_HEIGHT = Number(
  process.env.NEXT_PUBLIC_FANBASE_COMUNITIES_START_BLOCK_HEIGHT,
);
export const MAX_REQ_BLOCK_HEIGHT = Number(
  process.env.NEXT_PUBLIC_FANBASE_MAX_REQ_BLOCK_HEIGHT,
);
