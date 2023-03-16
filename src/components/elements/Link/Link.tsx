import NextLink from "next/link";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type LinkProps = {
  href: string;
  disable?: boolean;
  onClick?: () => void;
} & BaseProps;

/**
 * Link
 * @component
 * @author keit
 * @param children 子要素
 * @param className 親要素から渡されたスタイル
 * @param href URL
 * @param disable 有効 / 無効
 * @param onClick クリック時の動作
 */
export const Link = ({
  children,
  className,
  href,
  disable = false,
  onClick,
}: LinkProps) => {
  if (disable) return <div className={clsx(className)}>{children}</div>;
  return (
    <NextLink
      href={href}
      className={clsx("no-underline", className)}
      onClick={onClick}
    >
      {children}
    </NextLink>
  );
};
