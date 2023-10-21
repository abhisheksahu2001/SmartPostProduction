/* eslint-disable */
import React, { useEffect, useMemo, useState, useRef, useContext } from 'react';
import { Formik } from 'formik';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRegister } from './features/auth/signupSlice';
import { signupSchema } from '../interfaces/registerSchema';
import useRegisterHook from '../helpers/useregisterHook';
import DarkMode from './components/DarkMode';
import GlobalContext from './context/GlobalContext';
import Logo from './components/Logo';

const Spost = 'Spost.svg';
const SpostPath = `/static/${Spost}`;
interface FormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  checkPass: string;
}

function SignUp() {
  const registerState = useSelector(getRegister);
  const { theme } = useContext(GlobalContext);

  const navigate = useNavigate();
  if (registerState.registered) {
    setTimeout(() => {
      navigate('/Login');
    }, 2000);
  }
  const { signUpHook, status, message, error } = useRegisterHook();
  const [hide, setHide] = useState<boolean>(false);

  const getInitialValues = () => ({
    name: '',
    email: '',
    phone: '',
    password: '',
    checkPass: '',
  });
  return (
    <div className="flex ">
      <div className="absolute top-5 right-5">
        <DarkMode />
      </div>
      <div className="row-span-3 h-screen flex w-full md:w-1/2 mt-14 flex-col items-center justify-center min-w-[50%]">
        <Logo theme={theme} />
        <h1 className=" font-Inter text-2xl xl:text-4xl md:text-3xl font-extrabold my-10 lg:my-5 md:my-10 mb-10">
          Welcome Back
        </h1>
        <Formik
          initialValues={getInitialValues()}
          validationSchema={signupSchema}
          onSubmit={(values, actions) => {
            signUpHook(
              values.email,
              values.name,
              values.phone,
              values.password,
              values.checkPass
            );
            actions.resetForm({ values: getInitialValues() });
          }}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <form
              className="flex flex-col w-3/5 "
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <label className="Text-basic dark:text-white text-black text-sm xl:text-md text-left my-2  xl:my-3">
                Name
              </label>
              <input
                name="name"
                placeholder="Enter Name"
                className="border rounded-md py-1  placeholder:text-slate-400  dark:bg-lightdarkbg dark:border-transparent dark:outline-none dark:focus:outline-none  text-sm  md:text-sm xl:text-md my-2 h-10 md:h-14 pl-2  text-left capitalize  focus:outline-blue-400 outline-transparent placeholder:px-2"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && touched.name ? (
                <h2 className="dark:text-red-500 text-red-700 ">
                  {errors.name}
                </h2>
              ) : null}
              <label className="Text-basic Text-basic dark:text-white text-black text-sm xl:text-md text-left my-2  xl:my-3">
                Email
              </label>
              <input
                name="email"
                placeholder="Enter Email"
                className="border rounded-md py-1 text-sm  md:text-sm xl:text-md my-2 h-10 md:h-14 pl-2 placeholder:text-slate-400  dark:bg-lightdarkbg dark:border-transparent dark:outline-none dark:focus:outline-none  text-left  focus:outline-blue-400 outline-transparent placeholder:px-2"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && touched.email ? (
                <h2 className="dark:text-red-500 text-red-700 ">
                  {errors.email}
                </h2>
              ) : null}
              <label className="Text-basic Text-basic dark:text-white text-black text-sm xl:text-md text-left my-2  xl:my-3">
                Contact No.
              </label>
              <input
                name="phone"
                placeholder="Enter Email"
                className="border rounded-md py-1 text-sm  md:text-sm xl:text-md my-2 h-10 md:h-14 pl-2 placeholder:text-slate-400  dark:bg-lightdarkbg dark:border-transparent dark:outline-none dark:focus:outline-none  text-left  focus:outline-blue-400 outline-transparent placeholder:px-2"
                aria-invalid={errors.phone ? 'true' : 'false'}
              />
              {errors.phone && touched.phone ? (
                <h2 className="dark:text-red-500 text-red-700 ">
                  {errors.phone}
                </h2>
              ) : null}
              <label className="Text-basic dark:text-white text-black text-sm xl:text-md my-2  xl:my-3 ">
                Password
              </label>
              <input
                name="password"
                placeholder="Enter Password"
                className="border rounded-md py-1 text-sm  md:text-sm xl:text-md h-10 md:h-14 my-2 placeholder:text-slate-400  dark:bg-lightdarkbg dark:border-transparent dark:outline-none dark:focus:outline-none text-left pl-2 focus:outline-blue-400  outline-transparent placeholder:px-2"
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && touched.password ? (
                <h2 className="dark:text-red-500 text-red-700 ">
                  {errors.password}
                </h2>
              ) : null}
              <label className="Text-basic dark:text-white text-black text-sm xl:text-md my-2  xl:my-3 ">
                Confirm Password
              </label>
              <input
                placeholder="Confirm Password"
                className="border rounded-md py-1 text-sm  md:text-sm xl:text-md h-10 md:h-14 my-2 placeholder:text-slate-400  dark:bg-lightdarkbg dark:border-transparent dark:outline-none dark:focus:outline-none text-left pl-2 focus:outline-blue-400  outline-transparent placeholder:px-2"
                aria-invalid={errors.password ? 'true' : 'false'}
                name="checkPass"
              />
              {errors.checkPass && touched.checkPass ? (
                <h2 className="dark:text-red-500 text-red-700 ">
                  {errors.checkPass}
                </h2>
              ) : null}
              <button
                className="border my-5 h-12 text-center capitalize Text-basic text-sm xl:text-md text-white hover:text-slate-200 hover:bg-blue-700 bg-blue-500 dark:bg-darkbasebg dark:hover:bg-darkbglight dark:border-darkborder"
                type="submit"
              >
                Sign Up
              </button>
              {status && message ? (
                <div
                  className={` border ${status === 201
                    ? 'border-green-400 text-green-700 bg-green-100'
                    : 'border-red-400 text-red-700 bg-red-100'
                    }  px-4 py-3 rounded relative ${hide ? 'hidden' : 'block'} `}
                  role="alert"
                >
                  <strong className="font-bold mr-5">
                    {status === 201 ? 'Welcome' : 'Holy smokes!'}
                  </strong>
                  <span className="block sm:inline capitalize font-semibold">
                    {message}
                  </span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      className={`fill-current h-6 w-6  ${status == 201 ? 'text-green-500' : 'text-red-500'
                        }`}
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      onClick={() => {
                        setHide((hide) => !hide);
                      }}
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              ) : null}
            </form>
          )}
        </Formik>

        <h2 className="flex justify-center items-center relative my-5 before:relative before:content-[''] before:h-[1px]  before:w-36 before:bg-gray-400 before:mr-2 after:relative after:content-[''] after:h-[1px] after:ml-2 after:w-36 after:bg-gray-400 ">
          OR
        </h2>
        <span className="flex justify-between  Text-basic">
          <h3 className="text-black text-sm dark:text-gray-400 ">
            Already have account ?
          </h3>
          <a
            href="/login"
            className="text-blue-500 text-sm underline mx-2 hover:text-blue-600 "
          >
            Login
          </a>
        </span>
      </div>
      <div className="bg-slate-200 md:w-1/2 lg:flex-1 overflow-hidden" />
    </div>
  );
}

export default SignUp;
