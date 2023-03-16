import { Button } from "@/src/components/elements/Button";
import { Spinner } from "@/src/components/elements/Spinner";
import { NOT_FOUND_CONNECTED_ADDRESS } from "@/src/const/errormessage";
import { usePassportState } from "@/src/hooks/usePassport";
import { useQuestSelectorCommunityId } from "@/src/hooks/useQuest";
import { useQuestUserController } from "@/src/hooks/useQuestUser";
import { useUserState } from "@/src/hooks/useUser";
import { CommunityModel } from "@/src/models/CommunityModel";
import { loadingPassportState } from "@/src/stores/loadingPassportState";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";
import { useRecoilState } from "recoil";

export type PassportButtonProps = {
  community: CommunityModel;
} & BaseProps;

/**
 * パスポート取得ボタン
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param community コミュニティ情報
 */
export const PassportButton = ({
  className,
  community,
}: PassportButtonProps) => {
  const questList = useQuestSelectorCommunityId(community.id);
  const [user, userController] = useUserState();
  const [passport, passportController] = usePassportState();
  const questUserController = useQuestUserController();
  const [loadingPassport, setLoadingPassport] =
    useRecoilState(loadingPassportState);

  const handleClickMintPassportButton = async () => {
    setLoadingPassport((prevState) => true);
    try {
      await passportController.mint(community.id, community.passport, user.id);
      await questUserController.updateClaimState(user.id, questList);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        if (e.message !== NOT_FOUND_CONNECTED_ADDRESS) return;
        try {
          await userController.login();
          await passportController.mint(
            community.id,
            community.passport,
            user.id,
          );
          await questUserController.updateClaimState(user.id, questList);
        } catch (e) {
          if (e instanceof Error) {
            console.error(e.message);
          }
          console.error(e);
        }
      }
      console.error(e);
    }
    setLoadingPassport((prevState) => false);
  };

  const handleClickBurnPassportButton = async () => {
    setLoadingPassport((prevState) => true);
    try {
      await passportController.burn(community.passport, user.id);
      await questUserController.updateClaimState(user.id, questList);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.log(e);
    }
    setLoadingPassport((prevState) => false);
  };

  if (loadingPassport)
    return (
      <Button
        className={clsx("rounded-full", "text-sm", "h-[35px]", className)}
        onClick={handleClickMintPassportButton}
        variant="gray"
        disable
      >
        <Spinner className={clsx("h-[12px]", "w-[12px]", "border-[2px]")} />
      </Button>
    );

  return (
    <>
      {passport.get(user.id) !== undefined ? (
        <Button
          disable
          className={clsx("rounded-full", "text-sm", "h-[35px]", className)}
          onClick={handleClickBurnPassportButton}
          variant="gray"
        >
          パスポート所持
        </Button>
      ) : (
        <Button
          className={clsx("rounded-full", "text-sm", "h-[35px]", className)}
          onClick={handleClickMintPassportButton}
        >
          パスポート取得
        </Button>
      )}
    </>
  );
};
