import { useTera } from 'lib';
import { ReactNode } from 'react';
import { TimeType } from './interface';

export type DateCalendarProps = {
  listTime?: TimeType[];
  onSelect?: (value?: TimeType['value']) => void;
  cellRender?: (value?: TimeType['value']) => ReactNode;
};
const DateCalendar = ({
  listTime,
  onSelect,
  cellRender,
}: DateCalendarProps) => {
  const { is_verify } = useTera();

  if (!is_verify) return null;
  return (
    <div className="w-full">
      {listTime.map((time, key) => {
        return (
          <div className="flex gap-3 items-start h-[72px]" key={key}>
            <span className="text-gray-500 text-xs font-medium text-left shrink-0">
              {time.label}
            </span>
            <div className="flex flex-col w-full h-full">
              <div
                className="border-t-2 border-gray-200 h-1/2"
                onClick={() => onSelect?.(time.value)}
              >
                {cellRender?.(time.value)}
              </div>
              <div
                className="border-t border-gray-200 h-1/2"
                onClick={() => onSelect?.(`${time.value}:30`)}
              >
                {cellRender?.(`${time.value}:30`)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DateCalendar;
