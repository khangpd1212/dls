import {
  Placement,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom';
import { DivProps } from 'common/interfaces';
import Empty from 'components/Empty';
import { FormItemContext } from 'components/Form/FormItem';
import { Search } from 'components/Input';
import Tag from 'components/Tag';
import { ChevronDownOutlined, XCircleSolid } from 'icons';
import { Spin, useHover, useOnClickOutside, useTera } from 'lib';
import {
  filter,
  find,
  findIndex,
  get,
  indexOf,
  isArray,
  isEmpty,
  isNil,
  isString,
} from 'lodash';
import CSSMotion from 'rc-motion';
import { composeRef } from 'rc-util/lib/ref';
import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { customTwMerge } from 'tailwind-merge.config';
import { removeDiacritics, updateToggleValueInArr } from 'utils/function';
import Option, { OptionProps } from './Option';
import SpinOutlined from 'icons/SpinOutlined';

export interface CustomTagProps {
  label: ReactNode;
  value: any;
  disabled: boolean;
  onClose: (event?: MouseEvent<HTMLElement, MouseEvent>) => void;
  closable: boolean;
}
export interface SelectProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'ref' | 'onSelect' | 'onChange' | 'defaultValue' | 'value'
  > {
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  searchValue?: string;
  allowClear?: boolean;
  options?: OptionProps[];
  onChange?: (value: BaseValueType | ChangeEvent<Element>) => void;
  onSelect?: (
    value: ValueType | ValueType[] | BaseValueType,
    option?: OptionProps,
  ) => void;
  labelInValue?: boolean;
  mode?: 'multiple';
  placement?: Placement;
  dropdownClassName?: string;
  defaultValue?: BaseValueType;
  value?: BaseValueType;
  selectedValue?: OptionProps[] | OptionProps;
  onClear?: () => void;
  onChangeCustom?: (
    value: ValueType | ValueType[] | BaseValueType,
    selectedValue?: ValueType,
  ) => void;
  notFoundContent?: ReactNode;
  divProps?: DivProps;
  tagRender?: (props: CustomTagProps) => ReactElement;
  onBlur?: (value: BaseValueType | ChangeEvent<Element>) => void;
  getPopupContainer?: () => Element | DocumentFragment;
  extraNode?: ReactNode;
  placeholderClassName?: string;
  valueClassName?: string;
  loading?: boolean;
}
export type BaseValueType = number | string | (string | number)[];
export type ValueType = OptionProps;

const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    children,
    options = [],
    className,
    placeholder = 'Please select this',
    onSelect,
    onChangeCustom,
    onChange,
    onBlur,
    disabled,
    dropdownClassName,
    showSearch,
    searchPlaceholder,
    labelInValue,
    allowClear,
    onClear,
    mode,
    value,
    onSearch,
    notFoundContent,
    searchValue,
    selectedValue,
    placement = 'bottom-end',
    divProps,
    tagRender,
    getPopupContainer = () => document.body,
    extraNode,
    placeholderClassName,
    valueClassName,
    loading,
  } = props;
  const { refs, floatingStyles } = useFloating<HTMLDivElement>({
    placement: placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  });
  const selectRef = refs.reference;
  const formItemContext = useContext(FormItemContext);
  const { isHover: isHoverSelect } = useHover(selectRef);
  const isModeMultiple = mode === 'multiple';

  const cursorStyles = disabled ? 'cursor-not-allowed' : 'cursor-pointer';
  const defaultClasses =
    'w-full rounded-xsm border hover:border-blue-700 text-xxs relative';
  const disabledClasses = 'bg-gray-100 hover:border-gray-200';

  const [listOption, setListOption] = useState<OptionProps[]>([]);
  const [focused, setFocused] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [option, setOption] = useState<ValueType>({});
  const [optionMultiple, setOptionMultiple] = useState<OptionProps[]>([]);
  const [valueSearch, setValueSearch] = useState('');

  const cloneOptionMultiple = useRef<ValueType[]>([]);
  const showClearIcon =
    !disabled &&
    isHoverSelect &&
    allowClear &&
    (!isEmpty(option) || !isEmpty(optionMultiple));

  const onInternalSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValueSearch(e.target.value);
    onSearch?.(e.target.value);
  };

  useEffect(() => {
    if (isEmpty(selectedValue)) return;
    if (isArray(selectedValue)) {
      updateOptionMultiple(selectedValue);
    } else {
      setOption(selectedValue);
    }
  }, [selectedValue]);

  const setListOptionWithSearch = (value: string) => {
    setListOption(
      options.filter((option) =>
        removeDiacritics(option?.label?.toLowerCase()).includes(
          removeDiacritics(value.toLowerCase()),
        ),
      ),
    );
  };

  useEffect(() => {
    if (valueSearch?.length > 0 || searchValue?.length > 0) {
      if (valueSearch) {
        setListOptionWithSearch(valueSearch);
      } else {
        setListOptionWithSearch(searchValue);
      }
    } else {
      setListOption(options);
    }
  }, [valueSearch, options, searchValue]);

  const setValueMultiple = () => {
    if (isArray(value)) {
      const itemDefault = filter(
        options,
        (item) => indexOf(value, item.value) >= 0,
      );
      updateOptionMultiple(itemDefault);
    }
  };

  const setValue = useCallback(() => {
    if (!isEmpty(selectedValue)) return;
    if (isModeMultiple) {
      setValueMultiple();
    } else {
      const item = find(options, (item) => {
        return item.value == value;
      });
      setOption(item || {});
    }
  }, [options, value, selectedValue]);

  useEffect(() => setValue(), [options, value, selectedValue]);

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
  const customClasses = customTwMerge(
    defaultClasses,
    className,
    cursorStyles,
    statusValidationStyles(),
    disabled && disabledClasses,
  );

  const getUpdateOptionMultiple = useCallback(
    (option: ValueType) => {
      const indexItem = findIndex(
        cloneOptionMultiple.current,
        (item) => item.value == option.value,
      );
      return updateToggleValueInArr(
        indexItem,
        option,
        cloneOptionMultiple.current,
      );
    },
    [cloneOptionMultiple.current],
  );

  const updateOptionMultiple = (value: OptionProps[]) => {
    setOptionMultiple(value);
    cloneOptionMultiple.current = value;
  };

  const triggerUpdateValue = (
    value: (string | number) | (string | number)[],
  ) => {
    onChange?.(value);
    onBlur?.(value);
  };
  const onSelectOption = useCallback(
    (item: OptionProps) => {
      if (item.disabled) return;
      if (isModeMultiple) {
        updateOptionMultiple(getUpdateOptionMultiple(item));

        const valueOptionMultiple = cloneOptionMultiple.current.map(
          (item) => item.value,
        );
        const paramsOptionMultiple = labelInValue
          ? cloneOptionMultiple.current
          : valueOptionMultiple;

        triggerUpdateValue(valueOptionMultiple);
        onChangeCustom?.(paramsOptionMultiple);
        onSelect?.(paramsOptionMultiple, item);
      } else {
        const params = labelInValue ? item : item.value;
        if (item.value !== option.value) {
          setOption(item);
          triggerUpdateValue(item.value);
          onChangeCustom?.(params);
        }
        onSelect?.(params);
      }

      !isModeMultiple && onClose();
    },
    [isModeMultiple, labelInValue, option, cloneOptionMultiple.current],
  );

  function listOptionNode() {
    const dropdownOptionClasses = customTwMerge(
      'absolute z-[80] list-none shadow-smd bg-white rounded-xsm',
      cursorStyles,
      dropdownClassName,
    );
    const listValueMultiple = optionMultiple.map((item) => item.value);

    const dropdownOptions = listOption ? (
      listOption.map((item, key) => (
        <Option
          onSelect={() => onSelectOption(item)}
          active={
            isModeMultiple
              ? listValueMultiple.includes(item.value)
              : item.value == option?.value
          }
          key={key}
          {...item}
        />
      ))
    ) : (
      <>{children}</>
    );

    return (
      <CSSMotion visible={showOptions} motionName="opacity-motion">
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
                value={valueSearch}
                onChange={onInternalSearch}
                className="rounded-xsm"
                containerClassName="m-2.5"
                placeholder={searchPlaceholder}
              />
            )}
            <div className="overflow-y-auto max-h-64">
              {listOption.length > 0 ? (
                notFoundContent || dropdownOptions
              ) : (
                <Empty classNameImage="w-12" className="cursor-default" />
              )}
            </div>
          </div>
        )}
      </CSSMotion>
    );
  }
  const onClose = () => {
    if (!disabled) {
      setFocused(false);
      setShowOptions(false);
    }
  };

  const onClearValue = () => {
    updateOptionMultiple([]);
    setOption({});
    setShowOptions(false);
    triggerUpdateValue(isModeMultiple ? [] : null);
    onChange;
    onChangeCustom?.(isModeMultiple ? [] : null);
    onClear?.();
  };

  const toggleDropdownOption = () => {
    if (!disabled) {
      setShowOptions(!showOptions);
      setFocused(true);
      isNil(searchValue) && setValueSearch('');
    }
  };

  useOnClickOutside([refs.floating, selectRef], onClose);

  const { is_verify } = useTera();
  if (!is_verify) return null;

  const valueSelect = () => {
    if (isModeMultiple) {
      return (
        <div className="inline-flex flex-wrap max-w-full gap-1">
          {optionMultiple &&
            optionMultiple.map((option) => {
              const closable = !option.disabled || !disabled;
              const mergeLabel = option.label || option.labelDisplay;
              return typeof tagRender === 'function' ? (
                tagRender({
                  value: option.value,
                  label: mergeLabel,
                  disabled: option.disabled,
                  onClose: () => onSelectOption(option),
                  closable: closable,
                })
              ) : (
                <Tag
                  key={option.value}
                  closable={!disabled}
                  className="h-6 py-1"
                  onClose={() => onSelectOption(option)}
                >
                  {mergeLabel}
                </Tag>
              );
            })}
        </div>
      );
    } else {
      const mergeLabel = option.label || option.labelDisplay;
      return isString(mergeLabel)
        ? mergeLabel
        : cloneElement(mergeLabel || <></>, {
            ...mergeLabel?.props,
            className: customTwMerge('h-full', mergeLabel?.props?.className),
          });
    }
  };

  const iconNode = () => {
    if (loading) {
      return (
        <SpinOutlined className="relative shrink-0 w-4 h-4 text-gray-300 animate-spin fill-blue-600" />
      );
    }
    return (
      <>
        {showClearIcon ? (
          <XCircleSolid
            className="relative text-gray-400 hover:text-gray-500 shrink-0 w-4 h-4"
            onClick={onClearValue}
          />
        ) : (
          <ChevronDownOutlined
            className="stroke-2 shrink-0 w-4 h-4"
            onClick={toggleDropdownOption}
          />
        )}
        {extraNode}
      </>
    );
  };
  const hasValue = !isNil(option?.value) || !!optionMultiple?.length;
  return (
    <>
      <div
        className={customClasses}
        ref={composeRef(refs.setReference, ref)}
        {...divProps}
      >
        <div
          className={customTwMerge(
            'w-full px-3 pe-9 truncate',
            hasValue ? 'text-gray-900' : 'text-gray-400',
            showOptions && 'text-gray-400',
            get(optionMultiple?.[0], 'value') ? 'py-1.5' : 'leading-9 h-9',
          )}
          onClick={toggleDropdownOption}
        >
          {hasValue ? (
            <span className={valueClassName}>{valueSelect()}</span>
          ) : (
            <span className={placeholderClassName}>{placeholder}</span>
          )}
        </div>
        <span
          className="absolute -mt-2 select-none top-1/2 start-auto end-3 flex"
          aria-hidden
          unselectable="on"
        >
          {iconNode()}
        </span>
      </div>
      {createPortal(listOptionNode(), getPopupContainer())}
    </>
  );
});
if (process.env.NODE_ENV !== 'production') {
  Select.displayName = 'Select';
}
export default Select;
