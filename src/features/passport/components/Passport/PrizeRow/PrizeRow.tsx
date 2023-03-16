import { MAX_LV } from "@/src/const/passportTable";
import { PassportCell } from "@/src/features/passport/components/Passport/Passport";
import { Prize } from "@/src/features/prize";
import { usePrizeSelectorCommunityId } from "@/src/hooks/usePrize";
import { usePrizeDetailValue } from "@/src/hooks/usePrizeDetail";
import { usePrizeUserValue } from "@/src/hooks/usePrizeUser";
import { PrizeModel } from "@/src/models/PrizeModel";
import { PrizeDetailState } from "@/src/stores/prizeDetailState";
import { PrizeUserState } from "@/src/stores/prizeUserState";
import { BaseProps } from "@/src/types/BaseProps";
import { CommunityId } from "@/src/types/CommunityId";
import clsx from "clsx";
import uuid from "react-uuid";

export type PrizeRowProps = {
  communityId: CommunityId;
  requiredExps: number[];
} & BaseProps;

/**
 * パスポートテーブル: ステージ行
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param communityId コミュニティID
 * @param requiredExps 必要経験値配列
 */
export const PrizeRow = ({
  className,
  communityId,
  requiredExps,
}: PrizeRowProps) => {
  const prizeList = usePrizeSelectorCommunityId(communityId);
  const prizeUserState = usePrizeUserValue();
  const prizeDetailState = usePrizeDetailValue();
  const row = _getPrizeRow(
    requiredExps,
    prizeList,
    prizeUserState,
    prizeDetailState,
  );

  return (
    <tr className={clsx(className)}>
      <th
        className={clsx(
          "bg-black-700",
          "rounded-2xl",
          "font-bold",
          "py-2",
          "min-w-[70px]",
          "whitespace-pre-wrap",
        )}
      >
        報酬
      </th>
      {row.map((cell, index) => {
        return (
          <td
            key={uuid()}
            className={clsx(
              "bg-[#000000]",
              "rounded-2xl",
              "text-lg",
              "font-bold",
              "min-w-[150px]",
              "min-h-[270px]",
              "text-center",
              "py-2",
              "whitespace-pre-wrap",
            )}
            colSpan={cell.colspan}
          >
            {cell.value}
          </td>
        );
      })}
    </tr>
  );
};

const _getPrizeRow = (
  requiredExps: number[],
  prizeList: PrizeModel[],
  prizeUserState: PrizeUserState,
  prizeDetailState: PrizeDetailState,
): PassportCell<JSX.Element>[] => {
  const plSortByRequiredExp = prizeList.map((prize) => prize);
  plSortByRequiredExp.sort((a, b) => a.requiredExp - b.requiredExp);
  const cells: PassportCell<JSX.Element>[] = [];
  let cnt = 0;
  for (let i = 0; i < MAX_LV; i++) {
    if (plSortByRequiredExp[cnt].questRequired) {
      cnt++;
      i--;
      continue;
    }
    if (plSortByRequiredExp[cnt].requiredExp <= requiredExps[i]) {
      const prizeId = plSortByRequiredExp[cnt].id;
      cells.push({
        value: (
          <Prize
            prize={plSortByRequiredExp[cnt]}
            prizeUser={prizeUserState.get(prizeId)!}
            prizeDetail={prizeDetailState.get(prizeId)!}
          />
        ),
        colspan: 1,
      });
      cnt++;
      continue;
    }
    cells.push({
      value: <></>,
      colspan: 1,
    });
  }
  return cells;
};
