/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import useLoginHook from '../helpers/useloginHook';
import { getLoggedUser, login } from './features/auth/loginSlice';
import { loginSchema } from '../interfaces/loginSchema';
import useCheckAuth from '../helpers/useCheckAuth';
import DarkMode from './components/DarkMode';
import GlobalContext from './context/GlobalContext';
import Logo from './components/Logo';

// const SpostPath = `/static/${Spost}`;

function Login() {
  const { theme } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getLoggedUser);
  const [hide, setHide] = useState<boolean>(false);
  const cookie = new Cookies();

  const { autoLogin } = useCheckAuth();
  useEffect(() => {
    const session = cookie.get('sessionid');
    if (session != null && session != undefined)
      dispatch(login({ isLoggedIn: true, session }));
  }, []);

  if (user.isLoggedIn) {
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  }
  const { loginHook, status, message } = useLoginHook();
  useMemo(() => {
    if (status) {
      setHide((pre) => !pre);
    }
  }, [status]);
  return (
    <section className="w-screen h-screen flex justify-center items-center  dark:bg-darkbglight  ">
      <div className="absolute top-5 right-5">
        <DarkMode />
      </div>
      <div className="md:w-1/2 w-2/3  h-3/4 flex flex-col items-center justify-center dark:border dark:border-darkborder rounded-xl dark:bg-darkbasebg ">
        <Logo theme={theme} />
        <h1 className=" font-Inter text-4xl font-extrabold my-5 mb-10">
          Welcome Back
        </h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            loginHook(values.email, values.password);
          }}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <form
              className="flex flex-col w-3/5 dark:text-white  "
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <label
                htmlFor="email"
                className="Text-basic dark:text-white text-black text-sm  md:text-md text-left my-1"
              >
                Email
              </label>
              <input
                name="email"
                placeholder="Enter Email"
                aria-invalid={errors.email ? 'true' : 'false'}
                className="border rounded-md dark:border-darkborder dark:bg-lightdarkbg  py-1 text-sm  md:text-md my-2 h-12 pl-2   text-left dark:focus:outline-none focus:outline-blue-400 outline-transparent placeholder:px-2"
              />
              {errors.email && touched.email ? (
                <h2 className=" dark:text-red-500 text-red-700 ">
                  {errors.email}
                </h2>
              ) : null}
              <label className="Text-basic text-sm  md:text-md my-2 dark:text-white text-black ">
                Password
              </label>
              <input
                name="password"
                placeholder="Enter Password"
                aria-invalid={errors.password ? 'true' : 'false'}
                className="border rounded-md py-1 dark:border-darkborder dark:bg-lightdarkbg text-sm  md:text-md h-12 my-2 text-left pl-2 focus:outline-blue-400 dark:focus:outline-none  outline-transparent placeholder:px-2"
              />
              {errors.password && touched.password ? (
                <h2 className=" dark:text-red-500 text-red-700 ">
                  {errors.password}
                </h2>
              ) : null}
              <button
                type="submit"
                className="border my-5 rounded-md h-12 text-center capitalize Text-basic text-sm  md:text-md text-white dark:bg-darkborder dark:border-transparent hover:text-slate-200 hover:bg-blue-700 bg-blue-500"
              >
                Log in
              </button>
              <Link
                className=" flex justify-end  mx-2 text-right"
                to="/Recoveraccount"
              >
                <button
                  type="button"
                  className="text-blue-500 text-sm underline hover:text-blue-600 "
                >
                  Forgot Password
                </button>
              </Link>
              <div
                className={` border ${status === 200
                    ? 'border-green-400 text-green-700 bg-green-100'
                    : 'border-red-400 text-red-700 bg-red-100'
                  }  px-4 py-3 rounded relative ${hide ? 'block' : 'hidden'} `}
                role="alert"
              >
                <strong
                  className={` font-bold mr-5 ${hide ? 'block' : 'hidden'} `}
                >
                  {status === 200 ? 'login Successful' : message}
                </strong>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className={`fill-current h-6 w-6  ${status === 200 ? 'text-green-500' : 'text-red-500'
                      }`}
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => {
                      setHide(() => false);
                      console.log(hide);
                    }}
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            </form>
          )}
        </Formik>
        <h2 className="flex justify-center items-center relative my-5 before:relative before:content-[''] before:h-[1px]  before:w-36 before:bg-gray-400 before:mr-2 after:relative after:content-[''] after:h-[1px] after:ml-2 after:w-36 after:bg-gray-400 ">
          OR
        </h2>
        <span className="flex justify-between  Text-basic">
          <h3 className="text-black text-sm dark:text-gray-400 ">
            New to SmartPost?
          </h3>
          <a
            href="/signup"
            className="text-blue-500 text-sm underline mx-2 hover:text-blue-600 "
          >
            SignUp
          </a>
        </span>
      </div>
    </section>
  );
}

export default Login;
