import { ChevronDownOutlined, ChevronUpOutlined } from 'icons';
import { useTera } from 'lib';
import { isNaN, isNull } from 'lodash';
import numeral from 'numeral';
import { useLayoutUpdateEffect } from 'rc-util/lib/hooks/useLayoutEffect';
import { composeRef } from 'rc-util/lib/ref';
import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import Input, { InputProps } from '.';
import useCursor from './hooks/useCursor';
import { getNumberPrecision, isEmpty } from './utils';
type FormatterType = 'currency';
export interface InputNumberProps
  extends Omit<InputProps, 'onChange' | 'type'> {
  value?: number;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: (value: number | ChangeEvent<Element>) => void;
  min?: number;
  max?: number;
  parser?: (displayValue: string | undefined) => number | string;
  formatter?: (value: number | string) => string;
  formatterType?: FormatterType;
  decimalSeparator?: string;
  precision?: number;
  allowStepHandler?: boolean;
  nocontrol?: boolean;
}
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (props, ref) => {
    const {
      className,
      value: customValue,
      onChange,
      onPressEnter,
      onKeyDown,
      disabled,
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      formatter,
      onBlur,
      containerProps,
      parser,
      decimalSeparator,
      allowStepHandler = true,
      precision,
      step = 1,
      formatterType,
      nocontrol = false,
      ...restProps
    } = props;
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const btnRef = useRef<HTMLInputElement>(null);
    const previousValue = useRef<number>(null);
    const compositionRef = useRef(false);
    const userTypingRef = useRef(false);

    // Cursor controller
    const [recordCursor, restoreCursor] = useCursor(inputRef.current, focused);

    const [valueInternal, setValueInternal] = useState<string | number>(null);

    useEffect(() => {
      flushInputValue(customValue, userTypingRef.current);
    }, [customValue]);

    const inputClasses = customTwMerge(`pr-9`, className);

    const getRangeValue = (value: number) => {
      if (value > max) {
        return max;
      } else if (value < min) {
        return min;
      } else {
        return value;
      }
    };
    const isInRange = (value: number) => {
      if ((max || min) === null) return true;
      if (value > max) {
        return false;
      } else if (value < min) {
        return false;
      } else {
        return true;
      }
    };

    const triggerValueUpdate = (newValue: number) => {
      if (!disabled && newValue != previousValue.current) {
        previousValue.current = newValue;
        onChange?.(newValue);
      }
      setValueInternal(newValue);
      return newValue;
    };

    const flushInputValue = (value: string | number, userTyping: boolean) => {
      let formatValue = isNaN(+value)
        ? previousValue.current
        : numeral(value).value();

      const isRangeValidate = isInRange(formatValue) || isEmpty(formatValue);

      if (isEmpty(formatValue) && !userTyping) {
        formatValue = getRangeValue(formatValue) || formatValue;
        // isRangeValidate = true;
      }

      if (formatValue === -0) {
        formatValue = 0;
      }
      if (isRangeValidate) {
        triggerValueUpdate(formatValue);
      } else {
        triggerValueUpdate(getRangeValue(formatValue));
      }
      if (
        getPrecision(formatValue) === 0 &&
        !userTyping &&
        isRangeValidate &&
        !isNull(formatValue)
      ) {
        const valueInteger = parseInt(String(formatValue));
        triggerValueUpdate(valueInteger);
      }
    };

    const plusNumber = () => {
      if (!disabled) {
        userTypingRef.current = false;
        const numberPlus = numeral(valueInternal ?? 0)
          .add(1)
          .value();
        flushInputValue(numberPlus, false);
        setFocused(true);
      }
    };
    const minusNumber = () => {
      if (!disabled) {
        userTypingRef.current = false;
        const numberMinus = numeral(valueInternal ?? 0)
          .subtract(1)
          .value();
        flushInputValue(numberMinus, false);
        setFocused(true);
      }
    };

    const handleBlur = (e) => {
      setFocused(false);
      userTypingRef.current = false;

      flushInputValue(valueInternal, false);

      e.target.value = previousValue.current;

      onBlur?.(e);
      containerProps?.onBlur?.(e);
    };

    const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      onKeyDown?.(e);
      const { key } = e;
      if (key === 'Enter') {
        if (!compositionRef.current) {
          userTypingRef.current = false;
        }
        flushInputValue(valueInternal, false);
        onPressEnter?.(e);
      }
      if (!compositionRef.current && ['Up', 'ArrowUp'].includes(key)) {
        plusNumber();
        e.preventDefault();
      }
      if (!compositionRef.current && ['Down', 'ArrowDown'].includes(key)) {
        minusNumber();
        e.preventDefault();
      }
    };

    const getPrecision = useCallback(
      (numStr: string | number) => {
        if (precision >= 0) {
          return precision;
        }

        return Math.max(getNumberPrecision(numStr), getNumberPrecision(step));
      },
      [precision, step],
    );

    const mergedParser = useCallback(
      (num: string | number) => {
        const numStr = String(num);

        if (parser) {
          return parser(numStr);
        }

        let parsedStr = numStr;
        if (decimalSeparator) {
          parsedStr = parsedStr.replace(decimalSeparator, '.');
        }

        return parsedStr.replace(/[^\w.-]+/g, '');
      },
      [parser, decimalSeparator],
    );

    const mergedFormatter = React.useCallback(
      (currentValue: string | number) => {
        const value = currentValue === null ? '' : currentValue;
        if (typeof formatter === 'function') {
          return formatter(value);
        } else if (formatterType === 'currency') {
          return `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return value;
      },
      [formatter, formatterType],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      collectInputValue(e.target.value);
    };

    const collectInputValue = (inputStr: string) => {
      recordCursor();

      const parseValue = mergedParser(inputStr);

      if (!compositionRef.current) {
        const numberValue = +parseValue;
        if (!isNaN(numberValue) && isInRange(numberValue)) {
          triggerValueUpdate(numberValue);
        }
      }

      setValueInternal(parseValue);
      if (inputStr === '') {
        triggerValueUpdate(null);
      }
    };
    const onBeforeInput = () => {
      userTypingRef.current = true;
    };
    const onCompositionStart = () => {
      compositionRef.current = true;
    };

    const onCompositionEnd = () => {
      compositionRef.current = false;

      collectInputValue(inputRef.current.value);
    };

    useLayoutUpdateEffect(() => {
      if (formatterType || formatter) {
        restoreCursor();
      }
    }, [valueInternal]);

    const { is_verify } = useTera();
    if (!is_verify) return null;

    const stepHandlerNode = (
      <div
        className={customTwMerge(
          `absolute inset-y-0 right-0 flex flex-col items-stretch h-full transition-all border border-transparent w-9 rounded-se-xsm rounded-ee-xsm ${
            nocontrol ? 'hidden' : ''
          }`,
        )}
        ref={btnRef}
      >
        <button
          disabled={disabled}
          className="flex items-center justify-center flex-auto text-gray-400 cursor-pointer h-2/5 hover:text-gray-900 disabled:cursor-not-allowed disabled:hover:text-gray-400"
          type="button"
          onClick={plusNumber}
        >
          <ChevronUpOutlined className="w-3 h-3 stroke-[2px]" />
        </button>
        <button
          disabled={disabled}
          className="flex items-center justify-center flex-auto text-gray-400 cursor-pointer h-2/5 hover:text-gray-900 disabled:cursor-not-allowed disabled:hover:text-gray-400"
          type="button"
          onClick={minusNumber}
        >
          <ChevronDownOutlined className="w-3 h-3 stroke-[2px]" />
        </button>
      </div>
    );

    return (
      <div
        className={customTwMerge('relative', containerProps?.className)}
        onFocus={(e) => {
          setFocused(true);
          containerProps?.onFocus?.(e);
        }}
        onBlur={handleBlur}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        onBeforeInput={onBeforeInput}
      >
        <Input
          aria-valuemax={max}
          aria-valuemin={min}
          onKeyDown={handleKeydown}
          {...restProps}
          focused={focused}
          value={mergedFormatter(valueInternal)}
          onChange={handleChange}
          disabled={disabled}
          className={inputClasses}
          ref={composeRef(inputRef, ref, btnRef)}
        />
        {allowStepHandler && stepHandlerNode}
      </div>
    );
  },
);
export default InputNumber;
