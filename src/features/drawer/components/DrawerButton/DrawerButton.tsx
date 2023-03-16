import { Button } from "@/src/components/elements/Button";
import { drawerOpenState } from "@/src/stores/drawerOpenState";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";

export type DrawerButtonProps = BaseProps;

/**
 * ドロワーボタン
 * @feature
 * @author keit
 * @param className 親要素から渡されたスタイル
 */
export const DrawerButton = ({ className }: DrawerButtonProps) => {
  const setDrawerOpen = useSetRecoilState(drawerOpenState);

  const handleClick = () => {
    setDrawerOpen(true);
  };

  return (
    <Button className={clsx("select-none", className)} onClick={handleClick} />
  );
};
