import React, { useState, useEffect, useContext } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import GlobalContext from '../context/GlobalContext';

function DarkMode() {
  const { theme, setTheme } = useContext(GlobalContext);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia('(prefers-color-scheme: dark)').matches &&
      localStorage.getItem('theme') === 'dark'
    ) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);
  useEffect(() => {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  const handleThemeSwitch = () => {
    setToggle(!toggle);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  const renderThemeChange = () => {
    if (theme === 'light') {
      return (
        // eslint-disable-next-line react/button-has-type
        <button
          onClick={() => handleThemeSwitch()}
          className="bg-white shadow-md  border-gray-100   border-[1px] dark:bg-darkbglight  rounded-md p-1 w-9 h-9 text-center flex justify-center items-center"
        >
          <MoonIcon className="w-7 h-7 text-gray-400" />
        </button>
      );
    }
    return (
      // eslint-disable-next-line react/button-has-type
      <button
        onClick={() => handleThemeSwitch()}
        className="bg-white shadow-md  border-gray-100 dark:border-darkborder   border dark:bg-darkbglight rounded-lg    w-9 h-9 text-center flex justify-center items-center"
      >
        <SunIcon className="w-6 h-6 text-yellow-400 " />
      </button>
    );
  };

  return <>{renderThemeChange()}</>;
}

export default DarkMode;
