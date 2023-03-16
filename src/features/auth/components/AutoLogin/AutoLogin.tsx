import { useUserController } from "@/src/hooks/useUser";
import { BaseProps } from "@/src/types/BaseProps";
import { layoutEffectOfSSR } from "@/src/util/layoutEffectOfSSR";

export type AutoLoginProps = BaseProps;

/**
 * 認証済みなら自動でログイン
 * @feature
 * @author keit
 * @param children 子要素
 */
export const AutoLogin = ({ children }: AutoLoginProps) => {
  const userController = useUserController();
  const useLayoutEffectOfSSR = layoutEffectOfSSR();

  useLayoutEffectOfSSR(() => {
    userController.init();
  }, []);

  return <>{children}</>;
};
