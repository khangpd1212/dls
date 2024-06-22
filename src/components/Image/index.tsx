import { CSSProperties } from 'react';
import ImageInternal from './ImageInternal';
import PreviewGroup from './PreviewGroup';
import { DivProps } from 'common/interfaces';
import { useTera } from 'lib';
export interface ImageProps extends Omit<DivProps, 'className'> {
  src?: string;
  width?: number;
  alt?: string;
  borderRadius?: CSSProperties['borderRadius'];
  imageClassName?: string;
  containerClassName?: string;
  defaultImage?: string;
  preview?: { src?: string; visible?: boolean } | boolean;
}
export type { PreviewGroupProps, PreviewGroupType } from './PreviewGroup';
const Image = (props: ImageProps) => {
  const { is_verify } = useTera();

  if (!is_verify) return null;
  return <ImageInternal {...props} />;
};

if (process.env.NODE_ENV !== 'production') {
  Image.displayName = 'Image';
}

Image.PreviewGroup = PreviewGroup;

export default Image;
