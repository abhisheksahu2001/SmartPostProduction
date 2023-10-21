import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { getUser } from '../../features/auth/userSlice';
import ForgotApi from '../../../Api/ForgotApi';

function UserPanel() {
  const userData = useSelector(getUser);
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(false);
  const handleSendForgotLink = async () => {
    if (email) {
      setDisable(true);
      const res = await ForgotApi(email);
      if (res) {
        setDisable(false);
      }
    }
    toast.error('Enter valid email');
  };
  return (
    <>
      <div className=" xl:max-w-[90%] isolate mt-3 -space-y-px rounded-2xl dark:bg-lightdarkbg bg-slate-100/70">
        <div className="group relative z-0 transition-all focus-within:z-10">
          <input
            placeholder=""
            name="email"
            className="peer block w-full border xl:text-xl lg:text-lg  border-neutral-300 dark:border-darkborder 
                  dark: bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 dark:text-neutral-200 ring-4
                 ring-transparent transition focus:border-neutral-950 focus:outline-none
                 focus:ring-neutral-100 group-first:rounded-t-2xl group-last:rounded-b-2xl"
            value={userData.email}
            disabled
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute 
                  left-6 top-1/2 -mt-3 origin-left xl:text-xl lg:text-lg   text-base/6 text-neutral-500 dark:text-neutral-200 
                  transition-all duration-200 peer-focus:-translate-y-4 
                  peer-focus:scale-75 xl:peer-focus:scale-90  peer-focus:font-semibold 
                  peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 
                  peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold 
                  peer-[:not(:placeholder-shown)]:text-neutral-950"
          >
            Email
          </label>
        </div>
        <div className="group relative z-0 transition-all focus-within:z-10">
          <input
            placeholder=""
            name="name"
            className="peer block w-full border xl:text-xl lg:text-lg dark:text-neutral-200 dark:border-darkborder
                   border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950
                    ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none 
                    focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
            value={userData.name}
            disabled
          />
          <label
            htmlFor="name"
            className="pointer-events-none xl:text-xl lg:text-lg   dark:text-neutral-200 absolute 
                  left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 
                  transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 
                  peer-focus:font-semibold peer-focus:text-neutral-950 
                  peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 
                  peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
          >
            name
          </label>
        </div>
        <div className="group relative z-0 transition-all focus-within:z-10">
          <input
            id=":S3:"
            placeholder=""
            className="peer block w-full border xl:text-xl lg:text-lg dark:text-neutral-200
                  dark:border-darkborder border-neutral-300 bg-transparent 
                  px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent 
                  transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 
                  group-first:rounded-t-2xl group-last:rounded-b-2xl"
            type="text"
            name="plan_type"
            value={userData.plan_type}
            disabled
          />
          <label
            htmlFor=":S3:"
            className="pointer-events-none xl:text-xl lg:text-lg dark:text-neutral-200 absolute 
                  left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 
                  transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 
                  peer-focus:font-semibold peer-focus:text-neutral-950 
                  peer-[:not(:placeholder-shown)]:-translate-y-4 
                  peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold 
                  peer-[:not(:placeholder-shown)]:text-neutral-950"
          >
            Subscription
          </label>
        </div>
        <div className="group relative z-0 transition-all focus-within:z-10">
          <input
            id=":S3:"
            placeholder=""
            autoComplete="off"
            className="peer block w-full border  lg:text-lg dark:text-neutral-200
                  dark:border-darkborder border-neutral-300 bg-transparent 
                  px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent 
                  transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 
                  group-first:rounded-t-2xl group-last:rounded-b-2xl"
            type="text"
            name="plan_type"
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <button
            className={` ${disable
                ? 'bg-slate-300 dark:bg-slate-500 dark:hover:bg-slate-500 hover:bg-slate-300 text-slate-300 dark:slate-500  '
                : ' bg-blue-100 dark:bg-darkbglight  dark:text-blue-300 text-blue-700 hover:bg-blue-200 dark:hover:border-darkborder'
              }  absolute capitalize right-10 top-8 m-auto block  
                  mr-4 py-2 px-4
                  text-xs lg:file:text-sm
                  rounded-full border-0
                   font-semibold
                  
                   dark:border
                   border-transparent
                  
                   cursor-pointer  `}
            type="button"
            disabled={disable}
            onClick={() => handleSendForgotLink()}
          >
            get link
          </button>
          <label
            htmlFor=":S3:"
            className="pointer-events-none  lg:text-lg dark:text-neutral-200 absolute 
                  left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 
                  transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 
                  peer-focus:font-semibold peer-focus:text-neutral-950 
                  peer-[:not(:placeholder-shown)]:-translate-y-4 
                  peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold 
                  peer-[:not(:placeholder-shown)]:text-neutral-950"
          >
            Password Reset : Enter your Email
          </label>
        </div>
      </div>
      <span className="flex items-center mt-4 xl:w-[88%] justify-end mr-4 ">
        <p className="text-sm font-semibold capitalize text-neutral-400">
          last login
        </p>
        <p className="ml-2 text-sm text-neutral-400 ">
          {dayjs(userData.last_login).format('MM/DD/YYYY  hh:mm A')}
        </p>
      </span>
    </>
  );
}

export default UserPanel;
