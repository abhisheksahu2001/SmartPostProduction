import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);
export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDayofMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonth = 0 - firstDayofMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonth++;
      return dayjs(new Date(year, month, currentMonth));
    });
  });
  return daysMatrix;
};

export const getWeek = (year: any, month: any) => {
  const firstDayOfMonth = dayjs(new Date(year, month, 1));
  const daysInMonth = firstDayOfMonth.daysInMonth();

  const daysMatrix = [];
  let currentDay = firstDayOfMonth.startOf('week');

  while (currentDay.month() <= month) {
    const week = [];

    for (let i = 0; i < 7; i++) {
      const date = currentDay.date();
      const day = currentDay.format('dddd');

      const dayObj = {
        date,
        day,
        dateObj: currentDay,
      };

      week.push(dayObj);
      currentDay = currentDay.add(1, 'day');
    }

    daysMatrix.push(week);
  }

  return daysMatrix;
};
export const getMonthWeekNumber = (year: any, weekOfYear: any) => {
  const firstDayOfYear = dayjs().year(year).startOf('year');
  const firstDayOfWeek = firstDayOfYear.isoWeek(weekOfYear);

  // Calculate the week number of the month by subtracting the week number
  // of the first day of the month from the week number of the target week
  const weekOfMonth = firstDayOfWeek.isoWeek() - firstDayOfYear.isoWeek() + 1;

  return weekOfMonth;
};

export const createCalendarForCurrentWeek = (currentWeek: number) => {
  const startDate = dayjs().week(currentWeek).startOf('week');

  const endDate = startDate.endOf('week');

  const calendar = [];
  let currentDate = startDate;

  calendar.push(startDate);
  while (currentDate.isSameOrBefore(endDate)) {
    calendar.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return calendar;
};

// Example usage
