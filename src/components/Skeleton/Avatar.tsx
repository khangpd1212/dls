import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';

import type { SkeletonElementProps } from './Element';
import Element from './Element';

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
  shape?: 'circle' | 'square';
}

const SkeletonAvatar: React.FC<AvatarProps> = (props) => {
  const {
    className,
    rootClassName,
    active,
    shape = 'circle',
    size = 'default',
  } = props;

  const otherProps = omit(props, ['prefixCls', 'className']);
  const cls = classNames(
    'tera-skeleton',
    `tera-skeleton-element`,
    {
      [`tera-skeleton-active`]: active,
    },
    className,
    rootClassName,
  );

  return (
    <div className={cls}>
      <Element
        prefixCls={`tera-skeleton-avatar`}
        shape={shape}
        size={size}
        {...otherProps}
      />
    </div>
  );
};

export default SkeletonAvatar;
