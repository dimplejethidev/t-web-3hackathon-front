import { useRouter } from "next/router";
import { LinkButton } from "@/src/components/elements/LinkButton";
import { useUserValue } from "@/src/hooks/useUser";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type LoginedAddressProps = BaseProps;

/**
 * ログイン済みアドレスを表示
 * @feature
 * @author keit
 * @param className 親要素から渡されたスタイル
 */
export const LoginedAddress = ({ className }: LoginedAddressProps) => {
  const user = useUserValue();
  const { route } = useRouter();
  const href = "/mybase";
  const disable = route === href;

  return (
    <LinkButton
      disable={disable}
      className={clsx(
        "truncate",
        "w-[130px]",
        "rounded-full",
        "px-4",
        "py-1",
        "text-lg",
        "font-bold",
        disable ? "border-t-4" : "border-b-4",
        disable ? "border-l-4" : "border-r-4",
        disable ? "" : "active:border-t-4",
        disable ? "" : "active:border-l-4",
        className,
      )}
      href={href}
    >
      {user.id}
    </LinkButton>
  );
};
