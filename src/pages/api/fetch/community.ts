import { NextApiRequest, NextApiResponse } from "next";
import { ServerCommunityPortal } from "@/src/features/community/api";
import { RPC_URL } from "@/src/lib/wallet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "POSTのみ受付" });
  try {
    const communityPortal = ServerCommunityPortal.instance(RPC_URL.mumbai);
    const communityList = await communityPortal.getAllCommunityList();
    return res.status(200).json(communityList);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.status(400).json({ message: e.message });
    }
    return res.status(400).json({ message: e });
  }
}
