/* eslint-disable */
import { useState, useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  getMonth,
  getWeek,
  getMonthWeekNumber,
  createCalendarForCurrentWeek,
} from './utils/SchedularUtils';
import CalenderHeader from './components/Schedular/CalenderHeader';
import Month from './components/Schedular/Month';
import GlobalContext from './context/GlobalContext';
import Weeknav from './components/Schedular/Weeknav';
import Week from './components/Schedular/Week';
import useChannelsData from '../helpers/useChannelsData';
import ChannelsList from './components/Channels/ChannelsList';
import Navbar from './components/Navbar';
import { Dayjs } from 'dayjs';

interface WeekProps {
  currWeek: Dayjs[];
  ChannelsArray: Page[];
}
interface Page {
  page_name: string;
  page_profile_pic_url: string;
}




function Schedular() {
  const { error, pageArray } = useChannelsData();

  const { monthIndex, weekIndex, schedularToggle } = useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const [year, setYear] = useState(dayjs().year());
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const week = createCalendarForCurrentWeek(weekIndex);

  useEffect(() => {
    setCurrentWeekIndex(getMonthWeekNumber(year, weekIndex));
  }, [weekIndex]);
  return (
    <>
      <section>
        <Navbar position='absolute' move={false} />
      </section>
      <section className="flex pt-20">
        <div className="w-1/4 p-2 h-[91vh] border border-r-1 border-y-0 border-l-0 border-gray-300 dark:border-darkborder">
          <ChannelsList channelsArray={pageArray} error='' />
        </div>
        <section className="rounded-xl h-[80vh] m-5 max-h-max min-h-max min-w-[75vw] max-w-[75vw] flex flex-col mt-5  ">
          <CalenderHeader ChannelsArray={pageArray} />
          <Weeknav currWeek={week} />
          <div className="flex flex-1 ">
            {schedularToggle ? (
              <Month month={currentMonth} ChannelsArray={pageArray} />
            ) : (
              <Week currWeek={week} ChannelsArray={pageArray} />
            )}
          </div>
        </section>
      </section>
    </>
  );
}
export default Schedular;
