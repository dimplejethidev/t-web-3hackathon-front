import { MutableRefObject, RefObject, useRef, useState } from "react";
import { BaseProps } from "@/src/types/BaseProps";
import { layoutEffectOfSSR } from "@/src/util/layoutEffectOfSSR";
import clsx from "clsx";

const colors = {
  primary: clsx(
    "bg-primary",
    "border-primary-shadow",
    "active:border-primary-i-shadow",
    "disabled:border-primary-i-shadow",
  ),
  secondary: clsx(
    "bg-secondary",
    "border-secondary-shadow",
    "active:border-secondary-i-shadow",
    "disabled:border-secondary-i-shadow",
  ),
  black: clsx("bg-black-900", "border-black-i-shadow"),
  trueblack: clsx("bg-[#242424]", "border-black-i-shadow"),
  gray: clsx(
    "bg-black-700",
    "border-black-shadow",
    "active:border-black-i-shadow",
    "disabled:border-black-i-shadow",
  ),
};

export type ButtonProps = {
  buttonRef?:
    | RefObject<HTMLButtonElement>
    | MutableRefObject<HTMLButtonElement>;
  disable?: boolean;
  variant?: "primary" | "secondary" | "black" | "gray" | "trueblack";
  type?: "button" | "box";
  onClick?: () => void;
} & BaseProps;

/**
 * ボタン
 * @component
 * @author keit
 * @param children 子要素
 * @param disable 有効 / 無効
 * @param variant カラー選択
 * @param type タイプ
 * @param onClick 押された時の処理
 * @param className 親要素から渡されたスタイル
 */
export const Button = ({
  children,
  buttonRef,
  disable = false,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
}: ButtonProps) => {
  const useLayoutEffectOfSSR = layoutEffectOfSSR();
  const bRef = useRef<HTMLButtonElement>(null);
  const [clicking, setClicking] = useState(false);
  if (buttonRef === undefined) buttonRef = bRef;

  const handlePointerDown = (e: MouseEvent) => {
    setClicking(true);
  };

  const handlePointerUp = (e: MouseEvent) => {
    setClicking(false);
  };

  const handlePointerCancel = (e: MouseEvent) => {
    setClicking(false);
  };

  const handlePointerLeave = (e: MouseEvent) => {
    setClicking(false);
  };

  const getBorder = (type: "button" | "box") => {
    if (type === "button") {
      return clsx(
        disable ? "border-t-4" : clicking ? "border-t-4" : "border-b-4",
        disable ? "border-l-4" : clicking ? "border-l-4" : "border-r-4",
      );
    }
    if (type === "box") {
      return clsx(
        disable
          ? "border-t-[6px]"
          : clicking
          ? "border-t-[6px]"
          : "border-b-[6px]",
        disable
          ? "border-l-[6px]"
          : clicking
          ? "border-l-[6px]"
          : "border-r-[6px]",
      );
    }
  };

  useLayoutEffectOfSSR(() => {
    const el = buttonRef!.current;
    if (!el) return;
    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointerup", handlePointerUp);
    el.addEventListener("pointercancel", handlePointerCancel);
    el.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointerup", handlePointerUp);
      el.removeEventListener("pointercancel", handlePointerCancel);
      el.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      disabled={disable}
      className={clsx(
        colors[variant],
        "px-4",
        "py-1",
        "text-lg",
        "font-bold",
        "cursor-pointer",
        getBorder(type),
        "disabled:cursor-default",
        "disabled:opacity-50",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
