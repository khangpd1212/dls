import { DATE_FORMAT } from 'common/const';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import { CalendarBaseProps, DayInMonth } from '../interface';
import DateConstants from './DateConstants';
function chunkArray(array: DayInMonth[], totalDayInWeek: number) {
  const result: DayInMonth[][] = [];
  for (let i = 0; i < array.length; i += totalDayInWeek) {
    result.push(array.slice(i, i + totalDayInWeek));
  }
  return result;
}

function getRemainingDaysNextMonth(array: DayInMonth[]) {
  return (
    DateConstants.DATE_COL_COUNT * DateConstants.DATE_ROW_COUNT - array.length
  );
}

export type BodyMonthCalendarProps = Pick<
  CalendarBaseProps,
  'cellRender' | 'onSelect' | 'cellClassName'
> & {
  dataSource?: {
    lastMonth: DayInMonth[];
    currentMonth: DayInMonth[];
    nextMonth: DayInMonth[];
  };
  fullScreen?: boolean;
  value?: string;
  mode?: 'dark' | 'light';
};
const BodyMonthCalendar = ({
  onSelect,
  dataSource,
  fullScreen,
  cellClassName,
  value,
  mode = 'light',
  cellRender,
}: BodyMonthCalendarProps) => {
  const { currentMonth = [], lastMonth = [], nextMonth = [] } = dataSource;
  const [selectedDate, setSelectedDate] = useState('');
  const prevData = useRef<DayInMonth[]>([]);
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const lastMonthList = [...lastMonth];
  const currentMonthList = [...currentMonth];
  const nextMonthList = [...nextMonth];
  // Lấy ngày của tuần của ngày đầu tháng
  const month1 = moment(currentMonthList?.[0]?.date, DATE_FORMAT).clone();
  month1.date(1);
  const day = month1.day();

  const firstDayOfWeekLocale = month1.localeData().firstDayOfWeek();
  const lastMonthDiffDay = (day + 7 - firstDayOfWeekLocale) % 7;

  let dateTable: DayInMonth[] = [];

  // add last month
  dateTable = lastMonthList.splice(
    lastMonthList.length - lastMonthDiffDay,
    lastMonthDiffDay,
  );

  //add current month
  const currentMonthWithFlag = currentMonthList.map((dayObj) => ({
    ...dayObj,
    is_now_month: true,
  }));

  dateTable.push(...currentMonthWithFlag);

  // add next month
  const remainingDaysInLastWeek = getRemainingDaysNextMonth(dateTable);

  if (remainingDaysInLastWeek > 0) {
    const nextMonthDays = nextMonthList.splice(0, remainingDaysInLastWeek);
    dateTable.push(...nextMonthDays);
  }

  if (dateTable.length) {
    prevData.current = dateTable;
  } else {
    dateTable = prevData.current;
  }

  const weeksInMonth = chunkArray(dateTable, DateConstants.DATE_COL_COUNT);

  const cellClasses = (fullScreen: boolean, item: DayInMonth) => {
    if (fullScreen) {
      return customTwMerge(
        'px-2 pb-4 pt-1 align-top text-gray-500',
        !item.is_now_month && 'bg-gray-100 hover:bg-gray-200',
        item.is_today &&
          'before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-blue-500',
      );
    } else {
      return customTwMerge(
        'hover:bg-blue-50 rounded p-1',
        mode === 'dark' && 'hover:bg-gray-700',
        !item.is_now_month && 'text-gray-500',
        item.is_today && 'border border-blue-500',
      );
    }
  };

  const onClickCell = (item: DayInMonth) => {
    onSelect?.(item);
    setSelectedDate(item.date);
  };

  return (
    <tbody className={customTwMerge(fullScreen && 'divide-y')}>
      {weeksInMonth.map((daysInWeek, keyWeek) => (
        <tr
          className={customTwMerge('h-8', fullScreen && 'h-28 divide-x')}
          key={keyWeek}
        >
          {daysInWeek.map((item) => {
            return (
              <td
                key={item.date}
                onClick={() => onClickCell(item)}
                className={customTwMerge(
                  'transition duration-200 ease cursor-pointer overflow-auto relative hover:bg-blue-50 min-w-[40px] text-gray-800',
                  mode === 'dark' && 'text-white',
                  cellClasses(fullScreen, item),
                  selectedDate === item.date &&
                    item.is_now_month &&
                    'bg-blue-500 hover:bg-blue-500 text-white',
                  cellClassName,
                )}
                title={item.date}
              >
                <p
                  className={customTwMerge(
                    'text-center text-xxs font-semibold',
                    fullScreen && 'text-right font-normal',
                  )}
                >
                  {item.day}
                </p>
                {cellRender?.(item)}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default BodyMonthCalendar;
