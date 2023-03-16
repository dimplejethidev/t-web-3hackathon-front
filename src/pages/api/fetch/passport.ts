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
    const { passportAddress } = req.body;
    const communityPassport = new ServerCommunityPassport(
      RPC_URL.mumbai,
      passportAddress,
    );
    const passportList = await communityPassport.getAllPassportList();
    return res.status(200).json(passportList);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.status(400).json({ message: e.message });
    }
    return res.status(400).json({ message: e });
  }
}
