/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineMail } from 'react-icons/ai';
import ForgotApi from '../../../Api/ForgotApi';

function ForgetPass() {
  const [disable, setDisable] = useState(false);
  const [theme, setTheme] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme;
  });
  const [email, setEmail] = useState('');

  const SendRequest = async () => {
    setDisable(true);
    const res = await ForgotApi(email);
    if (res) {
      setDisable(false);
    }
  };

  const handleSubmit = (e: any) => {
    setDisable(true);
    e.preventDefault();
    SendRequest();
  };

  return (
    <section
      className={` ${theme === 'dark'
        ? 'bg-darkbasebg text-slate-200 '
        : 'bg-white text-black'
        }  w-screen h-screen  `}
    >
      <div className="absolute w-1/2 xl:w-[30%]  shadow-md  bg-slate-100 text-lg lg:text-xl xl:text-3xl dark:bg-lightdarkbg border dark:border-darkborder  rounded-md p-5 text-center   top-1/4 left-1/2 -translate-x-1/2 ">
        <h1 className="my-8 dark:text-slate-300  font-Poppins font-bold  ">
          Forgot your password?
        </h1>
        <span className=" my-5 flex items-center justify-center  ">
          <AiOutlineMail
            size={90}
            className=" shadow-sm  dark:text-emerald-600 text-slate-900  dark:bg-darkbglight bg-blue-200 rounded-full  p-5"
          />
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full items-start"
        >
          <label
            htmlFor="Email"
            className=" my-2 font-Inter font-semibold text-sm lg:text-lg   "
          >
            Whats your email address?
          </label>
          <input
            className=" rounded-md p-2 border-[1px] focus:border-blue-500 
             placeholder:pl-2 border-slate-500 outline-none
             dark:bg-darkbglight bg-slate-200  placeholder:font-slate-200 w-full h-[50px] 
             my-2 text-sm lg:text-md text-white  font-semibold "
            name="password"
            type="email"
            placeholder="you@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            disabled={disable}
            type="submit"
            className={` ${disable ? 'bg-slate-600  hover:bg-slate-600' : ''
              }  my-2 xl:text-sm lg:text-sm hover:bg-emerald-500 dark:hover:bg-emerald-700 
             bg-emerald-400 dark:bg-emerald-600 font-Inter font-semibold w-full h-[50px] rounded-md  `}
          >
            Send reset link
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgetPass;
