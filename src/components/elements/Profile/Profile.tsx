import { Box } from "@/src/components/elements/Box";
import { useUserValue } from "@/src/hooks/useUser";
import clsx from "clsx";

const linkageIcon = clsx("w-[30px]", "h-[30px]", "mr-4", "cursor-pointer");

export type ProfileProps = {
  className?: string;
};

/**
 * プロフィール
 * @component
 * @author keit
 * @param className 親要素から指定されるスタイル
 */
export const Profile = ({ className }: ProfileProps) => {
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
      {/* <Link
        href="/mybase/settings"
        className={clsx("cursor-pointer", "absolute", "top-[30px]", "right-[20px]")}
      >
        <Image
          className={clsx("min-w-[30px]", "max-w-[30px]", "h-auto")}
          src="/img/setting_icon.png"
          alt="settingIcon"
          width={100}
          height={100}
        />
      </Link>
      <Me
        className={clsx("mr-10", "max-md:mr-0")}
        icon={user.icon}
        name={user.name}
      />
      <div className={clsx("flex", "flex-col", "justify-between")}>
        <div className={clsx("flex", "max-md:mt-4")}>
          <Image
            className={clsx(linkageIcon)}
            src="/img/wallet_icon.png"
            alt="walletIcon"
            width={100}
            height={100}
          />
          <Image
            className={clsx(linkageIcon)}
            src="/img/twitter_icon.png"
            alt="twitterIcon"
            width={100}
            height={100}
          />
          <Image
            className={clsx(linkageIcon)}
            src="/img/discord_icon.png"
            alt="discordIcon"
            width={100}
            height={100}
          />
        </div>
        <div className={clsx("mt-[60px]", "max-md:mt-[20px]")}>{user.selfIntro}</div>
      </div> */}
    </Box>
  );
};
