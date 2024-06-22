import { useState } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import { ImageProps } from '.';
import DefaultImage from './DefaultImage';
import Preview from './Preview';
const ImageInternal = (props: ImageProps) => {
  const {
    src,
    width,
    // borderRadius,
    defaultImage,
    imageClassName,
    containerClassName,
    onClick,
    ...restProps
  } = props;

  const [openPreview, setOpenPreview] = useState(false);
  // const imgRef = useRef<HTMLDivElement>(null);
  // const { isHover } = useHover(imgRef);

  const handleClick = (e) => {
    if (!onClick) {
      setOpenPreview(true);
      document.body.className = 'overflow-hidden';
    }
    onClick?.(e);
  };
  return (
    <div
      style={{ width: width }}
      // ref={imgRef}
      onClick={handleClick}
      {...restProps}
      className={customTwMerge(
        'relative inline-block h-full group',
        containerClassName,
      )}
    >
      {/* <div
        style={{ borderRadius, width, backgroundImage: `url(${src})` }}
        className={customTwMerge(
          'bg-cover bg-no-repeat h-full w-full',
          imageClassName,
        )}
      > */}
      <DefaultImage
        src={src}
        alt={src}
        defaultSrc={defaultImage}
        className={customTwMerge('h-full w-full', imageClassName)}
      />
      {/* </div> */}
      <div
        className={customTwMerge(
          'absolute top-0 left-0 w-full h-full flex items-center justify-center text-white cursor-pointer bg-black/50 opacity-0 group-hover:opacity-100',
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-[50%] h-[50%]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
      <Preview
        imageCurrentProps={props}
        openPreview={openPreview}
        setOpenPreview={setOpenPreview}
      />
    </div>
  );
};

export default ImageInternal;
