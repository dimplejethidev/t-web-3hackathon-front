import { Button } from "@/src/components/elements/Button";
import { useUserController } from "@/src/hooks/useUser";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type LoginButtonProps = BaseProps;

/**
 * ログインボタン
 * @feature
 * @author keit
 * @param className 親要素から渡されたスタイル
 */
export const LoginButton = ({ className }: LoginButtonProps) => {
  const userController = useUserController();

  /**
   * ログインボタンを押したときに実行される関数
   */
  const handleClick = async () => {
    try {
      await userController.login();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button
      className={clsx("w-[130px]", "rounded-full", className)}
      onClick={handleClick}
    >
      LOGIN
    </Button>
  );
};
