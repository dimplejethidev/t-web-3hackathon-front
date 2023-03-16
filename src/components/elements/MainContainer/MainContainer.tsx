import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type MainContainerProps = BaseProps;

/**
 * MAIN枠
 * @component
 * @author keit
 * @param children 子要素
 * @param className 親要素から指定されたスタイル
 */
export const MainContainer = ({ children, className }: MainContainerProps) => {
  return (
    <div
      className={clsx(
        "overflow-y-scroll",
        "rounded-2xl",
        "bg-[#34373b]",
        "m-2",
        "border-black-i-shadow",
        "border-b-[1px]",
        "border-r-[1px]",
        "w-[100%]",
      )}
    >
      <div
        className={clsx(
          "rounded-2xl",
          "shadow-inner-main-s",
          "overflow-y-scroll",
          "w-[100%]",
          "min-h-[100%]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
