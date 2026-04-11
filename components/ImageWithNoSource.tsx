"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface Props extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackSrc?: string;
}

const ImageWithFallback = ({ src, fallbackSrc = "/images/no-image.svg", alt, className, ...props }: Props) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [isFallback, setIsFallback] = useState<boolean>(!src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "image"}
      className={clsx(className, {
        "dark:text-white": isFallback,
      })}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
          setIsFallback(true);
        }
      }}
    />
  );
};

export default ImageWithFallback;
