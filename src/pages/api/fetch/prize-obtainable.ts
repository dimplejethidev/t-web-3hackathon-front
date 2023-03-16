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
    let { userId, prizeIds } = req.body;
    const prizePoap = ServerPrizePoap.instance(RPC_URL.mumbai);
    if (prizeIds === undefined) {
      const prizeListLength = await prizePoap.getPrizeListLength();
      prizeIds = prizePoap.toPrizeIds(prizeListLength);
    }
    const prizeObtainable = await prizePoap.checkBatchObtainable(
      userId,
      prizeIds,
    );
    return res.status(200).json({ prizeObtainable });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.status(400).json({ message: e.message });
    }
    return res.status(400).json({ message: e });
  }
}
