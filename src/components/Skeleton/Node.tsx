import classNames from 'classnames';
import * as React from 'react';
import type { SkeletonElementProps } from './Element';
import { EllipsisHorizontalOutlined } from 'icons';

export interface SkeletonNodeProps
  extends Omit<SkeletonElementProps, 'size' | 'shape'> {
  fullSize?: boolean;
  children?: React.ReactNode;
}

const SkeletonNode: React.FC<SkeletonNodeProps> = (props) => {
  const { className, rootClassName, style, active, children } = props;

  const cls = classNames(
    'tera-skeleton',
    `tera-skeleton-element`,
    {
      [`tera-skeleton-active`]: active,
    },

    className,
    rootClassName,
  );

  const content = children ?? (
    <EllipsisHorizontalOutlined className="w-4 h-4" />
  );

  return (
    <div className={cls}>
      <div
        className={classNames(`tera-skeleton-image`, className)}
        style={style}
      >
        {content}
      </div>
    </div>
  );
};

export default SkeletonNode;
