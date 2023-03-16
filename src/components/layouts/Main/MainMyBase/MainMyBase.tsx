import { useState } from "react";
import { Image } from "@/src/components/elements/Image";
import { Link } from "@/src/components/elements/Link";
import { MainContainer } from "@/src/components/elements/MainContainer";
import { MainLoading } from "@/src/components/layouts/Main/MainLoading";
import { MyCube } from "@/src/features/cube";
import { useCubeValue } from "@/src/hooks/useCube";
import { usePrizeListValue } from "@/src/hooks/usePrize";
import { usePrizeDetailController } from "@/src/hooks/usePrizeDetail";
import { usePrizeUserValue } from "@/src/hooks/usePrizeUser";
import { useUserValue } from "@/src/hooks/useUser";
import Custom404 from "@/src/pages/404";
import { isInitCubeState } from "@/src/stores/isInitCubeState";
import { isInitPrizeState } from "@/src/stores/isInitPrizeState";
import { isInitUserState } from "@/src/stores/isInitUserState";
import { layoutEffectOfSSR } from "@/src/util/layoutEffectOfSSR";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

/**
 * Main: MYBASE
 * @layout
 * @author keit
 */
export const MainMyBase = () => {
  const user = useUserValue();
  const prizeList = usePrizeListValue();
  const prizeUserState = usePrizeUserValue();
  const cube = useCubeValue(user.id);

  const isInitUser = useRecoilValue(isInitUserState);
  const isInitPrize = useRecoilValue(isInitPrizeState);
  const isInitCube = useRecoilValue(isInitCubeState);
  const [isInitPrizeDetail, setIsInitPrizeDetail] = useState(false);

  const prizeDetailController = usePrizeDetailController();

  const useLayoutEffectOfSSR = layoutEffectOfSSR();

  const initPrizeDetail = async () => {
    if (!isInitPrize) return;
    const obtainedPrizeList = prizeList.filter((prize) => {
      const prizeUser = prizeUserState.get(prize.id)!;
      return prizeUser.obtained;
    });
    await prizeDetailController.fetch(obtainedPrizeList);
    setIsInitPrizeDetail((prevState) => true);
  };

  useLayoutEffectOfSSR(() => {
    try {
      initPrizeDetail();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.log(e);
    }
  }, [isInitPrize]);

  if (!isInitUser) return <MainLoading />;
  if (user.id === "") return <Custom404 />;
  if (!isInitPrizeDetail || !isInitCube) return <MainLoading />;
  return (
    <MainContainer
      className={clsx(
        "flex",
        "flex-col",
        "items-center",
        "relative",
        "h-[100%]",
      )}
    >
      <MyCube
        className={clsx(
          "mb-[20px]",
          "w-[calc(100%_-_10px)]",
          "h-[100%]",
          "mt-[10px]",
          "ml-[10px]",
          "rounded-tl-[10px]",
        )}
        cube={cube!}
      />
      <Link
        href="/mybase/cube"
        className={clsx(
          "cursor-pointer",
          "absolute",
          "top-[30px]",
          "right-[20px]",
        )}
      >
        <Image
          className={clsx("min-w-[30px]", "max-w-[30px]", "h-auto")}
          src="/img/setting_icon.png"
          alt="settingIcon"
          width={100}
          height={100}
        />
      </Link>
      {/* <Profile className={clsx("my-4", "w-[90%]")} /> */}
      {/* <CommunityList className={clsx("my-4", "w-[93%]")} /> */}
    </MainContainer>
  );
};
