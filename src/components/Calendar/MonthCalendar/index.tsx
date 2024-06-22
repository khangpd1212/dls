import { useTera } from 'lib';
import BodyMonthCalendar, { BodyMonthCalendarProps } from './Body';
import HeadMonthCalendar, { HeadMonthCalendarProps } from './Head';
import { customTwMerge } from 'tailwind-merge.config';
import { CalendarBaseProps } from '../interface';

export type MonthCalendarProps = HeadMonthCalendarProps &
  BodyMonthCalendarProps &
  Pick<CalendarBaseProps, 'className'>;
const MonthCalendar = ({
  fullScreen = true,
  className,
  mode,
  ...restProps
}: MonthCalendarProps) => {
  const { is_verify } = useTera();
  if (!is_verify) return null;
  return (
    <table
      className={customTwMerge(
        fullScreen ? 'w-full' : 'border-separate border-spacing-2.5',
        className,
        mode === 'dark' && 'bg-gray-800',
      )}
    >
      <HeadMonthCalendar fullScreen={fullScreen} {...restProps} />
      <BodyMonthCalendar fullScreen={fullScreen} mode={mode} {...restProps} />
    </table>
  );
};

export default MonthCalendar;
