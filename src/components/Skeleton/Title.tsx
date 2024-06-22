import classNames from 'classnames';
import * as React from 'react';

export interface SkeletonTitleProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
}

const Title: React.FC<SkeletonTitleProps> = ({
  prefixCls,
  className,
  width,
  style,
}) => (
  <h3
    className={classNames(prefixCls, className, 'h-5 bg-gray-200 rounded')}
    style={{ width, ...style }}
  />
);

export default Title;
