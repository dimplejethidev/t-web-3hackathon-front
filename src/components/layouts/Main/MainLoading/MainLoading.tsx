import { MainContainer } from "@/src/components/elements/MainContainer";
import { Spinner } from "@/src/components/elements/Spinner";
import { BaseProps } from "@/src/types/BaseProps";
import clsx from "clsx";

export type MainLoadingProps = BaseProps;

/**
 * Main: ローディング画面
 * @layout
 * @author keit
 */
export const MainLoading = ({ className }: MainLoadingProps) => {
  return (
    <MainContainer
      className={clsx("flex", "flex-col", "items-center", "p-4", className)}
    >
      <div
        className={clsx(
          "absolute",
          "top-[50%]",
          "left-[50%]",
          "transform",
          "translate-x-[-50%]",
          "md:translate-x-[150%]",
          "translate-y-[-50%]",
        )}
      >
        <Spinner className={clsx("w-[50px]", "h-[50px]", "border-[4px]")} />
      </div>
    </MainContainer>
  );
};
