import { CubeObj } from "@/src/features/cube/components/CubeObj";
import { usePrizeListValue } from "@/src/hooks/usePrize";
import { usePrizeDetailObtained } from "@/src/hooks/usePrizeDetail";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type CubeEditorProps = BaseProps;

/**
 * 箱庭エディター
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 */
export const CubeEditor = ({ className }: CubeEditorProps) => {
  const prizeList = usePrizeListValue();
  const prizeDetailList = usePrizeDetailObtained();

  if (prizeDetailList.length === 0) return <></>;
  return (
    <div
      className={clsx(
        "w-[100%]",
        "flex",
        "justify-center",
        "items-center",
        className,
      )}
    >
      <div
        className={clsx(
          "min-w-[90%]",
          "w-[90%]",
          "overflow-x-scroll",
          "scrollbar-thin",
          "scrollbar-thumb-secondary",
          "scrollbar-track-[#000000]",
          "scrollbar-thumb-rounded-full",
          "scrollbar-track-rounded-full",
          "pb-[20px]",
          "flex",
          "bg-black-900",
          "rounded-2xl",
        )}
      >
        {prizeDetailList.map((prizeDetail, index) => {
          const prizeId = Number(prizeDetail.prizeId);
          const prize = prizeList[prizeId];
          return (
            <CubeObj
              key={index}
              className={clsx("mx-[20px]", "mt-[20px]")}
              prize={prize}
              prizeDetail={prizeDetail}
            />
          );
        })}
      </div>
    </div>
  );
};
