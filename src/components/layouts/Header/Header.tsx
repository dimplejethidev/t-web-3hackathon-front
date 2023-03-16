import { Logo } from "@/src/components/elements/Logo";
import { Login } from "@/src/features/auth";
import { DrawerButton } from "@/src/features/drawer";
import clsx from "clsx";

/**
 * ヘッダー部
 * @layout
 * @author keit
 */
export const Header = () => {
  return (
    <header
      className={clsx(
        "flex",
        "flex-col",
        "justify-center",
        "h-[70px]",
        "max-w-[1920px]",
      )}
    >
      <div
        className={clsx("flex", "items-center", "justify-between", "m-[10px]")}
      >
        <DrawerButton
          className={clsx("md:hidden", "rounded-full", "w-[50px]", "h-[50px]")}
        ></DrawerButton>
        <Logo className={clsx("w-[200px]")} />
        <Login />
      </div>
    </header>
  );
};
