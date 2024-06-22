import Dropdown, { DropdownItem, MenuDropdownProps } from 'components/Dropdown';
import {
  ChevronDownOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  EllipsisHorizontalOutlined,
} from 'icons';
import { useDetectDevice, useTera } from 'lib';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { useEffect, useMemo, useState } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
export interface PaginationProps {
  pageSizeOptions?: number[];
  total?: number;
  current?: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  classNameContainer?: string;
  classNameItem?: string;
  classNameActive?: string;
  pageSize?: number;
  disabled?: boolean;
  onChange?: (page?: number, pageSize?: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  pageSizeOptions = [10, 20, 50, 100],
  total = 200,
  defaultPageSize = 10,
  defaultCurrent = 1,
  onChange,
  disabled,
  pageSize = 10,
  classNameActive = 'text-blue-600 bg-blue-50',
  classNameContainer,
  classNameItem,
  current: customCurrent,
}) => {
  const [current, setCurrent] = useMergedState(customCurrent, {
    defaultValue: defaultCurrent,
    value: customCurrent,
  });
  const [currentPageSize, setCurrentPageSize] = useState(defaultPageSize);
  const dropdownPageSizeOptions: DropdownItem[] = pageSizeOptions.map(
    (pageSize) => ({
      key: pageSize,
      value: pageSize,
      label: `${pageSize}`,
    }),
  );

  const { isTablet, isMiniTablet } = useDetectDevice();

  const calculatePage = () => {
    return Math.floor((total - 1) / currentPageSize) + 1;
  };

  useEffect(() => {
    pageSize && setCurrentPageSize(pageSize);
  }, [pageSize]);

  const pages = Array.from({ length: calculatePage() }, (_, i) => {
    return i + 1;
  });
  const itemClasses = (page: number) => {
    const defaultClasses =
      'flex items-center justify-center px-3 ml-0 leading-tight border border-gray-200 h-9 text-[13px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700';
    return customTwMerge(
      defaultClasses,
      page === current
        ? classNameActive
        : 'bg-white hover:bg-gray-100 dark:hover:text-white',
      disabled && 'bg-gray-100',
      classNameItem,
    );
  };

  const onChangePage = (page: number) => {
    if (!disabled) {
      setCurrent(page);
      onChange?.(page, currentPageSize);
    }
  };
  const prevPage = (step = 1) => {
    if (!disabled) {
      current - step > 0 && onChangePage(current - step);
    }
  };
  const nextPage = (step = 1) => {
    if (!disabled) {
      current + step <= calculatePage() && onChangePage(current + step);
    }
  };
  const onChangePageSize: MenuDropdownProps['onChangeItem'] = (item) => {
    setCurrentPageSize(Number(item.value));
    onChange?.(current, Number(item.value));
  };

  // render list first page
  const renderFirstItem = useMemo(() => {
    let indexItem = 5;
    if (isTablet) indexItem = 3;
    if (isMiniTablet) indexItem = 2;

    if (pages?.length <= 9) {
      indexItem = pages?.length;
    } else if (current === 4) {
      indexItem = 6;
    } else if (current > 4) {
      indexItem = 1;
    }
    const cloneArr = [...pages];
    const result = cloneArr.slice(0, indexItem);
    return (
      <>
        {result.map((page) => (
          <li
            title={`${page}`}
            key={page}
            className={itemClasses(page)}
            onClick={() => onChangePage(page)}
          >
            {page}
          </li>
        ))}
      </>
    );
  }, [pages, current]);

  // render list last page
  const renderLastItem = useMemo(() => {
    if (pages?.length <= 9) return <></>;
    const lastIndex = pages?.length - 1;
    let indexItem = 0;

    if (current === lastIndex - 2) {
      indexItem = 5;
    } else if (current > lastIndex - 3) {
      indexItem = 4;
    }
    const cloneArr = [...pages];
    const result = cloneArr.splice(lastIndex - indexItem, indexItem + 1);

    return (
      <>
        {result.map((page) => (
          <li
            title={`${page}`}
            key={page}
            className={itemClasses(page)}
            onClick={() => onChangePage(page)}
          >
            {page}
          </li>
        ))}
      </>
    );
  }, [pages, current]);

  // render list prev item page
  const renderListPagePrev = useMemo(() => {
    const lastIndex = pages?.length - 1;
    if (pages?.length <= 9) return <></>;
    if (current < 5) return <></>;
    if (current > lastIndex - 3) return <></>;
    const cloneArr = [...pages];
    const result = cloneArr.splice(current - 3, 3);
    return (
      <>
        {result.map((page) => (
          <li
            title={`${page}`}
            key={page}
            className={itemClasses(page)}
            onClick={() => onChangePage(page)}
          >
            {page}
          </li>
        ))}
      </>
    );
  }, [pages, current]);

  // render list next item page
  const renderListPageNext = useMemo(() => {
    const lastIndex = pages?.length - 1;
    if (pages?.length <= 9) return <></>;
    if (current < 5) return <></>;
    if (current > lastIndex - 3) return <></>;
    const cloneArr = [...pages];
    const result = cloneArr.splice(current, 2);
    return (
      <>
        {result.map((page) => (
          <li
            title={`${page}`}
            key={page}
            className={itemClasses(page)}
            onClick={() => onChangePage(page)}
          >
            {page}
          </li>
        ))}
      </>
    );
  }, [pages, current]);

  // render jump prev icon
  const renderJumpPrevIcon = useMemo(() => {
    if (pages?.length <= 9) return <></>;
    if (current < 5) return <></>;
    return (
      <li
        title="Next 5 Pages"
        className="flex items-center justify-center px-3 ml-0 leading-tight h-9"
        onClick={() => prevPage(5)}
      >
        <EllipsisHorizontalOutlined className="w-4 h-4" />
      </li>
    );
  }, [pages, current]);

  // render jump next icon
  const renderJumpNextIcon = useMemo(() => {
    if (pages?.length <= 9) return <></>;
    if (current > pages?.length - 4) return <></>;
    return (
      <li
        title="Next 5 Pages"
        className="flex items-center justify-center px-3 ml-0 leading-tight h-9"
        onClick={() => nextPage(5)}
      >
        <EllipsisHorizontalOutlined className="w-4 h-4" />
      </li>
    );
  }, [pages, current]);
  const { is_verify } = useTera();
  if (!is_verify) return null;
  return (
    <nav
      aria-label="Navigation"
      className={customTwMerge(
        'flex items-center gap-4 text-base text-gray-900 h-9',
        classNameContainer,
      )}
    >
      <ul
        className={customTwMerge(
          'flex items-center -space-x-px cursor-pointer rounded-[3px]',
          disabled && 'bg-gray-100 cursor-not-allowed',
        )}
      >
        <li
          title="Previous Page"
          className={customTwMerge(
            'flex items-center justify-center px-3 ml-0 leading-tight bg-white border border-gray-200 rounded-l-[3px] h-9 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
            disabled && 'bg-gray-100',
            classNameItem,
          )}
          onClick={() => prevPage(1)}
        >
          <i className="w-3.5 h-3.5 text-gray-500">
            <ChevronLeftOutlined strokeWidth={3} />
          </i>
        </li>
        {renderFirstItem}
        {renderJumpPrevIcon}
        {renderListPagePrev}
        {renderListPageNext}
        {renderJumpNextIcon}
        {renderLastItem}
        <li
          title="Next Page"
          className={customTwMerge(
            'flex items-center justify-center px-3 ml-0 leading-tight bg-white border border-gray-200 rounded-r-[3px] h-9 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
            disabled && 'bg-gray-100',
            classNameItem,
          )}
          onClick={() => nextPage(1)}
        >
          <i className="w-3.5 h-3.5 text-gray-500">
            <ChevronRightOutlined strokeWidth={3} />
          </i>
        </li>
      </ul>

      <Dropdown
        trigger="click"
        disabled={disabled}
        menu={{
          items: dropdownPageSizeOptions,
          onChangeItem: onChangePageSize,
          selectable: true,
          selectedKeys: currentPageSize,
        }}
      >
        <div
          className={customTwMerge(
            'flex items-center  gap-2.5 px-3 border border-gray-200 h-9 hover:bg-gray-100 cursor-pointer rounded-[3px] text-gray-500',
            disabled && 'bg-gray-100 cursor-not-allowed',
          )}
        >
          <span className="text-[13px]">{currentPageSize} / Trang </span>
          <ChevronDownOutlined strokeWidth={3} className="w-3.5 h-3.5" />
        </div>
      </Dropdown>
    </nav>
  );
};

export default Pagination;
