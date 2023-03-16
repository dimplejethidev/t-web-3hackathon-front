import { LogoutButton } from "@/src/features/auth";
import { useUserValue } from "@/src/hooks/useUser";
import { BaseProps } from "@/src/types/BaseProps";

export type LogoutProps = BaseProps;

/**
 * ログアウト
 * @feature
 * @author keit
 * @param className 親要素から渡されたスタイル
 */
export const Logout = ({ className }: LogoutProps) => {
  const user = useUserValue();

  if (user.id === "") return <LogoutButton disable className={className} />;
  return <LogoutButton className={className} />;
};
