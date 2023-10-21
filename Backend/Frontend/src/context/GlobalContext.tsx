import React from 'react';

type ImageUrl = {
  rawImageData: File[];
  ImageUrlData: string[];
};

interface GlobalContextProps {
  theme: string;
  animate: boolean;
  schedularToggle: boolean;
  disableKeyControl: boolean;
  monthIndex: number;
  weekIndex: number;
  ImageUrl: ImageUrl;
  setUrl: (URl: ImageUrl) => void; // Specify the type of the 'setUrl' parameter
  setDisableKeyControl: (disable: boolean) => void;
  setAnimate: (animate: boolean) => void;
  setMonthIndex: React.Dispatch<React.SetStateAction<number>>;
  setWeekIndex: React.Dispatch<React.SetStateAction<number>>;
  setSchedularToggle: (toggle: boolean) => void;
  setTheme: (theme: string) => void;
}

const initialImageUrl: ImageUrl = {
  rawImageData: [],
  ImageUrlData: [],
};

const GlobalContext = React.createContext<GlobalContextProps>({
  theme: 'dark',
  animate: false,
  schedularToggle: true,
  disableKeyControl: false,
  monthIndex: 0,
  weekIndex: 0,
  ImageUrl: initialImageUrl,
  setUrl: () => { },
  setDisableKeyControl: () => { },
  setAnimate: () => { },
  setMonthIndex: () => { },
  setWeekIndex: () => { },
  setSchedularToggle: () => { },
  setTheme: () => { },
});

export default GlobalContext;
