import { Link } from "@/src/components/elements/Link/Link";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

const bgcolors = {
  primary: clsx("bg-primary", "active:border-primary-i-shadow"),
  secondary: clsx("bg-secondary", "active:border-secondary-i-shadow"),
  gray: clsx("bg-black-700", "active:border-black-i-shadow"),
  black: clsx("bg-black-900", "active:border-black-i-shadow"),
  trueblack: clsx("bg-[#242424]", "border-black-i-shadow"),
};

const borders = {
  primary: clsx("border-primary-shadow"),
  secondary: clsx("border-secondary-shadow"),
  gray: clsx("border-black-shadow"),
  black: clsx("border-black-i-shadow"),
  trueblack: clsx("border-black-i-shadow"),
};

export type LinkButtonProps = {
  variant?: "primary" | "secondary" | "gray" | "black" | "trueblack";
  href: string;
  disable?: boolean;
  onClick?: () => void;
} & BaseProps;

/**
 * Linkボタン
 * @component
 * @author keit
 * @param variant カラー選択
 * @param href URL
 * @param disable 有効 / 無効
 * @param children 子要素
 * @param className 親要素から渡されたスタイル
 * @param onClick クリック時の動作
 */
export const LinkButton = ({
  variant = "primary",
  href,
  disable = false,
  className,
  children,
  onClick,
}: LinkButtonProps) => {
  return (
    <Link
      disable={disable}
      href={href}
      className={clsx(
        bgcolors[variant],
        disable ? "border-black-i-shadow" : borders[variant],
        disable ? "" : "active:border-r-0",
        disable ? "" : "active:border-b-0",
        disable ? "opacity-50" : "",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
