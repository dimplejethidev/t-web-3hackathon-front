import { useQuestController } from "@/src/hooks/useQuest";
import { useQuestUserController } from "@/src/hooks/useQuestUser";
import { useUserValue } from "@/src/hooks/useUser";
import { isInitQuestState } from "@/src/stores/isInitQuestState";
import { isInitUserState } from "@/src/stores/isInitUserState";
import { BaseProps } from "@/src/types/BaseProps";
import { layoutEffectOfSSR } from "@/src/util/layoutEffectOfSSR";
import { useRecoilValue, useSetRecoilState } from "recoil";

export type QuestStateFetcherProps = BaseProps;

/**
 * クエスト一覧の取得
 * @feature
 * @author keit
 * @param children 子要素
 */
export const QuestStateFetcher = ({ children }: QuestStateFetcherProps) => {
  const user = useUserValue();
  const isInitUser = useRecoilValue(isInitUserState);
  const questController = useQuestController();
  const questUserController = useQuestUserController();
  const setIsInitQuestList = useSetRecoilState(isInitQuestState);
  const useLayoutEffectOfSSR = layoutEffectOfSSR();

  const init = async () => {
    if (!isInitUser) return;
    await Promise.all([
      questController.init(),
      questUserController.init(user.id),
    ]);
    setIsInitQuestList(true);
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
