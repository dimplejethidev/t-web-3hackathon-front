import { useEffect, useLayoutEffect } from "react";

export const layoutEffectOfSSR = () => {
  return typeof window !== "undefined" ? useLayoutEffect : useEffect;
};
