import { CommunityLink } from "@/src/features/community";
import { CommunityState } from "@/src/stores/communityState";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";
import uuid from "react-uuid";

export type CommunityListProps = {
  communityState: CommunityState;
} & BaseProps;

/**
 * コミュニティ一覧
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 */
export const CommunityList = ({
  className,
  communityState,
}: CommunityListProps) => {
  const keys = Array.from(communityState.keys());

  return (
    <div className={clsx("w-[100%]", className)}>
      <div className={clsx("flex", "justify-start", "flex-wrap")}>
        {keys.map((key) => {
          const community = communityState.get(key);
          if (community === undefined) return <></>;
          return (
            <CommunityLink
              key={uuid()}
              className={clsx("m-4", "w-[100%]", "xl:w-[46%]")}
              community={community}
            />
          );
        })}
      </div>
    </div>
  );
};
