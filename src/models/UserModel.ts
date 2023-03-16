import { ObjectCopier } from "@/src/models/ObjectCopier";
import { Linkage } from "@/src/types/Linkage";

export class UserModel extends ObjectCopier {
  constructor(
    public readonly id: string = "",
    public readonly linkages: Linkage = {
      twitter: "",
      discord: "",
      line: "",
    },
  ) {
    super();
  }
}
