// import dayjs from 'dayjs';
// import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
// import { IoMdAdd } from 'react-icons/io';
// import { motion } from 'framer-motion';
// import { evenTask } from '../../Const';
// import GlobalContext from '../../context/GlobalContext';
// import TaskModalUI from './TaskModalUI';

// function DayHeader({ getCurrentDay, rowIdx, day }) {
//   return (
//     <p
//       className={`text-sm mt-1 dark:border-darkborder flex justify-center ${getCurrentDay()} flex items-center w-7 h-7`}
//       key={rowIdx}
//     >
//       {day.format('D')}
//     </p>
//   );
// }

// function Day({ day, rowIdx, Channelsarray }) {
//   // const [date, setDate] = useState('');
//   const dayref = useRef(null);
//   // useEffect(() => {
//   //   setDate(dayref.current.childNodes[0].firstChild.innerText);
//   // }, []);
//   // console.log(date);
//   const { monthIndex, setMonthIndex, setDisableKeyControl } =
//     useContext(GlobalContext);
//   const { animate } = useContext(GlobalContext);
//   const [newTask, setNewTask] = useState([...evenTask]);
//   const [enable, setEnable] = useState(false);
//   // const [showTask, setShowTask] = useState(false);
//   // const [selectedTask, setSelectedTask] = useState(null);

//   const getCurrentDay = () => {
//     return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
//       ? ' h-7 rounded-full bg-blue-600 dark:bg-bluebg dark:text-blue-100 text-white rounder-full items-center w-7'
//       : '';
//   };

//   useEffect(() => {
//     day.format('MM-DD') >= dayjs().format('MM-DD')
//       ? setEnable(true)
//       : setEnable(false);
//   }, [day]);

//   const getCurrentMonth = () => {
//     return day.format('MM') !== dayjs().month(monthIndex).format('MM')
//       ? 'bg-gray-200 border-gray-300 dark:bg-darkbglight dark:border-darkborder dark:text-darktext'
//       : '';
//   };

//   const getPast = () => {
//     return day.format('MM-DD') < dayjs().format('MM-DD')
//       ? ' bg-blue-200 dark:bg-lightdarkbg'
//       : '';
//   };
//   const handleDisable = () => {
//     return day.format('MM-DD') < dayjs().format('MM-DD');
//   };

//   const getRandomColor = (showTask) => {
//     const randomValue = () => Math.floor(Math.random() * 256); // Generate random value between 0 and 255

//     const red = randomValue();
//     const green = randomValue();
//     const blue = randomValue();
//     const shade = localStorage.getItem('theme') === 'dark' ? 0.6 : 0.3;
//     const alpha = Math.round(shade * 256);
//     const hexRed = red.toString(16).padStart(2, '0').toUpperCase();
//     const hexGreen = green.toString(16).padStart(2, '0').toUpperCase();
//     const hexBlue = blue.toString(16).padStart(2, '0').toUpperCase();
//     const hexAlpha = alpha.toString(16).padStart(1, '0').toUpperCase();

//     return showTask
//       ? `#${hexRed}${hexGreen}${hexBlue}`
//       : `#${hexRed}${hexGreen}${hexBlue}${hexAlpha}`;
//   };

//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [presentData, setPresentData] = useState(dayjs());
//   const handleEvent = (newTask, enable, day) => {
//     const currDate = dayjs(day).format('YYYY-MM-DD');
//     const currentTime = dayjs(dayjs().add(15, 'minutes')).format('HH:mm');
//     setPresentData(`${currDate}T${currentTime}`);
//     setDisableKeyControl(true);
//     setShowTaskModal(true);
//   };
//   return (
//     <>
//       <button
//         ref={dayref}
//         disabled={handleDisable()}
//         type="button"
//         className={`group ${getPast()} border border-gray-200 dark:border-darkborder flex flex-col hover:bg-blue-100 hover:after:addpost dark:hover:bg-lightdarkbg duration-100 ${
//           !animate ? 'opacity-1' : 'opacity-0'
//         } ${getCurrentMonth()}`}
//         onClick={() => handleEvent(newTask, enable, day)}
//       >
//         <header className="flex flex-col items-center w-full justify-end">
//           <DayHeader getCurrentDay={getCurrentDay} day={day} rowIdx={rowIdx} />
//         </header>
//       </button>

