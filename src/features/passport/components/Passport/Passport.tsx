import {
  MAX_LV,
  NOT_FOUND_VALUE,
  REQUIRED_EXP_K,
} from "@/src/const/passportTable";
import { ExpRow, PrizeRow, StageRow } from "@/src/features/passport";
import { BubbleRow } from "@/src/features/passport/components/Passport/BubbleRow";
import { LvRow } from "@/src/features/passport/components/Passport/LvRow";
import { SpacerRow } from "@/src/features/passport/components/Passport/SpacerRow";
import { usePassportValue } from "@/src/hooks/usePassport";
import { useUserValue } from "@/src/hooks/useUser";
import { PassportModel } from "@/src/models/PassportModel";
import { BaseProps } from "@/src/types/BaseProps";
import { CommunityId } from "@/src/types/CommunityId";
import clsx from "clsx";

export type PassportCell<T> = {
  value: T;
  colspan: number;
};

export type PassportProps = {
  communityId: CommunityId;
} & BaseProps;

/**
 * パスポート
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param communityId コミュニティID
 */
export const Passport = ({ className, communityId }: PassportProps) => {
  const passportState = usePassportValue();
  const user = useUserValue();

  const currentExp = _getCurrentExp(passportState.get(user.id));
  const requiredExps = _getRequiredExps();
  const currentLv = _getCurrentLv(currentExp, requiredExps);

  return (
    <div className={clsx("w-[100%]", className)}>
      <div
        className={clsx(
          "overflow-x-scroll",
          "scrollbar",
          "scrollbar-thumb-secondary",
          "scrollbar-track-[#000000]",
          "scrollbar-thumb-rounded-full",
          "scrollbar-track-rounded-full",
          "pb-[20px]",
        )}
      >
        <table className={clsx("border-separate", "border-spacing-2")}>
          <tbody>
            <BubbleRow currentExp={currentExp} requiredExps={requiredExps} />
            <SpacerRow />
            <LvRow currentLv={currentLv} />
            <ExpRow requiredExps={requiredExps} />
            <StageRow currentLv={currentLv} />
            <PrizeRow communityId={communityId} requiredExps={requiredExps} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const _getRequiredExps = (): number[] => {
  const calcExp = (x: number) => REQUIRED_EXP_K * x * x;
  const requiredExps: number[] = [];
  for (let i = 0; i < MAX_LV; i++) {
    requiredExps.push(calcExp(i));
  }
  return requiredExps;
};

const _getCurrentExp = (passport?: PassportModel) => {
  if (passport !== undefined) return passport.exp;
  return NOT_FOUND_VALUE;
};

const _getCurrentLv = (currentExp: number, requiredExps: number[]) => {
  if (currentExp === NOT_FOUND_VALUE) return NOT_FOUND_VALUE;
  for (let i = 0; i < requiredExps.length; i++) {
    if (requiredExps[i] > currentExp) return i;
  }
  return MAX_LV;
};
