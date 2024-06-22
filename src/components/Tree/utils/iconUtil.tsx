import * as React from 'react';
import classNames from 'classnames';
import type { AntTreeNodeProps, SwitcherIcon, TreeLeafIcon } from '../Tree';
import {
  ArrowPathOutlined,
  ChevronDownOutlined,
  DocumentOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from 'icons';
import { cloneElement } from './reactNode';

interface SwitcherIconProps {
  prefixCls: string;
  treeNodeProps: AntTreeNodeProps;
  switcherIcon?: SwitcherIcon;
  showLine?: boolean | { showLeafIcon: boolean | TreeLeafIcon };
}

const SwitcherIconCom: React.FC<SwitcherIconProps> = (props) => {
  const { prefixCls = 'tera', switcherIcon, treeNodeProps, showLine } = props;

  const { isLeaf, expanded, loading } = treeNodeProps;

  if (loading) {
    return (
      <ArrowPathOutlined
        className={`${prefixCls}-switcher-loading-icon w-4 h-4`}
      />
    );
  }
  let showLeafIcon: boolean | TreeLeafIcon;
  if (showLine && typeof showLine === 'object') {
    showLeafIcon = showLine.showLeafIcon;
  }

  if (isLeaf) {
    if (!showLine) {
      return null;
    }

    if (typeof showLeafIcon !== 'boolean' && !!showLeafIcon) {
      const leafIcon =
        typeof showLeafIcon === 'function'
          ? showLeafIcon(treeNodeProps)
          : showLeafIcon;
      const leafCls = `${prefixCls}-switcher-line-custom-icon`;

      if (React.isValidElement(leafIcon)) {
        return cloneElement(leafIcon, {
          className: classNames(leafIcon.props.className || '', leafCls),
        });
      }

      return leafIcon as unknown as React.ReactElement;
    }

    return showLeafIcon ? (
      <DocumentOutlined className={`${prefixCls}-switcher-line-icon w-4 h-4`} />
    ) : (
      <span className={`${prefixCls}-switcher-leaf-line w-4 h-4`} />
    );
  }

  const switcherCls = `${prefixCls}-switcher-icon w-4 h-4`;

  const switcher =
    typeof switcherIcon === 'function'
      ? switcherIcon(treeNodeProps)
      : switcherIcon;

  if (React.isValidElement(switcher)) {
    return cloneElement(switcher, {
      className: classNames(switcher.props.className || '', switcherCls),
    });
  }

  if (switcher !== undefined) {
    return switcher as unknown as React.ReactElement;
  }

  if (showLine) {
    return expanded ? (
      <MinusCircleOutlined
        className={`${prefixCls}-switcher-line-icon w-4 h-4`}
      />
    ) : (
      <PlusCircleOutlined
        className={`${prefixCls}-switcher-line-icon w-4 h-4`}
      />
    );
  }
  return <ChevronDownOutlined className={switcherCls} />;
};

export default SwitcherIconCom;
