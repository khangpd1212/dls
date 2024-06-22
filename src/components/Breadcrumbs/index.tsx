import { useTera } from 'lib';
import { isString } from 'lodash';
import { Fragment, ReactElement, ReactNode, cloneElement } from 'react';
import { customTwMerge } from 'tailwind-merge.config';

export interface BreadcrumbsProps {
  items?: ItemType[];
  separator?: ReactNode;
  className?: string;
  containerItemClassName?: string;
}

export interface ItemType {
  title?: ReactElement | string;
  children?: ItemType[];
  onClick?: (e: any) => void;
}
const Breadcrumbs = ({
  items,
  separator,
  className,
  containerItemClassName,
  ...restProps
}: BreadcrumbsProps) => {
  const defaultClasses =
    'flex items-center gap-1 text-xxs italic dark:text-gray-400 dark:hover:text-white text-gray-800';
  const breadcrumbsItemClasses = customTwMerge(
    defaultClasses,
    containerItemClassName,
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;
  return (
    <ol
      className={customTwMerge('flex items-center', className)}
      aria-label="Breadcrumb"
      {...restProps}
    >
      {items.map((item, key) => (
        <Fragment key={key}>
          <li className={breadcrumbsItemClasses} onClick={item.onClick}>
            {key !== 0 && <span className="mx-2">{separator || '>'}</span>}
            {isString(item.title) ? (
              <span className="font-bold">{item.title}</span>
            ) : (
              cloneElement(item.title, {
                className: customTwMerge(
                  'hover:text-blue-600 cursor-pointer font-normal',
                  item.title?.props?.className,
                ),
              })
            )}
          </li>
        </Fragment>
      ))}
    </ol>
  );
};

export default Breadcrumbs;
