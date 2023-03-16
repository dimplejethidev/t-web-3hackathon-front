import { Button } from "@/src/components/elements/Button";
import { useUserController } from "@/src/hooks/useUser";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type LogoutButtonProps = {
  disable?: boolean;
} & BaseProps;

/**
 * ログアウトボタン
 * @feature
 * @author keit
 * @param className 親要素から渡されたスタイル
 * @param disable 有効 / 無効
 */
export const LogoutButton = ({
  className,
  disable = false,
}: LogoutButtonProps) => {
  const userController = useUserController();

  /**
   * ログインアウトボタンを押したときに実行される関数
   */
  const handleClick = () => {
    userController.logout();
  };

  return (
    <Button
      disable={disable}
      className={clsx("w-[130px]", "rounded-full", className)}
      variant="secondary"
      onClick={handleClick}
    >
      LOGOUT
    </Button>
  );
};
