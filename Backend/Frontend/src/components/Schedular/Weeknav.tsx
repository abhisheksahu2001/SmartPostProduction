import React, { useContext, useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DayName } from '../../Const';
import {
  getWeek,
  getMonthWeekNumber,
  createCalendarForCurrentWeek,
} from '../../utils/SchedularUtils';
import GlobalContext from '../../context/GlobalContext';

interface WeekNavProps {
  currWeek: Dayjs[];
}

function Weeknav({ currWeek }: WeekNavProps) {
  const { schedularToggle, setSchedularToggle, weekIndex, monthIndex } =
    useContext(GlobalContext);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [year, setYear] = useState(dayjs().year());
  const weeks = createCalendarForCurrentWeek(weekIndex);
  useEffect(() => {
    setCurrentWeekIndex(getMonthWeekNumber(year, weekIndex));
  }, []);
  return schedularToggle ? (
    <div className="flex">
      {DayName.map((name: string, i: number) => {
        return (
          <h3
            className="text-center w-[13.5rem] px-2 dark:text-darktext border dark:border-darkborder text-lg"
            // eslint-disable-next-line react/no-array-index-key
            key={i}
          >
            {name}
          </h3>
        );
      })}
    </div>
  ) : (
    <div className="flex ">
      {currWeek.map((day, dayIndex) => {
        if (dayIndex !== 0) {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={dayIndex}
              className="text-center flex justify-center w-[11.5rem] uppercase   dark:text-darktext border dark:border-darkborder text-lg"
            >
              <h1 className="mr-1">{day.format('DD')}</h1>
              <h1 className="ml-1">{day.format('ddd')}</h1>
            </div>
          );
        }
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={dayIndex}
            className="text-center flex justify-center w-[8rem]   dark:text-darktext border dark:border-darkborder text-lg"
          >
            Time
          </div>
        );
      })}
    </div>
  );
}

export default Weeknav;
