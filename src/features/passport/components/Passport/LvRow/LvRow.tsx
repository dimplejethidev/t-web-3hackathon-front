import { MAX_LV } from "@/src/const/passportTable";
import { PassportCell } from "@/src/features/passport/components/Passport/Passport";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";
import uuid from "react-uuid";

export type LvRowProps = {
  currentLv?: number;
} & BaseProps;

/**
 * パスポートテーブル: レベル行
 * @component
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param currentLv 現在のレベル
 */
export const LvRow = ({ className, currentLv }: LvRowProps) => {
  const row = _getLvRow();
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
        LV.
      </th>
      {row.map((cell, index) => {
        return (
          <td
            key={uuid()}
            className={clsx(
              cell.value === currentLv ? "bg-secondary" : "bg-[#000000]",
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

const _getLvRow = (): PassportCell<number>[] => {
  const cells: PassportCell<number>[] = [];
  for (let i = 0; i < MAX_LV; i++) {
    cells.push({
      value: i + 1,
      colspan: 1,
    });
  }
  return cells;
};
