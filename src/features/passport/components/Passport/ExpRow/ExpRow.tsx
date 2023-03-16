import { MAX_LV } from "@/src/const/passportTable";
import { PassportCell } from "@/src/features/passport/components/Passport/Passport";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";
import uuid from "react-uuid";

const REQUIRED_EXP_K = 100;

export type ExpRowProps = {
  requiredExps: number[];
} & BaseProps;

/**
 * パスポートテーブル: 必要経験値行
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param requiredExps 必要経験値配列
 */
export const ExpRow = ({ className, requiredExps }: ExpRowProps) => {
  const row = _getExpRow(requiredExps);

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
        {"必要\nexp"}
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

const _getExpRow = (requiredExps: number[]): PassportCell<number>[] => {
  const cells: PassportCell<number>[] = [];
  for (let i = 0; i < MAX_LV; i++) {
    cells.push({
      value: requiredExps[i],
      colspan: 1,
    } as PassportCell<number>);
  }
  return cells;
};
