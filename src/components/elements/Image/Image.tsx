import NextImage from "next/image";
import clsx from "clsx";

export type ImageProps = {
  className?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * 画像
 * @component
 * @author keit
 * @param className 親要素から渡されたスタイル
 * @param src 画像URL
 * @param alt 画像タイトル
 * @param width 画像幅
 * @param height 画像高さ
 */
export const Image = ({ className, src, alt, width, height }: ImageProps) => {
  return (
    <NextImage
      className={clsx(className)}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};
