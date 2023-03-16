import { PRIZE_OBJ_TYPE } from "@/src/const/cube";
import { PrizeObj } from "@/src/features/cube";
import { PrizeButton } from "@/src/features/prize/components/PrizeButton";
import { PrizeDetailModel } from "@/src/models/PrizeDetailModel";
import { PrizeModel } from "@/src/models/PrizeModel";
import { PrizeUserModel } from "@/src/models/PrizeUserModel";
import { BaseProps } from "@/src/types/BaseProps";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";

export type PrizeProps = {
  prize: PrizeModel;
  prizeUser: PrizeUserModel;
  prizeDetail: PrizeDetailModel;
} & BaseProps;

/**
 * 報酬
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param prize プライズ情報
 * @param prizeUser プライズユーザー情報
 * @param prizeDetail プライズトークン情報
 */
export const Prize = ({
  className,
  prize,
  prizeUser,
  prizeDetail,
}: PrizeProps) => {
  if (prizeDetail === undefined) return <></>;
  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "w-[100%]",
        "h-[100%]",
        "py-[5px]",
        className,
      )}
    >
      <div
        className={clsx(
          "bg-black-900",
          "rounded-full",
          "m-2",
          "w-[110px]",
          "h-[110px]",
        )}
      >
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <PrizeObj
            prizeId={prize.id}
            position={{ x: 0, y: 0, z: 0 }}
            rotation={{ x: 0, y: 0, z: 0 }}
            type={PRIZE_OBJ_TYPE.passport}
          />
          <OrbitControls makeDefault dampingFactor={0.3} />
          <OrthographicCamera
            makeDefault
            zoom={30}
            position={[10, 10 * 0.8, 10]}
          />
        </Canvas>
      </div>
      <div className={clsx("text-xl", "m-2", "line-clamp-1", "w-[130px]")}>
        {prizeDetail.name}
      </div>
      <PrizeButton
        className={clsx("w-[120px]", "m-2")}
        prize={prize}
        prizeUser={prizeUser}
      />
    </div>
  );
};
