import dayjs, { Dayjs } from 'dayjs';
import React, { useContext, useState } from 'react';
import { getWeek } from '../../utils/SchedularUtils';
import Day from './Day';
import GlobalContext from '../../context/GlobalContext';

interface WeekProps {
  currWeek: Dayjs[];
  ChannelsArray: Page[];
}
interface Page {
  page_name: string;
  page_profile_pic_url: string;
}

interface WeekDayProps {
  day: Dayjs;
  slot: Dayjs;
}

function WeekDay({ day, slot }: WeekDayProps) {
  // console.log(slot);
  // const { weekIndex } = useContext(GlobalContext);

  // const handleClick = (day, slot) => {
  //   console.log(dayjs(day).format('DD-YY-M'));
  //   console.log(slot.start.format('h:mm'));
  // };
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      title={`${dayjs(day).format('DD-ddd-YYYY-MMMM ')}${dayjs(slot)
        .startOf('hour')
        .format(' h:mm A')}`}
      type="button"
      // onClick={(e) => handleClick(day, slot)}
      className="w-[11.5rem] h-20 list-none  border text-center border-gray-200 dark:border-darkborder flex flex-col hover:bg-blue-100 hover:after:addpost dark:hover:bg-lightdarkbg duration-100"
    />
  );
}

function Week({ currWeek, ChannelsArray }: WeekProps) {
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month());

  const generateTimeSlots = (date: Dayjs) => {
    const timeSlots = [];
    const startHour = dayjs(date).startOf('day');
    let i = 0;
    while (i < 24) {
      const startTime = startHour.add(i, 'hour');
      const endTime = startTime.add(1, 'hour');
      timeSlots.push({ start: startTime, end: endTime });
      i++;
    }
    return timeSlots;
  };

  return (
    <div className="grid gridCols  overflow-y-scroll absolute h-[75vh] [&>*:first-child]:col-span-1">
      {currWeek.map((day, dayIndex) => {
        const timeSlots = generateTimeSlots(day);
        if (dayIndex !== 0) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={dayIndex} className="grid Weekgrid">
              {generateTimeSlots(day).map((slot, slotIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <WeekDay key={slotIndex} slot={slot.start} day={day} />
              ))}
            </div>
          );
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={dayIndex} className="grid Weekgrid">
            {timeSlots.map((slot, slotIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={slotIndex}>
                <li className="list-none w-[8rem] h-20 justify-center   border text-center border-gray-200 dark:border-darkborder flex flex-col hover:bg-blue-100 hover:after:addpost dark:hover:bg-lightdarkbg duration-100">
                  <h1 className="">{slot.start.format('h:mm A')} </h1>
                </li>
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Week;
