import { Image } from "@/src/components/elements/Image";
import { LinkButton } from "@/src/components/elements/LinkButton";
import { Text3D } from "@/src/components/elements/Text3D";
import { CommunityModel } from "@/src/models/CommunityModel";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type CommunityLinkProps = {
  community: CommunityModel;
} & BaseProps;

/**
 * コミュニティリンク
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param community コミュニティ情報
 */
export const CommunityLink = ({ className, community }: CommunityLinkProps) => {
  if (community.id === "") return <></>;
  return (
    <LinkButton
      href={`/community/${community.id}`}
      variant="black"
      className={clsx(
        "rounded-3xl",
        "overflow-hidden",
        "flex",
        "flex-col",
        "border-b-8",
        "border-r-8",
        "active:border-t-8",
        "active:border-l-8",
        className,
      )}
    >
      <Image
        className={clsx("w-[100%]")}
        src={community.thumbnail}
        alt="thumbnail"
        width={500}
        height={300}
      />
      <div
        className={clsx(
          "flex",
          "m-4",
          "p-2",
          "items-center",
          "top-[-30px]",
          "relative",
        )}
      >
        <Image
          className={clsx("w-[40%]", "max-w-[80px]", "h-auto", "rounded-full")}
          src={community.icon}
          alt="icon"
          width={100}
          height={100}
        />
        <Text3D
          className={clsx("text-3xl", "font-bold", "ml-4", "line-clamp-1")}
        >
          {community.title}
        </Text3D>
      </div>
      <div className={clsx("mx-8", "top-[-25px]", "relative", "line-clamp-3")}>
        {community.description}
      </div>
    </LinkButton>
  );
};
