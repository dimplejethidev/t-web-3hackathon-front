import { useRef, useState } from "react";
import { FLOOR_TYPE, MAX_ZOOM } from "@/src/const/cube";
import { Floor } from "@/src/features/cube/components/Floor";
import { PrizeObj } from "@/src/features/cube/components/PrizeObj";
import { CubeModel } from "@/src/models/CubeModel";
import { BaseProps } from "@/src/types/BaseProps";
import { layoutEffectOfSSR } from "@/src/util/layoutEffectOfSSR";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";

export type MyCubeProps = {
  type?: FLOOR_TYPE;
  cube: CubeModel[];
} & BaseProps;

/**
 * 箱庭
 * @feature
 * @author keit
 * @param className 親要素から指定されたスタイル
 * @param type フロアタイプ
 */
export const MyCube = ({
  className,
  type = FLOOR_TYPE.mybase,
  cube,
}: MyCubeProps) => {
  const [zoom, setZoom] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const useLayoutEffectOfSSR = layoutEffectOfSSR();

  useLayoutEffectOfSSR(() => {
    window.addEventListener("resize", () => {
      let width = containerRef.current?.clientWidth;
      if (width === undefined) return;
      width = width / 15;
      if (width > MAX_ZOOM) width = MAX_ZOOM;
      setZoom(width);
    });
    let width = containerRef.current?.clientWidth;
    if (width === undefined) return;
    width = width / 15;
    if (width > MAX_ZOOM) width = MAX_ZOOM;
    setZoom(width);
  }, []);

  return (
    <div ref={containerRef} className={clsx(className)}>
      <Canvas
        orthographic
        camera={{ position: [20, 20 * 0.8, 20], zoom: zoom }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 20, -20]} />
        {cube.map((obj, index) => {
          if (!obj.set) return <mesh key={index}></mesh>;
          return (
            <mesh key={index}>
              <PrizeObj
                prizeId={obj.prizeId}
                position={obj.position}
                rotation={obj.rotation}
              />
            </mesh>
          );
        })}
        <Floor type={type} />
        <OrbitControls
          makeDefault
          enableZoom={true}
          enablePan={true}
          enableRotate={false}
          zoomSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};