//       {showTaskModal && (
//         <TaskModalUI
//           HideModal={setShowTaskModal}
//           visible={showTaskModal}
//           selectedData={presentData}
//           channels={Channelsarray}
//         />
//       )}
//     </>
//   );
// }

// export default Day;

import React, { useContext, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { evenTask } from '../../Const';
import GlobalContext from '../../context/GlobalContext';
import TaskModalUI from './TaskModalUI';

interface DayHeaderProps {
  day: dayjs.Dayjs;
  rowIdx: number;
}
interface DayProps {
  day: dayjs.Dayjs;
  rowIdx: number;
  Channelsarray: Page[];
}
interface Page {
  page_id: number;
  page_name: string;
  page_profile_pic_url: string;
}
const getCurrentDay = (day: dayjs.Dayjs) => {
  return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
    ? ' h-7 rounded-full bg-blue-600 dark:bg-bluebg dark:text-blue-100 text-white rounder-full items-center w-7'
    : '';
};
function DayHeader({ rowIdx, day }: DayHeaderProps) {
  const currentClass = getCurrentDay?.(day);
  return (
    <p
      className={`text-sm mt-1 dark:border-darkborder flex justify-center ${currentClass} flex items-center w-7 h-7`}
      key={rowIdx}
    >
      {day.format('D')}
    </p>
  );
}

function Day({ day, rowIdx, Channelsarray }: DayProps) {
  const dayref = useRef<HTMLButtonElement>(null);
  const { monthIndex, setDisableKeyControl, animate } =
    useContext(GlobalContext);
  const [newTask, setNewTask] = useState([...evenTask]);
  const [enable, setEnable] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [presentData, setPresentData] = useState<string>(dayjs().format());

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    day.format('MM-DD') >= dayjs().format('MM-DD')
      ? setEnable(true)
      : setEnable(false);
  }, [day]);

  const getCurrentMonth = () => {
    return day.format('MM') !== dayjs().month(monthIndex).format('MM')
      ? 'bg-gray-200 border-gray-300 dark:bg-darkbglight dark:border-darkborder dark:text-darktext'
      : '';
  };

  const getPast = () => {
    return day.format('MM-DD') < dayjs().format('MM-DD')
      ? ' bg-blue-200 dark:bg-lightdarkbg'
      : '';
  };

  const handleDisable = () => {
    return day.format('MM-DD') < dayjs().format('MM-DD');
  };

  const getRandomColor = (showTask: boolean) => {
    // Implementation for getRandomColor
  };

  // const handleEvent = (newTask: any, enable: boolean, Day: Dayjs) => {
  //   const currDate = Day.format('YYYY-MM-DD');
  //   const currentTime = dayjs(dayjs().add(15, 'minutes')).format('HH:mm');
  //   setPresentData(`${currDate}T${currentTime}`);
  //   setDisableKeyControl(true);
  //   setShowTaskModal(true);
  // };

  return (
    <>
      <button
        ref={dayref}
        disabled={handleDisable()}
        type="button"
        className={`group ${getPast()} border border-gray-200 dark:border-darkborder flex flex-col hover:bg-blue-100 hover:after:addpost dark:hover:bg-lightdarkbg duration-100 ${!animate ? 'opacity-1' : 'opacity-0'
          } ${getCurrentMonth()}`}
      // onClick={() => handleEvent(newTask, enable, day)}
      >
        <header className="flex flex-col items-center w-full justify-end">
          <header className="flex flex-col items-center w-full justify-end">
            <DayHeader day={day} rowIdx={rowIdx} />
          </header>
        </header>
      </button>

      {showTaskModal && (
        <TaskModalUI
          HideModal={setShowTaskModal}
          // visible={showTaskModal}
          selectedData={presentData}
          channels={Channelsarray}
        />
      )}
    </>
  );
}

export default Day;
