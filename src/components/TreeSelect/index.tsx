import Portal from '@rc-component/portal';
import { FormItemContext } from 'components/Form/FormItem';
import { CustomTagProps } from 'components/Select';
import {
  ChevronDownOutlined,
  DivProps,
  Empty,
  Placement,
  Search,
  Tag,
  XCircleSolid,
  autoUpdate,
  flip,
  getChildrenInNestedArray,
  offset,
  shift,
  updateToggleValueInArr,
  useFloating,
  useHover,
  useOnClickOutside,
  useTera,
} from 'lib';
import { findIndex, flatMapDeep, isArray, isEmpty, isNil } from 'lodash';
import CSSMotion from 'rc-motion';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { composeRef } from 'rc-util/lib/ref';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  ReactElement,
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import Option, { OptionProps } from './Option';
import useFilterTreeData from './hooks/useFilterTreeData';
import { RawValueType } from './interface';
export type TreeSelectProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'ref' | 'onSelect' | 'onChange' | 'defaultValue' | 'value'
> & {
  treeData?: OptionProps[];
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  searchValue?: string;
  allowClear?: boolean;
  onChange?: (value: any) => void;
  onSelect?: (value: any | ChangeEvent<Element>) => void;
  placement?: Placement;
  dropdownClassName?: string;
  defaultValue?: any;
  value?: any;
  onClear?: () => void;
  notFoundContent?: ReactNode;
  divProps?: DivProps;
  tagRender?: (props: CustomTagProps) => ReactElement;
  onBlur?: (value: any | ChangeEvent<Element>) => void;
  multiple?: boolean;
  getPopupContainer?: () => Element | DocumentFragment;
  treeExpandedKeys?: (string | number)[];
  treeDefaultExpandedKeys?: (string | number)[];
  onTreeExpanded?: (expandedKeys: string[]) => void;
  treeDefaultExpandAll?: boolean;
  treeCheckable?: boolean;
  treeCheckStrictly?: boolean;
  treeLine?: boolean;
  onChangeCustom?: (value: any) => void;
};

const getValue = <T extends OptionProps[] | OptionProps>(
  options: T,
): T extends OptionProps[] ? RawValueType[] : RawValueType => {
  if (isArray(options)) {
    return options.map((item) => item.value) as any;
  } else {
    return (options?.value || null) as any;
  }
};

