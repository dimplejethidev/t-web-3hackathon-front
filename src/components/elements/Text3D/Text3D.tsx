import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type Text3DProps = BaseProps;

/**
 * 3Dテキスト
 * @component
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param children 親要素から指定されたスタイル
 */
export const Text3D = ({ className, children }: Text3DProps) => {
  return <div className={clsx("text-shadow", className)}>{children}</div>;
};
