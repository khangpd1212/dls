import { useTera } from 'lib';
import { ReactNode } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import { DayInMonth, TimeType } from './interface';

export type WeekCalendarProps = {
  dayInWeek: DayInMonth[];
  listTime: TimeType[];
  extraHeader?: ReactNode;
  cellRender?: (dayInMonth?: DayInMonth, time?: TimeType['value']) => ReactNode;
  headerRender?: (dayInMonth?: DayInMonth) => ReactNode;
  onSelect?: (dayInMonth?: DayInMonth, time?: TimeType['value']) => void;
};
const WeekCalendar = ({
  dayInWeek,
  listTime,
  cellRender,
  headerRender,
  onSelect,
  extraHeader,
}: WeekCalendarProps) => {
  const { is_verify } = useTera();

  if (!is_verify) return null;
  const headerNode = (
    <thead>
      <tr>
        <th className="w-8 pr-3" />
        {dayInWeek.map((item, key) => (
          <th
            key={key}
            className={customTwMerge(
              'relative px-2 pt-1 pb-4 shadow-[-1px_-1px_0px_0px_#E0E0E0_inset] w-20 h-16',
              item.is_week_end && 'bg-gray-50',
              item.is_today && 'bg-blue-50',
            )}
          >
            {typeof headerRender === 'function' ? (
              headerRender(item)
            ) : (
              <>
                <span className="text-gray-500 text-xss w-fit">
                  <span className="sm:block hidden">
                    {item.day_of_week_long}
                  </span>
                  <span className="sm:hidden block">
                    {item.day_of_week_sort}
                  </span>
                </span>
                <h3 className="text-2xl">{item.day}</h3>
                {extraHeader}
              </>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );

  const cellNode = (
    <tbody>
      {listTime.map((time, keyTime) => (
        <tr className="h-20" key={keyTime}>
          <td className="text-gray-500 text-xs font-medium align-top text-left">
            {time.label}
          </td>
          {dayInWeek.map((day, keyDay) => {
            return (
              <td
                key={keyDay}
                className={customTwMerge(
                  'shadow-[-1px_-1px_0px_0px_#E0E0E0_inset] overflow-auto transition cursor-pointer duration-500 ease h-[inherit]',
                  day.is_week_end && 'bg-gray-50',
                  day.is_today && 'bg-blue-50',
                )}
              >
                <div
                  className="h-1/2 shadow-[0px_-1px_0px_0px_#F7F7F7_inset]"
                  onClick={() => onSelect?.(day, time.value)}
                >
                  {cellRender?.(day, time.value)}
                </div>
                <div
                  className="h-1/2"
                  onClick={() => onSelect?.(day, `${time.value}:30`)}
                >
                  {cellRender?.(day, `${time.value}:30`)}
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );

  return (
    <table className="w-full">
      {headerNode}
      {cellNode}
    </table>
  );
};

export default WeekCalendar;
