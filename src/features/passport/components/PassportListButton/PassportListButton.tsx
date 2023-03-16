import { Button } from "@/src/components/elements/Button";
import { usePassportValue } from "@/src/hooks/usePassport";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type PassportListButtonProps = BaseProps;

/**
 * コミュニティプロフィール
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 */
export const PassportListButton = ({ className }: PassportListButtonProps) => {
  const passportMap = usePassportValue();

  return (
    <Button
      variant="gray"
      className={clsx("rounded-full", "text-sm", className)}
    >
      <div
        className={clsx("flex", "items-center", "justify-center", "w-[50px]")}
      >
        <span className={clsx("text-[8px]", "font-thin", "mr-[4px]")}>
          参加者
        </span>
        {passportMap.size}
      </div>
    </Button>
  );
};
