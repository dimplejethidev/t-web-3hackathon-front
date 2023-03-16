import { useRouter } from "next/router";
import { LinkButton } from "@/src/components/elements/LinkButton";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type SidebarButtonProps = {
  href: string;
  onClick?: () => void;
} & BaseProps;

/**
 * サイドバーのボタン
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param children 子要素
 * @param href リンク
 * @param onClick クリック時の処理
 */
export const SidebarButton = ({
  className,
  children,
  href,
  onClick,
}: SidebarButtonProps) => {
  const { route } = useRouter();
  const disable = route === href;

  return (
    <LinkButton
      disable={disable}
      variant="gray"
      href={href}
      className={clsx(
        "rounded-full",
        "px-6",
        "py-1",
        "text-lg",
        "font-bold",
        "text-center",
        disable ? "border-t-4" : "border-b-4",
        disable ? "border-l-4" : "border-r-4",
        disable ? "" : "active:border-t-4",
        disable ? "" : "active:border-l-4",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </LinkButton>
  );
};
