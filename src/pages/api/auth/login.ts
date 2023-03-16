import { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "@/src/lib/firebase/server";
import { Verification } from "@/src/lib/verification";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "POSTのみ受付" });
  try {
    const { message, address: expected, signature } = req.body;
    const verification = Verification.instance();
    if (!verification.isCorrectSign(message, expected, signature))
      return res.status(400).json({ message: "検証失敗。" });
    const auth = Auth.instance();
    const customToken = await auth.createCustomToken(expected);
    return res.status(200).json({ token: customToken });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.status(400).json({ message: e.message });
    }
    return res.status(400).json({ message: e });
  }
}
