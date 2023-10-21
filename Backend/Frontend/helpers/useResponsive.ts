/* eslint-disable */

import React, { useEffect, useState } from 'react';

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [breakpoint, setBreakpoint] = useState('unknown');

  const updateScreenSizeAndBreakpoint = () => {
    const width = window.innerWidth;
    setScreenSize({ width, height: window.innerHeight });
    if (width <= 640) {
      setBreakpoint('sm');
      console.log('sm')
    } else if (width <= 768) {
      setBreakpoint('md');
      console.log('md')
    } else if (width <= 1024) {
      setBreakpoint('lg');
      console.log('lg')
    } else if (width <= 1280) {
      setBreakpoint('xl');
      console.log('xl')
    } else {
      setBreakpoint('2xl');
      console.log('2xl')
    }
  };

  useEffect(() => {
    updateScreenSizeAndBreakpoint();
    window.addEventListener('resize', updateScreenSizeAndBreakpoint);
    return () => {
      window.removeEventListener('resize', updateScreenSizeAndBreakpoint);
    };
  }, []);
  return { breakpoint };
};

export default useResponsive;
