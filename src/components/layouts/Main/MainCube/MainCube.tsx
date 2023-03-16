import { useState } from "react";
import { Image } from "@/src/components/elements/Image";
import { Link } from "@/src/components/elements/Link";
import { Spinner } from "@/src/components/elements/Spinner";
import { FLOOR_TYPE } from "@/src/const/cube";
import { CubeEditor, MyCube } from "@/src/features/cube";
import { useCubeController, useCubeValue } from "@/src/hooks/useCube";
import { useCubeTmpState } from "@/src/hooks/useCubeTmp";
import { usePrizeListValue } from "@/src/hooks/usePrize";
import { usePrizeDetailController } from "@/src/hooks/usePrizeDetail";
import { usePrizeUserValue } from "@/src/hooks/usePrizeUser";
import { useUserValue } from "@/src/hooks/useUser";
import { isInitPrizeState } from "@/src/stores/isInitPrizeState";
import { layoutEffectOfSSR } from "@/src/util/layoutEffectOfSSR";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

/**
 * Main: Cube
 * @layout
 * @author keit
 */
export const MainCube = () => {
  const user = useUserValue();
  const prizeList = usePrizeListValue();
  const prizeUserState = usePrizeUserValue();
  const cube = useCubeValue(user.id);
  const useLayoutEffectOfSSR = layoutEffectOfSSR();

  const isInitPrize = useRecoilValue(isInitPrizeState);

  const [isInitPrizeDetail, setIsInitPrizeDetail] = useState(false);
  const [cubeTmp, cubeTmpController] = useCubeTmpState();

  const prizeDetailController = usePrizeDetailController();
  const cubeController = useCubeController();

  const initPrizeDetail = async () => {
    if (!isInitPrize) return;
    const obtainedPrizeList = prizeList.filter((prize) => {
      const prizeUser = prizeUserState.get(prize.id)!;
      return prizeUser.obtained;
    });
    try {
      await prizeDetailController.fetch(obtainedPrizeList);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.log(e);
    }
    setIsInitPrizeDetail(true);
  };

  const initCubeTmp = async () => {
    if (cube === undefined) return;
    cubeTmpController.init(cube);
  };

  const handleSaveClick = async () => {
    try {
      await cubeController.updateIfChanged(user.id, cubeTmp, cube!);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      console.log(e);
    }
  };

  useLayoutEffectOfSSR(() => {
    initPrizeDetail();
  }, [isInitPrize]);

  useLayoutEffectOfSSR(() => {
    initCubeTmp();
  }, [cube]);

  if (!isInitPrizeDetail || cubeTmp.length === 0)
    return (
      <div
        className={clsx(
          "w-[100%]",
          "h-[100%]",
          "flex",
          "justify-center",
          "items-center",
          "bg-[#34373b]",
        )}
      >
        <Spinner className={clsx("w-[50px]", "h-[50px]", "border-[4px]")} />
      </div>
    );
  return (
    <>
      <MyCube
        className={clsx("w-[100%]", "h-[100%]", "bg-[#34373b]")}
        type={FLOOR_TYPE.cube}
        cube={cubeTmp}
      />
      <Link
        href=""
        className={clsx(
          "cursor-pointer",
          "absolute",
          "top-[20px]",
          "left-[20px]",
        )}
        onClick={handleSaveClick}
      >
        <Image
          className={clsx("min-w-[30px]", "max-w-[30px]", "h-auto")}
          src="/img/save_as.svg"
          alt="settingIcon"
          width={100}
          height={100}
        />
      </Link>
      <Link
        href="/mybase"
        className={clsx(
          "cursor-pointer",
          "absolute",
          "top-[20px]",
          "right-[20px]",
        )}
      >
        <Image
          className={clsx("min-w-[30px]", "max-w-[30px]", "h-auto")}
          src="/img/close.svg"
          alt="settingIcon"
          width={100}
          height={100}
        />
      </Link>
      <CubeEditor className={clsx("absolute", "bottom-[20px]")} />
    </>
  );
};
