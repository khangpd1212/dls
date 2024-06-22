import { DATE_FORMAT } from 'common/const';
import { CalendarOutlinedV1 } from 'icons/CalendarOutlinedV1';
import {
  ArrowLongRightOutlined,
  ClockOutlined,
  XCircleSolid,
  useTera,
} from 'lib';
import { Moment } from 'moment';
import { RangePicker as RcRangePicker } from 'rc-picker';
import { RangePickerProps as RcRangePickerProps } from 'rc-picker/lib';
import { GenerateConfig } from 'rc-picker/lib/generate';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import { Locale } from 'rc-picker/lib/interface';
import localeVN from 'rc-picker/lib/locale/vi_VN';
import { mergeAllowClear } from './interface';
import { useContext } from 'react';
import { FormItemContext } from 'components/Form/FormItem';
import { customTwMerge } from 'tailwind-merge.config';

export type RangePickerProps = Omit<
  RcRangePickerProps<Moment>,
  'locale' | 'generateConfig'
> & {
  locale?: Locale;
  generateConfig?: GenerateConfig<Moment>;
};

const RangePicker = (props: RangePickerProps) => {
  const formItemContext = useContext(FormItemContext);
  const {
    generateConfig = momentGenerateConfig,
    locale = localeVN,
    picker,
    allowClear = true,
    clearIcon,
    className,
    placeholder = picker === 'time'
      ? ['Start time', 'End time']
      : ['Start date', 'End date'],
    separator = <ArrowLongRightOutlined className="w-4 h-4" />,
    suffixIcon = picker === 'time' ? (
      <ClockOutlined className="w-4 h-4 stroke-2" />
    ) : (
      <CalendarOutlinedV1 className="w-4 h-4" />
    ),
    ...restProps
  } = props;

  const { is_verify } = useTera();
  if (!is_verify) return null;
  return (
    <>
      {picker === 'time' ? (
        <RcRangePicker
          prefixCls="tera-picker"
          locale={locale}
          picker="time"
          separator={separator}
          placeholder={placeholder}
          generateConfig={generateConfig}
          suffixIcon={suffixIcon}
          allowClear={mergeAllowClear(
            allowClear,
            clearIcon,
            <XCircleSolid className="text-gray-400 hover:text-gray-500 w-4 h-4" />,
          )}
          className={customTwMerge(
            formItemContext?.isError && 'tera-picker-error',
            className,
          )}
          {...restProps}
        />
      ) : (
        <RcRangePicker
          prefixCls="tera-picker"
          locale={locale}
          picker={picker}
          separator={separator}
          placeholder={placeholder}
          suffixIcon={<CalendarOutlinedV1 className="w-4 h-4" />}
          generateConfig={generateConfig}
          allowClear={mergeAllowClear(
            allowClear,
            clearIcon,
            <XCircleSolid className="text-gray-400 hover:text-gray-500 w-4 h-4" />,
          )}
          format={DATE_FORMAT}
          className={customTwMerge(
            formItemContext?.isError && 'tera-picker-error',
            className,
          )}
          {...restProps}
        />
      )}
    </>
  );
};

export default RangePicker;
