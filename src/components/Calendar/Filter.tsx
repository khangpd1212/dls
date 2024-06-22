import { ChevronLeftSmall } from 'icons/ChervonLeftSmall';
import { ChevronRightSmall } from 'icons/ChervonRightSmall';
import { Search } from 'lib';
import { customTwMerge } from 'tailwind-merge.config';

type FilterCalendarProps = {
  onChangeTypeCalendar: (value: any) => void;
  typeCalendar: any;
};

type ListTypeCalendar = {
  label: string;
  value: any;
};
const FilterCalendar = ({
  onChangeTypeCalendar,
  typeCalendar,
}: FilterCalendarProps) => {
  const listTypeCalendar: ListTypeCalendar[] = [
    {
      label: 'Ngày',
      value: 'date',
    },
    {
      label: 'Tuần',
      value: 'week',
    },
    {
      label: 'Tháng',
      value: 'month',
    },
    {
      label: 'Năm',
      value: 'year',
    },
  ];
  return (
    <div className="flex pb-4 justify-between text-xs">
      <div className="flex gap-2.5">
        <button className="px-4 py-1.5 bg-gray-100 rounded-md text-gray-900">
          Hôm nay
        </button>
        <div className="flex items-stretch gap-[1px]">
          <button className="bg-gray-100 rounded-l-md px-1.5">
            <ChevronLeftSmall className="w-5 h-5 text-gray-800 " />
          </button>
          <span className="px-4 flex items-center justify-center bg-gray-100 text-gray-800">
            1/7/2022 - 6/2/2023
          </span>
          <button className="bg-gray-100 rounded-r-md px-1">
            <ChevronRightSmall className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>
      <div className="flex items-center">
        {listTypeCalendar.map((type, key) => (
          <button
            key={key}
            className={customTwMerge(
              'px-4 py-1 text-gray-500 font-medium text-sm rounded-lg',
              typeCalendar === type.value && 'bg-blue-600 text-white',
            )}
            onClick={() => onChangeTypeCalendar(type.value)}
          >
            {type.label}
          </button>
        ))}
      </div>
      <Search
        placeholder="Tìm kiếm"
        iconClassName="text-gray-500"
        className="h-7 bg-gray-100 w-48 rounded border-none"
      />
    </div>
  );
};

export default FilterCalendar;
