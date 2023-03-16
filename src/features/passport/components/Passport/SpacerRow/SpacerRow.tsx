import { MAX_LV } from "@/src/const/passportTable";
import { PassportCell } from "@/src/features/passport/components/Passport/Passport";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";
import uuid from "react-uuid";

export type SpacerRowProps = BaseProps;

/**
 * パスポートテーブル: 吹き出し行下の余白行
 * @component
 * @author keit
 * @param className 親要素から指定されたスタイル
 */
export const SpacerRow = ({ className }: SpacerRowProps) => {
  const row = _getSpacerRow();

  return (
    <tr className={clsx(className)}>
      <th></th>
      {row.map((cell) => {
        return (
          <td key={uuid()} colSpan={cell.colspan}>
            {cell.value}
          </td>
        );
      })}
    </tr>
  );
};

const _getSpacerRow = (): PassportCell<string>[] => {
  const cells: PassportCell<string>[] = [];
  for (let i = 0; i < MAX_LV; i++) {
    cells.push({
      value: "",
      colspan: 1,
    });
  }
  return cells;
};
