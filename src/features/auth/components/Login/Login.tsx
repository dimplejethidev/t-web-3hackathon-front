import { LoginButton } from "@/src/features/auth";
import { LoginedAddress } from "@/src/features/auth";
import { useUserValue } from "@/src/hooks/useUser";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type LoginProps = BaseProps;

/**
 * ログイン
 * @feature
 * @author keit
 * @param className 親要素から渡されたスタイル
 */
export const Login = ({ className }: LoginProps) => {
  const user = useUserValue();

  if (user.id === "") return <LoginButton className={clsx(className)} />;
  return <LoginedAddress className={clsx(className)} />;
};
