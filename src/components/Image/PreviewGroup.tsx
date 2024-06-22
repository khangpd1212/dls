import { isArray } from 'lodash';
import React, { Children, cloneElement, useState } from 'react';
import { ImageProps } from '.';
import Preview from './Preview';
export interface PreviewGroupProps {
  // items?: string[];
  children: React.ReactElement<ImageProps>[];
  // preview?: PreviewGroupType | boolean;
}
export interface PreviewGroupType {
  current?: number;
}
const PreviewGroup = ({ children }: PreviewGroupProps) => {
  const [currentPreview, setCurrentPreview] = useState(0);
  const [openPreview, setOpenPreview] = useState(false);
  const lastIndexImage = isArray(children) && children.length - 1;

  const handleOpen = (key) => {
    setCurrentPreview(key);
    setOpenPreview(true);
    document.body.className = 'overflow-hidden';
  };

  const imageCurrentProps = children?.[currentPreview]?.props;

  return (
    <>
      {Children.map(children, (child, key) =>
        cloneElement(child, {
          onClick: (e) => {
            handleOpen(key);
            child.props.onClick?.(e);
          },
        }),
      )}
      <Preview
        imageCurrentProps={imageCurrentProps}
        listPreview={children}
        lastIndexImage={lastIndexImage}
        openPreview={openPreview}
        setOpenPreview={setOpenPreview}
        setCurrentPreview={setCurrentPreview}
        currentPreview={currentPreview}
      />
    </>
  );
};

export default PreviewGroup;
