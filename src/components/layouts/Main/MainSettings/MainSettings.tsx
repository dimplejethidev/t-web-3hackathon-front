import { MainContainer } from "@/src/components/elements/MainContainer";
import { Logout } from "@/src/features/auth";
import { ProfileSettings } from "@/src/features/settings";
import { LinkageSettings } from "@/src/features/settings/components/LinkageSettings";
import clsx from "clsx";

/**
 * Main: プロフィール設定画面
 * @layout
 * @author keit
 */
export const MainSettings = () => {
  return (
    <MainContainer
      className={clsx("flex", "flex-col", "items-center", "p-4", "relative")}
    >
      <ProfileSettings />
      <LinkageSettings className={clsx("mt-4", "mb-[60px]")} />
      <Logout className={clsx("absolute", "bottom-[20px]", "right-[40px]")} />
    </MainContainer>
  );
};
