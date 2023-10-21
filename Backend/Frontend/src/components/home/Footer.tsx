/* eslint-disable */
import { MotionValue, motion, useTransform } from 'framer-motion';
import React from 'react';

interface FooterProps {
  effect: MotionValue<number>
}

function Footer({ effect }: FooterProps) {
  const scroll = useTransform(effect, [0.5, 1], [0, 5]);
  const y = useTransform(scroll, [0, 5], [100, 0]);
  return (
    <motion.div
      style={{ y }}
      className="h-[90vh] relative w-full bg-slate-300  dark:bg-[#0e1414] rounded-[5rem] m-0 p-0 left-0 flex flex-col  "
    >
      <div className="footer h-full dark:bg-lightdarkbg border-darkborder  rounded-[5rem] border ">
        <h1 className="text-[5rem] px-96 text-center text-slate-200 font-poppins font-normal m-10 flex justify-center">
          Join smartpost and save your precious time
        </h1>
        <div className="flex justify-center">
          <button
            className="m-5 p-3 w-40 dark:bg-slate-900 dark:text-darktext 
             font-inter 
            font-normal text-lg uppercase border border-slate-900 rounded-lg
            hover:bg-darktext hover:text-slate-900 duration-500 hover:w-48
            "
            type="button"
          >
            Signup
          </button>
          <button
            className="m-5 p-3 w-56 text-slate-900 bg-darktext
             font-inter 
            font-normal text-lg uppercase border border-slate-900 rounded-lg
            hover:text-darktext hover:bg-slate-900 duration-500 hover:w-64"
            type="button"
          >
            check pricing
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Footer;
