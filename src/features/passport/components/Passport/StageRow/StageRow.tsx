import { NOT_FOUND_VALUE, STAGES } from "@/src/const/passportTable";
import { PassportCell } from "@/src/features/passport/components/Passport/Passport";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";
import uuid from "react-uuid";

export type StageRowProps = {
  currentLv?: number;
} & BaseProps;

/**
 * パスポートテーブル: ステージ行
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param currentLv 現在のレベル
 */
export const StageRow = ({ className, currentLv }: StageRowProps) => {
  const row = _getStageRow();
  const currentStageIndex = _getCurrentStageIndex(row, currentLv);

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
        ステージ
      </th>
      {row.map((cell, index) => {
        return (
          <td
            key={uuid()}
            className={clsx(
              index === currentStageIndex ? "bg-secondary" : "bg-[#000000]",
              "rounded-2xl",
              "text-lg",
              "font-bold",
              "min-w-[150px]",
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

const _getStageRow = (): PassportCell<string>[] => {
  const cells: PassportCell<string>[] = [];
  for (let i = 0; i < STAGES.length; i++) {
    cells.push({
      value: STAGES[i].name,
      colspan: STAGES[i].colspan,
    });
  }
  return cells;
};

const _getCurrentStageIndex = (
  stageRow: PassportCell<string>[],
  currentLv?: number,
) => {
  if (currentLv === undefined || currentLv === NOT_FOUND_VALUE)
    return NOT_FOUND_VALUE;
  let stageNum = 0;
  for (let i = 0; i < stageRow.length; i++) {
    stageNum += stageRow[i].colspan;
    if (stageNum >= currentLv) return i;
  }
  return NOT_FOUND_VALUE;
};
