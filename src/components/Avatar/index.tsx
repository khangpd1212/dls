import { useTera } from 'lib';
import { isString } from 'lodash';
import React, { forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export type AvatarProps = {
  alt?: string;
  src?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  srcSet?: string;
  size?: number;
  className?: string;
};
const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ alt, src, icon, children, srcSet, className }, ref) => {
    const hasImageElement = React.isValidElement(src);
    const avatarClasses = customTwMerge(
      'relative flex items-center justify-center w-8 h-8 overflow-hidden text-center align-middle bg-transparent border border-transparent rounded-full whitespace-nowrap',
      children && 'text-white bg-gray-300',
      className,
    );
    let childrenToRender: React.ReactNode;
    if (isString(src)) {
      childrenToRender = (
        <img
          src={src}
          srcSet={srcSet}
          alt={alt}
          className="object-cover w-full h-full"
        />
      );
    } else if (hasImageElement) {
      childrenToRender = src;
    } else if (icon) {
      childrenToRender = icon;
    } else {
      childrenToRender = children;
    }

    const { is_verify } = useTera();
    if (!is_verify) return null;

    return (
      <span ref={ref} className={avatarClasses}>
        {childrenToRender}
      </span>
    );
  },
);

export default Avatar;
