import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export enum ViewType {
  normal,
  full,
}

export type MainProps = {
  viewType?: ViewType;
} & BaseProps;

/**
 * メイン
 * @layout
 * @author keit
 * @param children 子要素
 */
export const Main = ({ children, viewType = ViewType.normal }: MainProps) => {
  let style;
  if (viewType === ViewType.normal) {
    style = clsx("h-[calc(100%_-_70px)]", "overflow-y-scroll", "flex");
  } else if (viewType === ViewType.full) {
    style = clsx("w-screen", "h-screen");
  }
  return <main className={style}>{children}</main>;
};
