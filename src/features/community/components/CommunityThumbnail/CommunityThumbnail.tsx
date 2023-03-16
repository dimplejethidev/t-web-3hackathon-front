import { Image } from "@/src/components/elements/Image";
import { useCommunityValue } from "@/src/hooks/useCommunity";
import { BaseProps } from "@/src/types/BaseProps";
import { CommunityId } from "@/src/types/CommunityId";
import clsx from "clsx";

export type CommunityThumbnailProps = {
  communityId: CommunityId;
} & BaseProps;

/**
 * コミュニティサムネイル
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param communityId コミュニティID
 */
export const CommunityThumbnail = ({
  className,
  communityId,
}: CommunityThumbnailProps) => {
  const community = useCommunityValue(communityId);

  if (community === undefined) return <></>;
  return (
    <Image
      className={clsx(
        "w-[calc(100%_-_10px)]",
        "ml-[10px]",
        "min-h-[300px]",
        "object-cover",
        "rounded-tl-2xl",
        "mt-[10px]",
        className,
      )}
      src={community.thumbnail}
      alt="project_thumbnail"
      width={2000}
      height={2000}
    />
  );
};
