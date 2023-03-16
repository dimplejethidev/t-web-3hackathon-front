import { NextApiRequest, NextApiResponse } from "next";
import { ServerPrizePoap } from "@/src/features/prize/api";
import { RPC_URL } from "@/src/lib/wallet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "POSTのみ受付" });
  try {
    const prizePoap = ServerPrizePoap.instance(RPC_URL.mumbai);
    const prizeList = await prizePoap.getAllPrizeList();
    return res.status(200).json({ prizeList });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.status(400).json({ message: e.message });
    }
    return res.status(400).json({ message: e });
  }
}
