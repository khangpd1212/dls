import { ReactNode } from 'react';

// export type TypeCalendar = 'date' | 'month' | 'year' | 'week';
export type TimeType = {
  label: ReactNode;
  value: string;
};
export type TitleDayInWeekType = {
  label: string;
  value: string;
};
export type CalendarBaseProps = {
  cellRender?: (dayInMonth: DayInMonth) => ReactNode;
  headerRender?: (dayInMonth?: string) => ReactNode;
  onSelect?: (dayInMonth: DayInMonth) => void;
  extraHeader?: ReactNode;
  cellClassName?: string;
  headerClassName?: string;
  className?: string;
};

export type DayInMonth = {
  date?: string;
  day?: number;
  day_of_week?: string;
  day_of_week_long?: string;
  day_of_week_sort?: string;
  is_holiday?: boolean;
  is_today?: boolean;
  is_tomorrow?: boolean;
  is_week_day?: boolean;
  is_week_end?: boolean;
  is_yesterday?: boolean;
  is_now_month?: boolean;
  month?: string;
  year?: string;
};
