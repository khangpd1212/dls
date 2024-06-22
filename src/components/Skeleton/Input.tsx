import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';

import type { SkeletonElementProps } from './Element';
import Element from './Element';

export interface SkeletonInputProps
  extends Omit<SkeletonElementProps, 'size' | 'shape'> {
  size?: 'large' | 'small' | 'default';
  block?: boolean;
}

const SkeletonInput: React.FC<SkeletonInputProps> = (props) => {
  const { className, rootClassName, active, block, size = 'default' } = props;

  const otherProps = omit(props, ['prefixCls']);
  const cls = classNames(
    'tera-skeleton',
    `tera-skeleton-element`,
    {
      [`tera-skeleton-active`]: active,
      [`tera-skeleton-block`]: block,
    },
    className,
    rootClassName,
  );

  return (
    <div className={cls}>
      <Element prefixCls={`tera-skeleton-input`} size={size} {...otherProps} />
    </div>
  );
};

export default SkeletonInput;
