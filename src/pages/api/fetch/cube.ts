import { NextApiRequest, NextApiResponse } from "next";
import { ServerCube } from "@/src/features/cube";
import { RPC_URL } from "@/src/lib/wallet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "POSTのみ受付" });
  try {
    const { userId } = req.body;
    const cube = ServerCube.instance(RPC_URL.mumbai);
    const cubeXZ = await cube.getCube(userId);
    return res.status(200).json({ cubeXZ });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.status(400).json({ message: e.message });
    }
    return res.status(400).json({ message: e });
  }
}
