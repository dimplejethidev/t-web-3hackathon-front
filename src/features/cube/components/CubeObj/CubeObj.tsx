import { useState } from "react";
import { Button } from "@/src/components/elements/Button";
import { PRIZE_OBJ_TYPE } from "@/src/const/cube";
import { PrizeObj } from "@/src/features/cube";
import { useCubeTmpState } from "@/src/hooks/useCubeTmp";
import { PrizeDetailModel } from "@/src/models/PrizeDetailModel";
import { PrizeModel } from "@/src/models/PrizeModel";
import { BaseProps } from "@/src/types/BaseProps";
import { layoutEffectOfSSR } from "@/src/util/layoutEffectOfSSR";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";

export type CubeObjProps = {
  prize: PrizeModel;
  prizeDetail: PrizeDetailModel;
} & BaseProps;

/**
 * 報酬
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param prize プライズ情報
 * @param prizeDetail プライズ詳細情報
 */
export const CubeObj = ({ className, prize, prizeDetail }: CubeObjProps) => {
  const [cubeTmp, cubeTmpController] = useCubeTmpState();
  const [isSet, setIsSet] = useState(false);
  const useLayoutEffectOfSSR = layoutEffectOfSSR();

  const handleClick = () => {
    let i;
    for (i = 0; i < cubeTmp.length; i++) {
      if (!cubeTmp[i].set) break;
    }
    cubeTmpController.update(i, prize.id);
  };

  useLayoutEffectOfSSR(() => {
    for (let i = 0; i < cubeTmp.length; i++) {
      if (!cubeTmp[i].set) continue;
      if (cubeTmp[i].prizeId === prize.id) {
        setIsSet(true);
        return;
      }
    }
    setIsSet(false);
  }, [cubeTmp]);

  return (
    <Button
      disable={isSet}
      className={clsx(
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "w-[150px]",
        "h-[100%]",
        "rounded-xl",
        className,
      )}
      variant="trueblack"
      onClick={handleClick}
    >
      <div className={clsx("rounded-full", "m-2", "w-[110px]", "h-[110px]")}>
        <Canvas
          className={clsx(
            "bg-[#121212]",
            "rounded-full",
            "w-[110px]",
            "h-[110px]",
          )}
          orthographic
          camera={{ position: [10, 10 * 0.8, 10], zoom: 30 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <PrizeObj
            prizeId={prize.id}
            position={{ x: 0, y: 0, z: 0 }}
            rotation={{ x: 0, y: 0, z: 0 }}
            type={PRIZE_OBJ_TYPE.passport}
          />
          <OrbitControls makeDefault enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      <div
        className={clsx(
          "text-lg",
          "m-2",
          "line-clamp-1",
          "w-[130px]",
          "font-bold",
          "text-center",
        )}
      >
        {prizeDetail.name}
      </div>
    </Button>
  );
};
