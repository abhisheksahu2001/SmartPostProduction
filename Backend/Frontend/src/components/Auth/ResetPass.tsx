/* eslint-disable */
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { RiKey2Line } from 'react-icons/ri';

function ResetPass() {
  const [disable, setDisable] = useState(false);
  const [theme, setTheme] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme;
  });

  const [password, setPassword] = useState({
    passwordOne: '',
    confirmpassword: '',
  });
  const RequestReset = async () => {
    const data = new FormData();
    data.append('password', password.passwordOne);
    const id = localStorage.getItem('resetId');
    axios
      .post(`https://localhost:8000/accounts/change_password/${id}/`, data)
      .then((res) => {
        toast.success(res.data.msg);
        localStorage.removeItem('resetId');
      })
      .catch((err) => toast.error('Something Went wrong'));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password.confirmpassword === password.passwordOne) {
      RequestReset();
      setDisable(true);
    } else {
      setDisable(false);
      toast.error('Password does not Match');
    }
  };

  return (
    <section
      className={` ${theme === 'dark'
        ? 'bg-darkbasebg text-slate-200 '
        : 'bg-white text-black '
        }  w-screen h-screen  `}
    >
      <div className="absolute w-1/2 xl:w-[30%]     bg-lightdarkbg border border-darkborder  rounded-md p-5 text-center   top-1/3 left-1/2 -translate-x-1/2 ">
        <h1 className="my-8 lg:text-xl xl:text-3xl text-slate-300 font-Poppins font-bold ">
          Reset your password
        </h1>
        <span className=" my-5 flex items-center justify-center  ">
          <RiKey2Line
            size={90}
            className=" shadow-sm  text-emerald-600 bg-darkbglight rounded-full  p-5"
          />
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full items-start"
        >
          <label
            htmlFor="password"
            className=" my-2 font-Inter font-semibold text-sm lg:text-xl "
          >
            Enter New Password
          </label>
          <input
            className=" rounded-md p-2 border-[1px] focus:border-blue-500 
             placeholder:pl-2 border-slate-500 outline-none
             bg-darkbglight  placeholder:font-slate-200 w-full h-[50px] 
             my-2 text-xs lg:text-lg text-white  font-semibold "
            name="password"
            type="text"
            // placeholder=""
            required
            onChange={(e) =>
              setPassword({ ...password, passwordOne: e.target.value })
            }
          />
          <label
            htmlFor="password"
            className=" my-2 font-Inter font-semibold text-sm lg:text-lg  "
          >
            Confirm Password
          </label>
          <input
            className=" rounded-md p-2 border-[1px] focus:border-blue-500 
             placeholder:pl-2 border-slate-500 outline-none
             bg-darkbglight  placeholder:font-slate-200 w-full h-[50px] 
             my-2 text-xs lg:text-lg text-white  font-semibold "
            name="password"
            type="text"
            // placeholder=""
            required
            onChange={(e) =>
              setPassword({ ...password, confirmpassword: e.target.value })
            }
          />
          <button
            disabled={disable}
            type="submit"
            className="my-2 hover:bg-emerald-700 bg-emerald-600 font-Inter font-semibold w-full h-[50px] rounded-md   "
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPass;
