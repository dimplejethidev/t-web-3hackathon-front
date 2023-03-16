import { NextApiRequest, NextApiResponse } from "next";
import { ServerCommunityPassport } from "@/src/features/passport";
import { RPC_URL } from "@/src/lib/wallet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "POSTのみ受付" });
  try {
    const { communityPassportAddress } = req.body;
    console.log;
    const communityPassport = new ServerCommunityPassport(
      RPC_URL.mumbai,
      communityPassportAddress,
    );
    const fanList = await communityPassport.getAllFanList();
    return res.status(200).json(fanList);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.status(400).json({ message: e.message });
    }
    return res.status(400).json({ message: e });
  }
}
