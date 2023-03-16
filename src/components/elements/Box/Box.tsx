import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

const bgColors = {
  primary: clsx("bg-primary"),
  secondary: clsx("bg-secondary"),
  black: clsx("bg-black-900"),
  gray: clsx("bg-black-700"),
  none: clsx(""),
};

export type BoxProps = {
  shadow?: boolean;
  variant?: "primary" | "secondary" | "black" | "gray" | "none";
} & BaseProps;

/**
 * Box
 * @component
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param children 子要素
 * @param type タイプ
 */
export const Box = ({
  className,
  children,
  shadow = false,
  variant = "primary",
}: BoxProps) => {
  return (
    <div
      className={clsx(
        "p-10",
        "rounded-2xl",
        shadow ? "shadow-inner-main-s" : "",
        bgColors[variant],
        "border-black-i-shadow",
        "border-b-[1px]",
        "border-r-[1px]",
        "w-[100%]",
        className,
      )}
    >
      {children}
    </div>
  );
};