const TreeSelect = forwardRef<HTMLDivElement, TreeSelectProps>((props, ref) => {
  const {
    placement,
    className,
    disabled,
    searchValue,
    divProps,
    placeholder = 'Vui lòng chọn',
    allowClear,
    treeData,
    dropdownClassName,
    onChange,
    onClear,
    onBlur,
    multiple,
    tagRender,
    showSearch,
    onSearch,
    notFoundContent,
    getPopupContainer = () => document.body,
    value,
    treeDefaultExpandedKeys,
    onTreeExpanded,
    treeCheckable,
    treeCheckStrictly,
    onSelect,
    treeDefaultExpandAll = true,
    treeLine = true,
    onChangeCustom,
  } = props;
  const { is_verify } = useTera();
  const [mergeSearchValue, setSearchValue] = useMergedState('', {
    value: searchValue,
    postState: (search) => search || '',
  });

  const filteredTreeDataBySearch =
    useFilterTreeData(treeData, mergeSearchValue) || [];

  const mergedCheckable = treeCheckable || treeCheckStrictly;
  const mergedMultiple = mergedCheckable || multiple;

  const flatTreeData: OptionProps[] = flatMapDeep(treeData, (option) =>
    getChildrenInNestedArray(option),
  );

  const [currentOption, setCurrentOption] = useMergedState<
    OptionProps | OptionProps[]
  >(mergedMultiple ? [] : {}, {
    onChange: (valueOption) => {
      onChange?.(getValue(valueOption));
      onChangeCustom?.(getValue(valueOption));
    },
    value:
      value &&
      (mergedMultiple
        ? flatTreeData.filter((option) => value.includes(option.value))
        : flatTreeData.find((option) => value === option.value)),
  });

  const [checkedKeys, setCheckedKeys] = useState([]);
  // const filteredDataByC = useFilterTreeData(treeData, currentValue, 'value');
  // function conductChecked() {
  //   if (!isArray(currentOption)) return;
  //   const flatCurrentOptions: OptionProps[] = flatMapDeep(
  //     currentOption,
  //     (option) => getChildrenInNestedArray(option),
  //   );
  //   setCheckedKeys(getValue(flatCurrentOptions));
  // }

  // useEffect(() => {
  //   conductChecked();
  // }, [currentOption]);

  const currentValue = useMemo(() => getValue(currentOption), [currentOption]);
  const treeDataValue = useMemo(() => getValue(flatTreeData), [flatTreeData]);

  const [treeExpandedKeys, setTreeExpandedKeys] = useMergedState<
    RawValueType[]
  >([], {
    defaultValue: treeDefaultExpandedKeys,
    value: props.treeExpandedKeys,
    onChange: onTreeExpanded,
  });

  useEffect(() => {
    setTreeExpandedKeys(treeDefaultExpandAll ? treeDataValue : []);
  }, [treeDefaultExpandAll, treeData]);

  const { refs, floatingStyles } = useFloating<HTMLDivElement>({
    placement: placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  });
  const selectRef = refs.reference;
  const { isHover: isHoverSelect } = useHover(selectRef);

  const [showDropdown, setShowDropdown] = useState(false);
  const [focused, setFocused] = useState(false);

  const formItemContext = useContext(FormItemContext);

  const defaultClasses =
    'w-full rounded-xsm cursor-pointer border py-1.5 px-4 hover:border-blue-700';
  const statusValidationStyles = () => {
    if (formItemContext) {
      return customTwMerge(
        formItemContext?.isError
          ? focused && 'ring ring-red-300'
          : focused && 'ring ring-blue-300 border-blue-700',
        formItemContext?.isError && 'border-red-700 hover:border-red-700',
      );
    } else {
      return customTwMerge(focused && 'ring ring-blue-300 border-blue-700');
    }
  };
  const disabledClasses = 'bg-gray-100 hover:border-gray-200';

  const customClasses = customTwMerge(
    defaultClasses,
    className,
    statusValidationStyles(),
    disabled && disabledClasses,
  );

  const onInternalSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
    onSearch?.(e.target.value);
  };

  const toggleDropdownOption = () => {
    if (!disabled) {
      setShowDropdown(!showDropdown);
      setFocused(true);
      isNil(searchValue) && setSearchValue('');
    }
  };

  const onBlurSelect = () => {
    if (!disabled) {
      setFocused(false);
      setShowDropdown(false);
      onBlur?.(currentValue);
    }
  };

  const onClearValue = () => {
    setCurrentOption(mergedMultiple ? [] : {});
    onClear?.();
  };

  const onSelectOption = useCallback(
    (option: OptionProps) => {
      setCurrentOption((prevOption: OptionProps[]) => {
        if (mergedMultiple) {
          const indexItem = findIndex(
            prevOption,
            (item) => item.value === option.value,
          );
          const arrOption = updateToggleValueInArr(
            indexItem,
            option,
            prevOption,
          );
          return arrOption;
        } else {
          return option;
        }
      });

      onSelect?.(getValue(option));
      !mergedMultiple && onBlurSelect();
    },
    [mergedMultiple],
  );

  useOnClickOutside([refs.floating, selectRef], onBlurSelect);

  const iconNode = () => {
    if (
      !disabled &&
      isHoverSelect &&
      allowClear &&
      !isEmpty(filteredTreeDataBySearch)
    ) {
      return (
        <XCircleSolid
          className="relative text-gray-400 cursor-pointer hover:text-gray-500"
          onClick={onClearValue}
        />
      );
    } else {
      return <ChevronDownOutlined className="stroke-2" />;
    }
  };
  function listOptionNode() {
    const dropdownOptionClasses = customTwMerge(
      'absolute z-[80] list-none shadow-smd bg-white rounded-lg',
      dropdownClassName,
    );

    const dropdownOptions = filteredTreeDataBySearch.map((item) => (
      <Option
        setTreeExpandedKeys={setTreeExpandedKeys}
        treeExpandedKeys={treeExpandedKeys}
        active={
          isArray(currentValue)
            ? currentValue.includes(item.value)
            : item.value === currentValue
        }
        key={item.value}
        level={0}
        treeLine={treeLine}
        onSelect={onSelectOption}
        currentValue={currentValue}
        treeCheckable={mergedCheckable}
        checked={checkedKeys.includes(item.value)}
        {...item}
      />
    ));

    return (
      <CSSMotion visible={showDropdown} motionName="opacity-motion">
        {({ className }) => (
          <div
            className={customTwMerge(dropdownOptionClasses, className)}
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              width: selectRef.current.offsetWidth,
            }}
          >
            {showSearch && (
              <Search
                value={mergeSearchValue}
                onChange={onInternalSearch}
                className="rounded-xsm"
                containerClassName="m-2.5"
              />
            )}
            <div className="overflow-y-auto max-h-64 my-2.5 ml-2.5">
              {filteredTreeDataBySearch.length > 0 ? (
                notFoundContent || (
                  <div className="flex flex-col items-stretch">
                    {dropdownOptions}
                  </div>
                )
              ) : (
                <Empty classNameImage="w-12" className="cursor-default" />
              )}
            </div>
          </div>
        )}
      </CSSMotion>
    );
  }
  const valueSelect = () => {
    const labelClasses = customTwMerge(
      'py-1 truncate',
      showDropdown && 'text-gray-400',
    );
    if (isArray(currentOption)) {
      return (
        <div className="flex flex-wrap items-center flex-auto max-w-full gap-1 overflow-hidden">
          {currentOption &&
            currentOption.map((option) => {
              const closable = !option.disabled || !disabled;
              return typeof tagRender === 'function' ? (
                tagRender({
                  value: option.value,
                  label: option.labelDisplay,
                  disabled: option.disabled,
                  onClose: () => onSelectOption(option),
                  closable: closable,
                })
              ) : (
                <Tag
                  key={option.value}
                  closable={!disabled}
                  className="py-1"
                  onClose={() => onSelectOption(option)}
                >
                  {option.label}
                </Tag>
              );
            })}
        </div>
      );
    } else {
      return <div className={labelClasses}>{currentOption.label}</div>;
    }
  };

  if (!is_verify) return null;
  return (
    <>
      <div
        className={customClasses}
        onClick={toggleDropdownOption}
        ref={composeRef(refs.setReference, ref)}
        {...divProps}
      >
        <div className="flex items-center justify-between gap-5 text-xxs">
          {!isEmpty(currentOption) ? (
            valueSelect()
          ) : (
            <div className="my-1 text-gray-400 truncate">{placeholder}</div>
          )}
          <i className="flex-shrink-0 w-4 h-4">{iconNode()}</i>
        </div>
      </div>
      <Portal
        getContainer={getPopupContainer && (() => getPopupContainer())}
        open={showDropdown}
        autoDestroy
      >
        {listOptionNode()}
      </Portal>
    </>
  );
});
if (process.env.NODE_ENV !== 'production') {
  TreeSelect.displayName = 'TreeSelect';
}
export default TreeSelect;
