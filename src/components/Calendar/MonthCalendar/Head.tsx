import moment from 'moment';
import { customTwMerge } from 'tailwind-merge.config';
import { CalendarBaseProps } from '../interface';
import DateConstants from './DateConstants';

moment.updateLocale('vn', {
  weekdays: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  weekdaysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
});

export type HeadMonthCalendarProps = Pick<
  CalendarBaseProps,
  'headerRender' | 'extraHeader' | 'headerClassName'
> & {
  fullScreen?: boolean;
};
const HeadMonthCalendar = ({
  extraHeader,
  headerRender,
  fullScreen,
  headerClassName,
}: HeadMonthCalendarProps) => {
  const localeData = moment().localeData();
  const firstDayOfWeekLocale = localeData.firstDayOfWeek();
  const now = moment();
  const veryShortWeekdays: string[] = [];
  const titleWeekDays: string[] = [];
  for (
    let dateColIndex = 0;
    dateColIndex < DateConstants.DATE_COL_COUNT;
    dateColIndex++
  ) {
    const index =
      (firstDayOfWeekLocale + dateColIndex) % DateConstants.DATE_COL_COUNT;
    now.day(index);
    veryShortWeekdays[dateColIndex] = localeData.weekdaysMin(now);
    titleWeekDays[dateColIndex] = localeData.weekdays(now);
  }
  return (
    <thead>
      <tr className={customTwMerge(fullScreen && 'divide-x border-b')}>
        {titleWeekDays.map((item, key) => (
          <th
            key={key}
            className={customTwMerge(
              'relative p-1',
              fullScreen && 'px-2 pt-1 pb-4 w-20',
              headerClassName,
            )}
          >
            {typeof headerRender === 'function' ? (
              headerRender(item)
            ) : (
              <>
                <span className="text-gray-500 text-xs font-bold w-fit">
                  {fullScreen ? (
                    <>
                      <span className="sm:block hidden">{item}</span>
                      <span className="sm:hidden block">
                        {veryShortWeekdays[key]}
                      </span>
                    </>
                  ) : (
                    <span className="block">{veryShortWeekdays[key]}</span>
                  )}
                </span>
                {extraHeader}
              </>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default HeadMonthCalendar;
