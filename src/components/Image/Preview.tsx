import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ImageProps } from '.';
import OperationsPreview from './OperationsPreview';
import { useOnClickOutside } from 'hooks';
import DefaultImage from './DefaultImage';

type PreviewProps = {
  listPreview?: React.ReactElement<ImageProps>[];
  imageCurrentProps?: ImageProps;
  openPreview?: boolean;
  setOpenPreview?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPreview?: React.Dispatch<React.SetStateAction<number>>;
  currentPreview?: number;
  lastIndexImage?: number;
};

export type PreviewRef = {
  listPreviewRef: React.MutableRefObject<HTMLImageElement>;
  previewImgRef: React.MutableRefObject<HTMLImageElement>;
  operationsRef: React.MutableRefObject<HTMLDivElement>;
};
const Preview = forwardRef<PreviewRef, PreviewProps>(
  (
    {
      imageCurrentProps,
      openPreview,
      listPreview,
      setCurrentPreview,
      currentPreview,
      lastIndexImage,
      setOpenPreview,
    },
    ref,
  ) => {
    const previewImgRef = useRef<HTMLImageElement>(null);
    const listPreviewRef = useRef<HTMLImageElement>(null);
    const operationsRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
      setOpenPreview(false);
      document.body.className = '';
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          previewImgRef,
          listPreviewRef,
          operationsRef,
        };
      },
      [ref],
    );

    useOnClickOutside(
      [previewImgRef, listPreviewRef, operationsRef],
      handleClose,
    );

    const nodePreviewImage = imageCurrentProps && (
      <DefaultImage
        src={
          typeof imageCurrentProps.preview === 'object'
            ? imageCurrentProps.preview.src
            : imageCurrentProps.src
        }
        ref={previewImgRef}
        alt={imageCurrentProps.alt}
        className="max-w-full max-h-[70%] align-middle cursor-grab select-none transition-transform"
      />
    );

    const nodePreviewListImage = !!listPreview?.length && (
      <div className="flex items-center mt-5 gap-9" ref={listPreviewRef}>
        {listPreview.map((image, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${image.props.src})`,
            }}
            className="bg-cover bg-no-repeat rounded-[10px] w-[100px] h-[100px] opacity-70 cursor-pointer select-none"
            onClick={() => setCurrentPreview(index)}
          >
            <img
              src={image.props.src}
              className="invisible"
              alt={image.props.alt}
            />
          </div>
        ))}
      </div>
    );

    const bgMask = (
      <div className="fixed inset-0 z-[100] h-full backdrop-brightness-50" />
    );
    return (
      <>
        {openPreview &&
          createPortal(
            <div className="preview-image">
              {bgMask}
              <div className="fixed inset-0 overflow-auto outline-none z-[101]">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {nodePreviewImage}
                  {nodePreviewListImage}
                </div>
              </div>
            </div>,
            document.body,
          )}
        <OperationsPreview
          current={currentPreview}
          setCurrent={setCurrentPreview}
          ref={operationsRef}
          lastIndexImage={lastIndexImage}
          showOperations={openPreview && !!listPreview?.length}
        />
      </>
    );
  },
);

export default Preview;
