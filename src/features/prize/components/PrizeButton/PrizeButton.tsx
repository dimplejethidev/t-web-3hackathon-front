import { useState } from "react";
import { Button } from "@/src/components/elements/Button";
import { Spinner } from "@/src/components/elements/Spinner";
import { usePrizeUserController } from "@/src/hooks/usePrizeUser";
import { PrizeModel } from "@/src/models/PrizeModel";
import { PrizeUserModel } from "@/src/models/PrizeUserModel";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type PrizeButtonProps = {
  prize: PrizeModel;
  prizeUser: PrizeUserModel;
} & BaseProps;

/**
 * 報酬ボタン
 * @feature
 * @author keit
 * @param className 親要素から指定されるスタイル
 * @param prize プライズ情報
 * @param prizeUser プライズユーザー情報
 */
export const PrizeButton = ({
  className,
  prize,
  prizeUser,
}: PrizeButtonProps) => {
  const [isClickedObtainButton, setIsClickedObtainButton] = useState(false);
  const prizeUserController = usePrizeUserController();

  const handlePrizeButtonClick = async () => {
    setIsClickedObtainButton((prevState) => true);
    try {
      await prizeUserController.obtain(prize.id);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.log(e);
    }
    setIsClickedObtainButton((prevState) => false);
  };

  return (
    <Button
      disable={
        !prizeUser.obtainable || isClickedObtainButton || prizeUser.obtained
      }
      variant={
        prizeUser.obtained
          ? "gray"
          : prizeUser.obtainable
          ? "secondary"
          : "gray"
      }
      className={clsx(
        "rounded-full",
        "flex",
        "justify-center",
        "items-center",
        className,
      )}
      onClick={handlePrizeButtonClick}
    >
      {prizeUser.obtained ? (
        "OBTAINED"
      ) : isClickedObtainButton ? (
        <Spinner className={clsx("w-[25px]", "h-[25px]", "border-[4px]")} />
      ) : (
        "GET!"
      )}
    </Button>
  );
};
