import { Box } from "@/src/components/elements/Box";
import { useUserValue } from "@/src/hooks/useUser";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type ProfileSettingsProps = BaseProps;

/**
 * プロフィール設定
 * @feature
 * @author keit
 * @param className 親要素から指定されるスタイル
 */
export const ProfileSettings = ({ className }: ProfileSettingsProps) => {
  const user = useUserValue();

  return (
    <Box
      className={clsx(
        "flex",
        "max-md:flex-col",
        "max-md:items-center",
        "relative",
        className,
      )}
      variant="black"
      shadow
    >
      {/* <Image
        className={clsx(
          "min-w-[30px]",
          "max-w-[30px]",
          "h-auto",
          "absolute",
          "top-[30px]",
          "right-[20px]"
        )}
        src="/img/edit_icon.png"
        alt="settingIcon"
        width={100}
        height={100}
      />
      <Me
        className={clsx("mr-10", "max-md:mr-0")}
        icon={user.icon}
        name={user.name}
      />
      <div className={clsx("mt-[60px]", "max-md:mt-[20px]")}>
        {user.selfIntro}
      </div> */}
    </Box>
  );
};
