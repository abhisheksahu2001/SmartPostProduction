/* eslint-disable react/destructuring-assignment */
import React, { useMemo, useState, Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import weekYear from 'dayjs/plugin/weekYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import GlobalContext from './GlobalContext';

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

interface ImageUrl {
  rawImageData: File[];
  ImageUrlData: string[];
}

interface ContextValue {
  ImageUrl: ImageUrl;
  setUrl: Dispatch<SetStateAction<ImageUrl>>;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  animate: boolean;
  setAnimate: Dispatch<SetStateAction<boolean>>;
  monthIndex: number;
  setMonthIndex: Dispatch<SetStateAction<number>>;
  weekIndex: number;
  setWeekIndex: Dispatch<SetStateAction<number>>;
  schedularToggle: boolean;
  setSchedularToggle: Dispatch<SetStateAction<boolean>>;
  disableKeyControl: boolean;
  setDisableKeyControl: Dispatch<SetStateAction<boolean>>;
}

function ContextWrapper(props: any) {
  const [ImageUrl, setUrl] = useState<ImageUrl>({
    rawImageData: [],
    ImageUrlData: [],
  });
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || ''
  );
  const [schedularToggle, setSchedularToggle] = useState<boolean>(true);
  const [disableKeyControl, setDisableKeyControl] = useState<boolean>(false);
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [weekIndex, setWeekIndex] = useState<number>(dayjs().week());
  const [animate, setAnimate] = useState<boolean>(false);

  const contextValue: ContextValue = useMemo(
    () => ({
      ImageUrl,
      setUrl,
      theme,
      setTheme,
      animate,
      setAnimate,
      monthIndex,
      setMonthIndex,
      weekIndex,
      setWeekIndex,
      schedularToggle,
      setSchedularToggle,
      disableKeyControl,
      setDisableKeyControl,
    }),
    [
      ImageUrl,
      setUrl,
      theme,
      setTheme,
      animate,
      monthIndex,
      weekIndex,
      schedularToggle,
      setSchedularToggle,
      disableKeyControl,
      setDisableKeyControl,
    ]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default ContextWrapper;
