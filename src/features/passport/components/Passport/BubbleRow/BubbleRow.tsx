import { MAX_LV } from "@/src/const/passportTable";
import { PassportCell } from "@/src/features/passport/components/Passport/Passport";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";
import uuid from "react-uuid";

export type BubbleRowProps = {
  currentExp?: number;
  requiredExps: number[];
} & BaseProps;

/**
 * パスポートテーブル: 吹き出し行
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param currentExp 取得済みの経験値量
 * @param requiredExps 必要経験値配列
 */
export const BubbleRow = ({
  className,
  currentExp,
  requiredExps,
}: BubbleRowProps) => {
  if (currentExp === undefined) currentExp = -1;
  const row = _getBubbleRow(currentExp, requiredExps);

  return (
    <tr className={clsx(className)}>
      <th></th>
      {row.map((cell) => {
        return (
          <td
            key={uuid()}
            className={
              cell.value === ""
                ? undefined
                : clsx(
                    "relative",
                    "bg-secondary",
                    "py-2",
                    "rounded-full",
                    "text-center",
                    "text-lg",
                    "font-bold",
                    "before:content-['']",
                    "before:absolute",
                    "before:-translate-x-1/2",
                    "before:left-1/2",
                    "before:top-full",
                    "before:border-8",
                    "before:border-transparent",
                    "before:border-t-secondary",
                  )
            }
            colSpan={cell.colspan}
          >
            {cell.value}
          </td>
        );
      })}
    </tr>
  );
};

const _getBubbleRow = (
  currentExp: number,
  requiredExps: number[],
): PassportCell<string>[] => {
  const cells: PassportCell<string>[] = [];
  if (currentExp === -1) {
    for (let i = 0; i < MAX_LV; i++) {
      cells.push({
        value: "",
        colspan: 1,
      });
    }
    return cells;
  }
  const nowText = "現在";
  const nextText = (currentExp: number, requiredExp: number) =>
    `あと${requiredExp - currentExp}exp`;
  let isAlreadySetText = false;
  for (let i = 1; i < MAX_LV; i++) {
    if (requiredExps[i] > currentExp && !isAlreadySetText) {
      cells.push({
        value: nowText,
        colspan: 1,
      });
      cells.push({
        value: nextText(currentExp, requiredExps[i]),
        colspan: 1,
      });
      isAlreadySetText = true;
      continue;
    }
    cells.push({
      value: "",
      colspan: 1,
    });
  }
  if (!isAlreadySetText) {
    cells.push({
      value: nowText,
      colspan: 1,
    });
  }
  return cells;
};
