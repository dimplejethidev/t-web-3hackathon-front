import { MainContainer } from "@/src/components/elements/MainContainer";
import { MainLoading } from "@/src/components/layouts/Main/MainLoading";
import { CommunityList } from "@/src/features/community";
import { useCommunityStateValue } from "@/src/hooks/useCommunity";
import { isInitCommunityState } from "@/src/stores/isInitCommunityState";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

/**
 * メイン: COMMUNITY
 * @layout
 * @author keit
 */
export const MainCommunity = () => {
  const communityState = useCommunityStateValue();
  const isInitCommunity = useRecoilValue(isInitCommunityState);

  if (!isInitCommunity) return <MainLoading />;
  return (
    <MainContainer className={clsx("flex", "flex-col", "items-center", "p-4")}>
      <div className={clsx("flex", "justify-start", "flex-wrap", "w-[100%]")}>
        <CommunityList communityState={communityState} />
      </div>
    </MainContainer>
  );
};
