import { usePrizeController } from "@/src/hooks/usePrize";
import { usePrizeUserController } from "@/src/hooks/usePrizeUser";
import { useUserValue } from "@/src/hooks/useUser";
import { isInitPrizeState } from "@/src/stores/isInitPrizeState";
import { isInitUserState } from "@/src/stores/isInitUserState";
import { BaseProps } from "@/src/types/BaseProps";
import { layoutEffectOfSSR } from "@/src/util/layoutEffectOfSSR";
import { useRecoilValue, useSetRecoilState } from "recoil";

export type PrizeStateFetcherProps = BaseProps;

/**
 * プライズ一覧の取得
 * @feature
 * @author keit
 * @param children 子要素
 */
export const PrizeStateFetcher = ({ children }: PrizeStateFetcherProps) => {
  const user = useUserValue();
  const isInitUser = useRecoilValue(isInitUserState);
  const prizeController = usePrizeController();
  const prizeUserController = usePrizeUserController();
  const setIsInitPrize = useSetRecoilState(isInitPrizeState);
  const useLayoutEffectOfSSR = layoutEffectOfSSR();

  const init = async () => {
    if (!isInitUser) return;
    await Promise.all([
      prizeController.init(),
      prizeUserController.init(user.id),
    ]);
    setIsInitPrize((prevState) => true);
  };

  useLayoutEffectOfSSR(() => {
    try {
      init();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.error(e);
    }
  }, [isInitUser, user.id]);

  return <>{children}</>;
};
