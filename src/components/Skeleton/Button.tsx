import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import type { SkeletonElementProps } from './Element';
import Element from './Element';

export interface SkeletonButtonProps
  extends Omit<SkeletonElementProps, 'size'> {
  size?: 'large' | 'small' | 'default';
  block?: boolean;
}

const SkeletonButton: React.FC<SkeletonButtonProps> = (props) => {
  const {
    className,
    rootClassName,
    active,
    block = false,
    size = 'default',
  } = props;

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
      <Element prefixCls={`tera-skeleton-button`} size={size} {...otherProps} />
    </div>
  );
};

export default SkeletonButton;
