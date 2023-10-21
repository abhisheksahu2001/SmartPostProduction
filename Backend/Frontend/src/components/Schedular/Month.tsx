import React, { useContext, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Day from './Day';
import GlobalContext from '../../context/GlobalContext';

interface MonthProps {
  month: Dayjs[][];
  ChannelsArray: Page[];
}
interface Page {
  page_id: number;
  page_name: string;
  page_profile_pic_url: string;
}

function Month({ month, ChannelsArray }: MonthProps) {
  const [loading, setLoading] = useState(true);
  const [lastWeekOfMonth] = month.slice(-1);
  const curr = dayjs();
  const last = dayjs(lastWeekOfMonth[6]);

  const { setMonthIndex, monthIndex } = useContext(GlobalContext);
  useEffect(() => {
    if (last.isBefore(curr)) {
      setMonthIndex(monthIndex + 1);
    }
    setLoading(false);
  }, [curr, last, monthIndex, setMonthIndex]);
  const day = !loading ? (
    <div className=" flex-1  grid grid-cols-7 grid-rows-5 overflow-hidden">
      {month.map((row: Dayjs[], i: number) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={i}>
            {row.map((Date: Dayjs, idx) => {
              return (
                <Day
                  day={Date}
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  rowIdx={i}
                  Channelsarray={ChannelsArray}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  ) : null;
  return day;
}

export default Month;
