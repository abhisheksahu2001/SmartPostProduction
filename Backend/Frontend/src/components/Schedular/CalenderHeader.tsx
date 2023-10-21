/* eslint-disable */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import useResponsive from '../../../helpers/useResponsive';
import TaskModalUI from './TaskModalUI';

interface CalenderHeaderProps {
  page_name: string;
  page_profile_pic_url: string;
}

interface CalenderHeaderComponentProps {
  ChannelsArray: CalenderHeaderProps[];
}

const CalenderHeader: React.FC<CalenderHeaderComponentProps> = ({ ChannelsArray }) => {
  const {
    monthIndex,
    setMonthIndex,
    setWeekIndex,
    weekIndex,
    schedularToggle,
    disableKeyControl,
  } = useContext(GlobalContext);
  const { animate, setAnimate } = useContext(GlobalContext);
  const { setSchedularToggle } = useContext(GlobalContext);
  const handleChangeMonth = () => {
    if (schedularToggle) {
      setMonthIndex(monthIndex - 1);
    } else {
      setWeekIndex(weekIndex - 1);
    }
    setAnimate(!animate);
  };

  const handleNextMonth = () => {
    if (schedularToggle) setMonthIndex(monthIndex + 1);
    else {
      setWeekIndex(weekIndex + 1);
    }
    setAnimate(!animate);
  };
  useEffect(() => {
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  }, [animate, setAnimate]);
  const handleReset = () => {
    setMonthIndex(dayjs().month());
    setWeekIndex(dayjs(dayjs()).week());
  };
  const [showPostModal, setShowPostModal] = useState(false);
  return (
    <nav className="flex items-center py-5 justify-between  ">
      <li className=" list-none flex items-center ">
        <AiOutlineLeft
          className="mr-5 h-9 w-9  p-2 font-bold hover:bg-gray-200 border border-transparent dark:hover:bg-transparent dark:hover:bg-darkborder cursor-pointer dark:border-darkborder dark:text-gray-200  rounded-md "
          onClick={(e: any) => handleChangeMonth()}
        />
        <button
          type="button"
          className=" capitalize text-sm  lg:text-lg font-Poppins p-2 border rounded-md dark:border-darkborder dark:hover:bg-darkbasebg  dark:bg-lightdarkbg w-24 hover:bg-slate-100"
          onClick={() => handleReset()}
        >
          Today
        </button>
        <AiOutlineRight
          className="mx-5 h-9 w-9  p-2  hover:bg-gray-200 rounded-md border border-transparent dark:hover:bg-darkborder cursor-pointer dark:hover:bg-transparent dark:border-darkborder dark:text-gray-200 "
          onClick={(e: any) => handleNextMonth()}
        />
        <h2 className="min-w-[150px] text-sm  lg:text-lg font-Poppins font-semibold">
          {schedularToggle
            ? dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM-YYYY')
            : `${dayjs().week(weekIndex).startOf('week').format('DD  MMMM')}` +
            ' - ' +
            `${dayjs().week(weekIndex).endOf('week').format('DD MMMM')}`}
        </h2>
      </li>
      <section className="flex items-center">
        <Link to="/crafter">
          <button
            type="button"
            className=" dark:bg-blue-600 text-white bg-blue-600 text-xs lg:text-sm font-normal  w-24 lg:w-24 lg:h-10 lg:text-md font-Inter rounded-md  capitalize  p-2"
          >
            Create post
          </button>
        </Link>
        <div className=" w-max p-1 font-medium text-sm font-Inter border text-black dark:border-darkborder dark:text-bluebg rounded-md ml-5">
          <button
            className={`  h-10  outline-none   w-16 p-2 rounded-md ${schedularToggle ? '' : 'dark:bg-lightdarkbg bg-blue-100 '
              } `}
            type="button"
            onClick={() => setSchedularToggle(!schedularToggle)}
          >
            Week
          </button>
          <button
            className={` h-10 outline-none  dark:text-bluebg w-16 p-2 rounded-md ${schedularToggle ? 'dark:bg-lightdarkbg bg-blue-100 ' : ''
              } `}
            type="button"
            onClick={() => setSchedularToggle(!schedularToggle)}
          >
            Month
          </button>
        </div>
        {/* {showPostModal && (
          <TaskModalUI
            HideModal={setShowPostModal}
            visible={showPostModal}
            channels={ChannelsArray}
            selectedData=
          />
        )} */}
      </section>
    </nav>
  );
}

export default CalenderHeader;
