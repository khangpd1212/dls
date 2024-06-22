import Checkbox from 'components/Checkbox';
import { CheckOutlined, ChevronRightOutlined } from 'icons';
import { useTera } from 'lib';
import { isArray } from 'lodash';
import { ReactNode, forwardRef } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import Indent from './Indent';
import { RawValueType } from './interface';
export interface OptionProps {
  value?: RawValueType;
  label?: string;
  labelDisplay?: ReactNode;
  disabled?: boolean;
  className?: string;
  children?: OptionProps[];
  active?: boolean;
  pid?: RawValueType;
  treeExpandedKeys?: RawValueType[];
  level?: number;
  setTreeExpandedKeys?: React.Dispatch<React.SetStateAction<RawValueType[]>>;
  onSelect?: (option: OptionProps) => void;
  currentValue?: RawValueType | RawValueType[];
  treeLine?: boolean;
  checked?: boolean;
  halfChecked?: boolean;
  treeCheckable?: boolean;
  disableCheckbox?: boolean;
  onChecked?: (checked: boolean, value: RawValueType) => void;
}
const Option = forwardRef<HTMLDivElement, OptionProps>((props, ref) => {
  const {
    label,
    disabled,
    className,
    children,
    labelDisplay,
    active,
    value,
    treeExpandedKeys,
    setTreeExpandedKeys,
    level = 0,
    onSelect,
    currentValue,
    treeLine,
    treeCheckable,
    halfChecked,
    checked,
    disableCheckbox,
    onChecked,
  } = props;

  const defaultClasses =
    'flex items-center last:rounded-b-xsm first:rounded-t-xsm transition-all text-xxs outline-none';
  const disabledClasses = 'opacity-50 cursor-not-allowed hover:bg-inherit';
  const activeClasses = 'bg-blue-200';

  const optionClasses = customTwMerge(
    defaultClasses,
    className,
    disabled && disabledClasses,
  );

  const isShowTreeLine = treeLine;
  const isShowLeafLine = !children?.length && treeLine;

  const { is_verify } = useTera();
  if (!is_verify) return null;

  const leafLineClasses =
    'border-l w-5 border-gray-300 after:w-full after:h-[1px] after:absolute after:inset-x-0 after:bg-gray-300 cursor-default ml-2';
  const switcherNode = (
    <span
      className={customTwMerge(
        'relative flex-none m-0 text-center cursor-pointer select-none self-stretch w-4 mr-1 flex items-center justify-center',
        isShowLeafLine && leafLineClasses,
      )}
      onClick={() =>
        setTreeExpandedKeys(() => {
          const index = treeExpandedKeys.indexOf(value);
          const isActive = index > -1;
          if (isActive) {
            return treeExpandedKeys.filter((key) => value !== key);
          }

          return [...treeExpandedKeys, value];
        })
      }
    >
      {!!children?.length && (
        <ChevronRightOutlined
          className={customTwMerge(
            'text-gray-500 stroke-2 transition-transform inline-block align-baseline',
            treeExpandedKeys.includes(value) ? 'rotate-90' : 'rotate-0',
          )}
        />
      )}
    </span>
  );

  return (
    <>
      <div className={optionClasses} ref={ref}>
        <Indent
          level={level}
          className={
            isShowTreeLine &&
            'after:h-full after:left-2 after:right-0 after:absolute after:bg-gray-300 after:w-[1px] w-5'
          }
        />
        {switcherNode}
        <span
          onClick={() => onSelect({ label: label, value: value })}
          className={customTwMerge(
            'flex-auto select-none relative m-0 cursor-pointer transition-all p-1.5 flex items-center justify-between my-0.5',
            active ? activeClasses : 'hover:bg-gray-200',
          )}
        >
          <div className="flex items-center gap-2.5">
            {treeCheckable && (
              <Checkbox
                value={value}
                checked={checked}
                onChange={(e) => onChecked(e.target.checked, value)}
                indeterminate={!checked && halfChecked}
                disabled={disabled || disableCheckbox}
              />
            )}
            {labelDisplay || label}
          </div>
          {active && (
            <CheckOutlined className="w-4 h-4 text-blue-700 stroke-[3px]" />
          )}
        </span>
      </div>
      {!!children?.length &&
        children.map(
          (item) =>
            treeExpandedKeys.includes(value) && (
              <Option
                setTreeExpandedKeys={setTreeExpandedKeys}
                treeExpandedKeys={treeExpandedKeys}
                level={level + 1}
                onSelect={(option) => onSelect(option)}
                className={className}
                disabled={disabled}
                labelDisplay={labelDisplay}
                key={item.value}
                label={item.label}
                value={item.value}
                children={item.children}
                active={
                  isArray(currentValue)
                    ? currentValue.includes(item.value)
                    : item.value === currentValue
                }
                currentValue={currentValue}
                treeLine={treeLine}
                treeCheckable={treeCheckable}
                checked={checked}
                halfChecked={halfChecked}
                disableCheckbox={disableCheckbox}
                onChecked={onChecked}
              />
            ),
        )}
    </>
  );
});

export default Option;
