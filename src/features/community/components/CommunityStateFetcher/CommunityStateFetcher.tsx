import { useEffect } from "react";
import { useCommunityController } from "@/src/hooks/useCommunity";
import { isInitCommunityState } from "@/src/stores/isInitCommunityState";
import { BaseProps } from "@/src/types/BaseProps";
import { useSetRecoilState } from "recoil";

export type CommunityStateFetcherProps = BaseProps;

/**
 * コミュニティ一覧の取得
 * @feature
 * @author keit
 * @param children 子要素
 */
export const CommunityStateFetcher = ({
  children,
}: CommunityStateFetcherProps) => {
  const communityListController = useCommunityController();
  const setIsInitCommunityList = useSetRecoilState(isInitCommunityState);

  const init = async () => {
    await communityListController.init();
    setIsInitCommunityList((prevState) => true);
  };

  useEffect(() => {
    try {
      init();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.error(e);
    }
  }, []);

  return <>{children}</>;
};
