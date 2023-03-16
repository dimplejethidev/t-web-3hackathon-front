import { Fragment, useState } from "react";
import { Button } from "@/src/components/elements/Button";
import { Image } from "@/src/components/elements/Image";
import { Link } from "@/src/components/elements/Link";
import { Spinner } from "@/src/components/elements/Spinner";
import { QuestButton } from "@/src/features/quest/components/QuestButton";
import { usePassportController } from "@/src/hooks/usePassport";
import { usePrizeUserController } from "@/src/hooks/usePrizeUser";
import { useQuestDetailState } from "@/src/hooks/useQuestDetail";
import { useQuestUserController } from "@/src/hooks/useQuestUser";
import { useUserValue } from "@/src/hooks/useUser";
import { CommunityModel } from "@/src/models/CommunityModel";
import { PrizeModel } from "@/src/models/PrizeModel";
import { QuestDetailModel } from "@/src/models/QuestDetailModel";
import { QuestModel } from "@/src/models/QuestModel";
import { QuestUserModel } from "@/src/models/QuestUserModel";
import { loadingPassportState } from "@/src/stores/loadingPassportState";
import { BaseProps } from "@/src/types/BaseProps";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import uuid from "react-uuid";
import { useRecoilValue } from "recoil";

export type QuestModalProps = {
  quest: QuestModel;
  questUser: QuestUserModel;
  community: CommunityModel;
  prizeList: PrizeModel[];
} & BaseProps;

/**
 * クエスト詳細
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param quest クエスト情報
 * @param questUser クエストユーザー情報
 * @param community コミュニティ情報
 * @param prizeList プライズ配列
 */
export const QuestModal = ({
  className,
  quest,
  questUser,
  community,
  prizeList,
}: QuestModalProps) => {
  const user = useUserValue();
  const loadingPassport = useRecoilValue(loadingPassportState);
  const [questDetailMap, questDetailController] = useQuestDetailState();
  const [isOpen, setIsOpen] = useState(false);
  const [isClickedClaimButton, setIsClickedClaimButton] = useState(false);
  const passportController = usePassportController();
  const questUserController = useQuestUserController();
  const prizeUserController = usePrizeUserController();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleQuestButtonClick = async () => {
    openModal();
    await questDetailController.fetch(quest.id, quest.questURI);
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

  let questDetail = questDetailMap.get(quest.id);
  if (questDetail === undefined) questDetail = new QuestDetailModel();
  return (
    <>
      <QuestButton
        className={clsx(className)}
        quest={quest}
        questUser={questUser}
        community={community}
        prizeList={prizeList}
        onClick={handleQuestButtonClick}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black-900 bg-opacity-70" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="m-6 w-full max-w-2xl transform overflow-hidden rounded-2xl bg-black-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className={clsx("flex", "flex-col", "justify-between")}
                  >
                    <Link
                      href={`/community/${community.id}`}
                      className={clsx("")}
                    >
                      <Image
                        className={clsx(
                          "rounded-full",
                          "w-[50px]",
                          "h-[50px]",
                          "absolute",
                          "top-[16px]",
                          "right-[16px]",
                        )}
                        src={community.icon}
                        alt="communityIcon"
                        width={50}
                        height={50}
                      />
                    </Link>
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
                        "text-2xl",
                        "text-start",
                        "mr-[50px]",
                      )}
                    >
                      {quest.title}
                    </div>
                  </Dialog.Title>
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
                        "text-2xl",
                        "text-primary",
                        "text-start",
                      )}
                    >
                      {quest.exp.toString()} exp
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
                      達成条件
                    </div>
                    <ul>
                      {questDetail.requirements.map((requirement) => {
                        return (
                          <li
                            key={uuid()}
                            className={clsx(
                              "font-bold",
                              "text-lg",
                              "text-start",
                            )}
                          >
                            <Link href={requirement.url}>
                              {requirement.sentence}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div
                    className={clsx(
                      "w-[100%]",
                      "flex",
                      "justify-end",
                      "items-center",
                    )}
                  >
                    <Button
                      disable={
                        !questUser.claimable ||
                        isClickedClaimButton ||
                        questUser.claimed ||
                        loadingPassport
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
                        "w-[150px]",
                        "h-[40px]",
                        "flex",
                        "justify-center",
                        "items-center",
                      )}
                      onClick={handleClaimButtonClick}
                    >
                      {questUser.claimed ? (
                        "COMPLETED"
                      ) : isClickedClaimButton || loadingPassport ? (
                        <Spinner
                          className={clsx(
                            "w-[25px]",
                            "h-[25px]",
                            "border-[4px]",
                          )}
                        />
                      ) : (
                        "CLAIM"
                      )}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
