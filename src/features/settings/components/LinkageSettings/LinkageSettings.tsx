import { Box } from "@/src/components/elements/Box";
import { Image } from "@/src/components/elements/Image";
import { useUserValue } from "@/src/hooks/useUser";
import clsx from "clsx";

export type LinkageSettingsProps = {
  className?: string;
};

/**
 * プロフィール
 * @feature
 * @author keit
 * @param className 親要素から指定されるスタイル
 */
export const LinkageSettings = ({ className }: LinkageSettingsProps) => {
  const user = useUserValue();

  return (
    <Box className={clsx("flex", "flex-col", className)} variant="black" shadow>
      <div className={clsx("flex", "items-center", "my-4")}>
        <Image
          className={clsx("min-w-[40px]", "max-w-[40px]", "h-auto")}
          src="/img/wallet_icon.png"
          alt="walletIcon"
          width={40}
          height={40}
        />
        <div
          className={clsx(
            "ml-[20px]",
            "font-bold",
            "text-lg",
            "overflow-x-scroll",
            "scrollbar-thin",
            "scrollbar-thumb-secondary",
            "scrollbar-track-[#000000]",
            "scrollbar-thumb-rounded-full",
            "scrollbar-track-rounded-full",
            "py-[12px]",
          )}
        >
          {user.id}
        </div>
      </div>
      <div className={clsx("flex", "items-center", "my-4", "justify-between")}>
        <div className={clsx("flex", "items-center")}>
          <Image
            className={clsx("min-w-[40px]", "max-w-[40px]", "h-auto")}
            src="/img/twitter_icon.png"
            alt="twitterIcon"
            width={40}
            height={40}
          />
          <div className={clsx("ml-[20px]", "font-bold", "text-lg")}>
            Twitterと連携する
          </div>
        </div>
        <Image
          className={clsx(
            "min-w-[30px]",
            "max-w-[30px]",
            "h-auto",
            "cursor-pointer",
          )}
          src="/img/link_icon.png"
          alt="linkIcon"
          width={30}
          height={30}
        />
      </div>
    </Box>
  );
};
