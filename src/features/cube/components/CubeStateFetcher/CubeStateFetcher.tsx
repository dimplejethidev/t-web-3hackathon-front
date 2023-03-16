import { useCubeController } from "@/src/hooks/useCube";
import { useUserValue } from "@/src/hooks/useUser";
import { isInitCubeState } from "@/src/stores/isInitCubeState";
import { isInitUserState } from "@/src/stores/isInitUserState";
import { BaseProps } from "@/src/types/BaseProps";
import { layoutEffectOfSSR } from "@/src/util/layoutEffectOfSSR";
import { useRecoilValue, useSetRecoilState } from "recoil";

export type CubeStateFetcherProps = BaseProps;

/**
 * 箱庭の取得
 * @feature
 * @author keit
 * @param children 子要素
 */
export const CubeStateFetcher = ({ children }: CubeStateFetcherProps) => {
  const user = useUserValue();
  const isInitUser = useRecoilValue(isInitUserState);
  const cubeController = useCubeController();
  const setIsInitCube = useSetRecoilState(isInitCubeState);
  const useLayoutEffectOfSSR = layoutEffectOfSSR();

  const init = async () => {
    if (!isInitUser) return;
    if (user.id === "") {
      setIsInitCube(true);
      return;
    }
    await cubeController.init(user.id);
    setIsInitCube(true);
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
