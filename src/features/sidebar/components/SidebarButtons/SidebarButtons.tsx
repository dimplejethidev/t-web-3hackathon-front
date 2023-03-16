import { SidebarButton } from "@/src/features/sidebar";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type SidebarButtonsProps = {
  onClick?: () => void;
} & BaseProps;

/**
 * サイドバーのボタン
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param onClick クリック時の処理
 */
export const SidebarButtons = ({ className, onClick }: SidebarButtonsProps) => {
  return (
    <div className={clsx(className)}>
      <SidebarButton
        href="/"
        onClick={onClick}
        className={clsx("mt-[4px]", "mb-[25px]")}
      >
        COMMUNITY
      </SidebarButton>
      <SidebarButton
        href="/quest"
        onClick={onClick}
        className={clsx("my-[0px]")}
      >
        QUEST
      </SidebarButton>
      {/* <SidebarButton href="/mybase">MYBASE</SidebarButton> */}
      {/* <SidebarButton href="https://docs.fan-base.xyz/">DOCS</SidebarButton> */}
    </div>
  );
};
