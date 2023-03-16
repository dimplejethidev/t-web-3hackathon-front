import { useEffect, useRef, useState } from "react";
import { Button } from "@/src/components/elements/Button";
import { Image } from "@/src/components/elements/Image";
import { Spinner } from "@/src/components/elements/Spinner";
import { usePassportController } from "@/src/hooks/usePassport";
import { usePrizeUserController } from "@/src/hooks/usePrizeUser";
import { useQuestUserController } from "@/src/hooks/useQuestUser";
import { useUserValue } from "@/src/hooks/useUser";
import { CommunityModel } from "@/src/models/CommunityModel";
import { PrizeModel } from "@/src/models/PrizeModel";
import { QuestModel } from "@/src/models/QuestModel";
import { QuestUserModel } from "@/src/models/QuestUserModel";
import { loadingPassportState } from "@/src/stores/loadingPassportState";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

export type QuestButtonProps = {
  quest: QuestModel;
  questUser: QuestUserModel;
  community: CommunityModel;
  prizeList: PrizeModel[];
  onClick?: (e?: MouseEvent) => void;
} & BaseProps;

/**
 * クエストボタン
 * @feature
 * @author keit
 * @param className 親要素から指定されるスタイル
 * @param quest クエスト情報
 * @param questUser クエストユーザー情報
 * @param community コミュニティ情報
 * @param prizeList プライズ配列
 * @param onClick クリック時の処理
 */
export const QuestButton = ({
  className,
  quest,
  questUser,
  community,
  prizeList,
  onClick,
}: QuestButtonProps) => {
  const claimRef = useRef<HTMLButtonElement>(null);
  const user = useUserValue();
  const passportController = usePassportController();
  const questUserController = useQuestUserController();
  const prizeUserController = usePrizeUserController();
  const [clickingQuestButton, setClickingQuestButton] = useState(false);
  const [isClickedClaimButton, setIsClickedClaimButton] = useState(false);
  const loadingCommunityPassportMap = useRecoilValue(loadingPassportState);

  const handlePointerDownQuestButton = (e: MouseEvent) => {
    setClickingQuestButton(true);
  };

  const handlePointerUpQuestButton = (e: MouseEvent) => {
    setClickingQuestButton(false);
  };

  const handlePointerCancelQuestButton = (e: MouseEvent) => {
    setClickingQuestButton(false);
  };

  const handleClaimButtonClick = async () => {
    setIsClickedClaimButton((prevState) => true);
    try {
      await questUserController.claim(quest.id);
      await prizeUserController.updateObtainState(user.id, prizeList);
      passportController.addExp(
        community.id,
        community.passport,
        user.id,
        quest.exp,
      );
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.log(e);
    }
    setIsClickedClaimButton((prevState) => false);
  };

  useEffect(() => {
    const el = claimRef.current;
    if (!el) return;
    el.addEventListener("pointerdown", handlePointerDownQuestButton);
    el.addEventListener("pointerup", handlePointerUpQuestButton);
    el.addEventListener("pointercancel", handlePointerCancelQuestButton);
    return () => {
      el.removeEventListener("pointerdown", handlePointerDownQuestButton);
      el.removeEventListener("pointerup", handlePointerUpQuestButton);
      el.removeEventListener("pointercancel", handlePointerCancelQuestButton);
    };
  }, []);

  return (
    <div
      className={clsx(
        "rounded-2xl",
        "flex",
        "flex-col",
        "justify-between",
        "relative",
        className,
      )}
    >
      <Image
        className={clsx(
          "rounded-full",
          "w-[50px]",
          "h-[50px]",
          "absolute",
          clickingQuestButton ? "top-[22px]" : "top-[16px]",
          clickingQuestButton ? "right-[10px]" : "right-[16px]",
        )}
        src={community.icon}
        alt="communityIcon"
        width={50}
        height={50}
      />
      <Button
        buttonRef={claimRef}
        className={clsx("rounded-2xl", "min-h-[240px]", "flex")}
        variant="trueblack"
        type="box"
        onClick={onClick}
      >
        <div className={clsx()}>
          <div className={clsx("flex", "flex-col", "justify-between", "my-4")}>
            <div
              className={clsx(
                "text-sm",
                "text-black-600",
                "font-bold",
                "text-start",
              )}
            >
              クエスト内容
            </div>
            <div
              className={clsx(
                "font-bold",
                "text-lg",
                "line-clamp-1",
                "text-start",
                "mr-[50px]",
              )}
            >
              {quest.title}
            </div>
          </div>
          <div className={clsx("flex", "flex-col", "my-4")}>
            <div
              className={clsx(
                "text-sm",
                "text-black-600",
                "text-start",
                "font-bold",
              )}
            >
              報酬
            </div>
            <div
              className={clsx(
                "font-bold",
                "text-lg",
                "text-primary",
                "line-clamp-1",
                "text-start",
                "w-[200px]",
              )}
            >
              {quest.exp.toString()} exp
            </div>
          </div>
        </div>
      </Button>
      <Button
        disable={
          !questUser.claimable ||
          isClickedClaimButton ||
          questUser.claimed ||
          loadingCommunityPassportMap
        }
        variant={
          questUser.claimed
            ? "primary"
            : questUser.claimable
            ? "secondary"
            : "gray"
        }
        className={clsx(
          "rounded-full",
          "absolute",
          "h-[40px]",
          clickingQuestButton ? "bottom-[34px]" : "bottom-[40px]",
          clickingQuestButton ? "left-[26px]" : "left-[20px]",
          clickingQuestButton ? "right-[20px]" : "right-[26px]",
          "flex",
          "justify-center",
          "items-center",
        )}
        onClick={handleClaimButtonClick}
      >
        {questUser.claimed ? (
          "COMPLETED"
        ) : isClickedClaimButton || loadingCommunityPassportMap ? (
          <Spinner className={clsx("w-[25px]", "h-[25px]", "border-[4px]")} />
        ) : (
          "CLAIM"
        )}
      </Button>
    </div>
  );
};
