import { CalendarOutlinedV1 } from 'icons/CalendarOutlinedV1';
import { XCircleSolid, useTera } from 'lib';
import { Moment } from 'moment';
import RcPicker from 'rc-picker';
import { PickerProps as RcPickerDateProps } from 'rc-picker/lib';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import { Locale, PickerRef } from 'rc-picker/lib/interface';
import localeVN from 'rc-picker/lib/locale/vi_VN';
import { ReactElement, forwardRef, useContext } from 'react';
import { mergeAllowClear } from './interface';
import { customTwMerge } from 'tailwind-merge.config';
import { DATE_FORMAT } from 'common/const';
import { FormItemContext } from 'components/Form/FormItem';

export type DatePickerProps = Omit<
  RcPickerDateProps<Moment>,
  'locale' | 'generateConfig' | 'picker'
> & {
  locale?: Locale;
  picker?: 'date' | 'month' | 'year' | 'week' | 'quarter';
  generateConfig?: GenerateConfig<Moment>;
  prefixIcon?: ReactElement;
  inputClassName?: string;
};

const DatePicker = forwardRef<PickerRef, DatePickerProps>((props, ref) => {
  const formItemContext = useContext(FormItemContext);
  const {
    generateConfig = momentGenerateConfig,
    locale = localeVN,
    picker = 'date',
    placeholder = 'Select date',
    allowClear = true,
    suffixIcon = <CalendarOutlinedV1 className="w-4 h-4" />,
    clearIcon,
    className,
    ...restProps
  } = props;

  const { is_verify } = useTera();
  if (!is_verify) return null;

  return (
    <RcPicker
      ref={ref}
      picker={picker}
      placeholder={placeholder}
      prefixCls="tera-picker"
      locale={locale}
      generateConfig={generateConfig}
      suffixIcon={suffixIcon}
      className={customTwMerge(
        'tera-picker-date',
        formItemContext?.isError && 'tera-picker-error',
        className,
      )}
      styles={{ popup: { minWidth: 0 } }}
      allowClear={mergeAllowClear(
        allowClear,
        clearIcon,
        <XCircleSolid className="text-gray-400 hover:text-gray-500 w-4 h-4" />,
      )}
      format={DATE_FORMAT}
      {...restProps}
    />
  );
});

export default DatePicker;
