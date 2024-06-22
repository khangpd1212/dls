import { useState } from 'react';
import DateCalendar from './DateCalendar';
import FilterCalendar from './Filter';
import MonthCalendar from './MonthCalendar';
import DataCurrentMonth from './MonthCalendar/dataCurrent.json';
import DataLastMonth from './MonthCalendar/dataLast.json';
import DataNextMonth from './MonthCalendar/dataNext.json';
import WeekCalendar from './WeekCalendar';
import YearCalendar from './YearCalendar';
import { CalendarBaseProps } from './interface';

const Calendar = ({ ...restProps }: CalendarBaseProps) => {
  const [typeCalendar, setTypeCalendar] = useState('date');
  const dayInWeek = [
    {
      day: 1,
      month: '2',
      year: '2023',
      day_of_week: 'Wednesday',
      day_of_week_sort: 'T4',
      day_of_week_long: 'Th\u1ee9 4',
      date: '01/02/2023',
      is_holiday: false,
      is_week_day: true,
      is_week_end: false,
      is_today: false,
      is_yesterday: false,
      is_tomorrow: false,
    },
    {
      day: 2,
      month: '2',
      year: '2023',
      day_of_week: 'Thursday',
      day_of_week_sort: 'T5',
      day_of_week_long: 'Th\u1ee9 5',
      date: '02/02/2023',
      is_holiday: false,
      is_week_day: true,
      is_week_end: false,
      is_today: false,
      is_yesterday: false,
      is_tomorrow: false,
    },
    {
      day: 3,
      month: '2',
      year: '2023',
      day_of_week: 'Friday',
      day_of_week_sort: 'T6',
      day_of_week_long: 'Th\u1ee9 6',
      date: '03/02/2023',
      is_holiday: false,
      is_week_day: true,
      is_week_end: false,
      is_today: false,
      is_yesterday: false,
      is_tomorrow: false,
    },
    {
      day: 4,
      month: '2',
      year: '2023',
      day_of_week: 'Saturday',
      day_of_week_sort: 'T7',
      day_of_week_long: 'Th\u1ee9 7',
      date: '04/02/2023',
      is_holiday: false,
      is_week_day: false,
      is_week_end: true,
      is_today: false,
      is_yesterday: false,
      is_tomorrow: false,
    },
    {
      day: 5,
      month: '2',
      year: '2023',
      day_of_week: 'Sunday',
      day_of_week_sort: 'CN',
      day_of_week_long: 'Ch\u1ee7 nh\u1eadt',
      date: '05/02/2023',
      is_holiday: false,
      is_week_day: false,
      is_week_end: true,
      is_today: false,
      is_yesterday: false,
      is_tomorrow: false,
    },
    {
      day: 6,
      month: '2',
      year: '2023',
      day_of_week: 'Monday',
      day_of_week_sort: 'T2',
      day_of_week_long: 'Th\u1ee9 2',
      date: '06/02/2023',
      is_holiday: false,
      is_week_day: true,
      is_week_end: false,
      is_today: false,
      is_yesterday: false,
      is_tomorrow: false,
    },
    {
      day: 7,
      month: '2',
      year: '2023',
      day_of_week: 'Tuesday',
      day_of_week_sort: 'T3',
      day_of_week_long: 'Th\u1ee9 3',
      date: '07/02/2023',
      is_holiday: false,
      is_week_day: true,
      is_week_end: false,
      is_today: false,
      is_yesterday: false,
      is_tomorrow: false,
    },
  ];

  const listTime = [
    {
      label: '7SA',
      value: '7',
    },
    {
      label: '8SA',
      value: '8',
    },
    {
      label: '9SA',
      value: '9',
    },
    {
      label: '10SA',
      value: '10',
    },
    {
      label: '11SA',
      value: '11',
    },
    {
      label: '12CH',
      value: '12',
    },
    {
      label: '1CH',
      value: '13',
    },
  ];

  const renderCalendar = {
    date: (
      <DateCalendar
        listTime={listTime}
        onSelect={(value) => console.log(value)}
      />
    ),
    week: (
      <WeekCalendar
        listTime={listTime}
        dayInWeek={dayInWeek}
        onSelect={(value, time) => {
          console.log(value);
          console.log(time);
        }}
      />
    ),
    month: (
      <MonthCalendar
        dataSource={{
          currentMonth: DataCurrentMonth,
          lastMonth: DataLastMonth,
          nextMonth: DataNextMonth,
        }}
        {...restProps}
      />
    ),
    year: <YearCalendar />,
  };

  return (
    <>
      <FilterCalendar
        typeCalendar={typeCalendar}
        onChangeTypeCalendar={(value) => setTypeCalendar(value)}
      />

      {renderCalendar[typeCalendar]}
    </>
  );
};
export { default as DateCalendar } from './DateCalendar';
export type { DateCalendarProps } from './DateCalendar';
export { default as MonthCalendar } from './MonthCalendar';
export type { MonthCalendarProps } from './MonthCalendar';
export { default as WeekCalendar } from './WeekCalendar';
export type { WeekCalendarProps } from './WeekCalendar';
export default Calendar;
