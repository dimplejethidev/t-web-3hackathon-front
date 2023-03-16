import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export type LogoProps = {
  className?: string;
};

/**
 * ロゴ
 * @component
 * @author keit
 * @param className 親要素から渡されたスタイル
 */
export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={clsx("flex", "items-center", "justify-center", className)}
    >
      <Image
        className={clsx(
          "rounded-full",
          "w-[20%]",
          "h-auto",
          "hidden",
          "mr-[10px]",
          "md:inline",
        )}
        src="/img/logo_icon.png"
        alt="logoicon"
        width={100}
        height={100}
      />
      <Image
        className={clsx("max-w-[70%]")}
        src="/img/logo_text.png"
        alt="logotext"
        width={1250}
        height={207}
      />
    </Link>
  );
};
