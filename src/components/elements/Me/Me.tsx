import { Image } from "@/src/components/elements/Image";
import { Text3D } from "@/src/components/elements/Text3D";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type MeProps = {
  name: string;
  icon: string;
} & BaseProps;

/**
 * アイコンとユーザー名
 * @component
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param name ユーザー名
 * @param icon アイコン
 */
export const Me = ({ className, name, icon }: MeProps) => {
  return (
    <div className={clsx(className)}>
      <Image
        className={clsx(
          "w-[150px]",
          "h-[150px]",
          "rounded-full",
          "border-white",
          "border-2",
          "mb-6",
        )}
        src={icon}
        alt="myIcon"
        width={150}
        height={150}
      />
      <Text3D
        className={clsx("w-[150px]", "text-center", "text-3xl", "font-bold")}
      >
        {name}
      </Text3D>
    </div>
  );
};
