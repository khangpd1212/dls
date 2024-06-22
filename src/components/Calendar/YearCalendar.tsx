import { Badge, MonthCalendar, useTera } from 'lib';
import { useState } from 'react';
import { customTwMerge } from 'tailwind-merge.config';
import DataAllMonth from './allMonth.json';
import { DATE_FORMAT } from 'common/const';
import moment from 'moment';

const YearCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format(DATE_FORMAT),
  );

  const { is_verify } = useTera();
  if (!is_verify) return null;
  return (
    <div className="grid grid-cols-3 gap-5">
      {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
        <div className="border border-gray-200 rounded-xl p-2.5" key={month}>
          <h3 className="text-base font-medium text-center mb-4">
            Tháng {month}
          </h3>
          <MonthCalendar
            className="w-full"
            fullScreen={false}
            value={selectedDate}
            onSelect={(dayInMonth) => setSelectedDate(dayInMonth.date)}
            cellRender={(item) => (
              <Badge
                className={customTwMerge(
                  'text-[8px] text-center bg-inherit p-0 w-full',
                  selectedDate === item.date &&
                    item.is_now_month &&
                    'text-white',
                  item.is_today && 'text-gray-300',
                )}
                count={item.is_today ? `(0)` : `(99)`}
              />
            )}
            dataSource={{
              lastMonth: DataAllMonth[month - 1],
              currentMonth: DataAllMonth[month],
              nextMonth: DataAllMonth[month + 1],
            }}
          />
        </div>
      ))}
    </div>
  );
};
export default YearCalendar;
