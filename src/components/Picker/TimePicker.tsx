import { ClockOutlined, XCircleSolid, useTera } from 'lib';
import { Moment } from 'moment';
import RcPicker from 'rc-picker';
import { PickerProps as RcPickerTimeProps } from 'rc-picker/lib';
import { GenerateConfig } from 'rc-picker/lib/generate';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import { Locale } from 'rc-picker/lib/interface';
import localeVN from 'rc-picker/lib/locale/vi_VN';
import { ReactElement } from 'react';
import { mergeAllowClear } from './interface';

export type TimePickerProps = Omit<
  RcPickerTimeProps<Moment>,
  'locale' | 'generateConfig' | 'picker'
> & {
  locale?: Locale;
  generateConfig?: GenerateConfig<Moment>;
  prefixIcon?: ReactElement;
  inputClassName?: string;
};

const TimePicker = (props: TimePickerProps) => {
  const {
    generateConfig = momentGenerateConfig,
    locale = localeVN,
    placeholder = 'Select time',
    allowClear = true,
    suffixIcon = <ClockOutlined className="w-4 h-4 stroke-2" />,
    clearIcon,
    ...restProps
  } = props;

  const { is_verify } = useTera();
  if (!is_verify) return null;
  return (
    <RcPicker
      prefixCls="tera-picker"
      picker="time"
      locale={locale}
      generateConfig={generateConfig}
      placeholder={placeholder}
      suffixIcon={suffixIcon}
      styles={{ popup: { minWidth: 0 } }}
      allowClear={mergeAllowClear(
        allowClear,
        clearIcon,
        <XCircleSolid className="text-gray-400 hover:text-gray-500 w-4 h-4" />,
      )}
      {...restProps}
    />
  );
};

export default TimePicker;
