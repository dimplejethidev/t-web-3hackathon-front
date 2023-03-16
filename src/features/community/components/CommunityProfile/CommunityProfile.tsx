import { Image } from "@/src/components/elements/Image";
import { Link } from "@/src/components/elements/Link";
import { Text3D } from "@/src/components/elements/Text3D";
import { PassportButton, PassportListButton } from "@/src/features/passport";
import { useCommunityValue } from "@/src/hooks/useCommunity";
import { BaseProps } from "@/src/types/BaseProps";
import { CommunityId } from "@/src/types/CommunityId";
import clsx from "clsx";

export type CommunityProfileProps = {
  communityId: CommunityId;
} & BaseProps;

/**
 * コミュニティプロフィール
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param communityId コミュニティID
 */
export const CommunityProfile = ({
  className,
  communityId,
}: CommunityProfileProps) => {
  const community = useCommunityValue(communityId);

  if (community === undefined) return <></>;
  return (
    <div
      className={clsx(
        "bg-black-900",
        "px-4",
        "w-[calc(100%_-_10px)]",
        "ml-[10px]",
        "flex",
        "flex-col",
        className,
      )}
    >
      <div
        className={clsx(
          "flex",
          "justify-between",
          "items-end",
          "relative",
          "top-[-50px]",
        )}
      >
        <Image
          className={clsx(
            "min-w-[100px]",
            "max-w-[100px]",
            "h-auto",
            "rounded-full",
            "border-black-i-shadow",
            "border-t-[4px]",
            "border-l-[4px]",
            "ml-4",
          )}
          src={community.icon}
          alt="icon"
          width={500}
          height={500}
        />
        <div className={clsx("flex")}>
          <PassportButton
            className={clsx(
              "select-none",
              "w-[140px]",
              "flex",
              "items-center",
              "justify-center",
            )}
            community={community}
          />
        </div>
      </div>
      <div className={clsx("ml-4", "relative", "top-[-30px]")}>
        <Text3D className={clsx("font-bold", "text-3xl", "mb-8")}>
          {community.title}
        </Text3D>
        <div className={clsx("mb-8")}>{community.description}</div>
        <div className={clsx("flex", "justify-between")}>
          <PassportListButton />
          <div className={clsx("flex")}>
            <Link href={community.linkage.twitter} className={clsx("mr-4")}>
              <Image
                className={clsx("min-w-[30px]", "max-w-[30px]", "h-auto")}
                src="/img/twitter_icon.png"
                alt="linkage_twitter"
                width={100}
                height={100}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
