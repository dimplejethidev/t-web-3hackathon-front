import { NextApiRequest, NextApiResponse } from "next";
import { FIRESTORE_NOT_FOUND_DOC } from "@/src/const/errormessage";
import { FireStore } from "@/src/lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "POSTのみ受付" });
  const db = FireStore.instance();
  try {
    const { blockheight: newBlockheight, passportContractAddress } = req.body;
    const oldBlockheight = await db.getBlockHeight(passportContractAddress);
    if (newBlockheight <= oldBlockheight)
      return res
        .status(200)
        .json({ message: "ブロック高さを更新する必要はありません。" });
    await db.updateBlockHeight(passportContractAddress, newBlockheight);
    return res.status(200).json({ message: "ブロック高さを更新しました。" });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      if (e.message !== FIRESTORE_NOT_FOUND_DOC)
        return res.status(400).json({ message: e.message });
      const { blockheight: newBlockheight, passportContractAddress } = req.body;
      try {
        await db.addBlockHeight(passportContractAddress, newBlockheight);
        return res
          .status(200)
          .json({ message: "ブロック高さを更新しました。" });
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
          return res.status(400).json({ message: e.message });
        }
        return res.status(400).json({ message: e });
      }
    }
    return res.status(400).json({ message: e });
  }
}
