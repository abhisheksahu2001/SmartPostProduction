/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { getLoggedUser, logout } from '../features/auth/loginSlice';
import DarkMode from './DarkMode';
import GlobalContext from '../context/GlobalContext';
import Logo from './Logo';
import { getUser } from '../features/auth/userSlice';

const lightmodelogo = 'Spost.svg';
const darkmodelogo = 'darkmodelogo.svg';

// const lightmodelogoPath = `/static/${lightmodelogo}`;
// const darkmodelogoPath = `/static/${darkmodelogo}`;

interface NavbarProps {
  move: boolean;
  position: string;
}

function Navbar({ move, position }: NavbarProps) {
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const userlogged = useSelector(getLoggedUser);
  const userData = useSelector(getUser);
  const { scrollYProgress } = useScroll();

  const [moveY, setMoveY] = useState<boolean>();
  useMotionValueEvent(scrollYProgress, 'change', (latest: number) => {
    if (latest >= 0.02) {
      if (scrollYProgress?.getPrevious() < latest) {
        setMoveY(true);
      } else if (scrollYProgress?.getPrevious() > latest) {
        setMoveY(false);
      }
    }
  });
  const { theme } = useContext(GlobalContext);

  const [isLoggedIn, setLoggedIn] = useState(false);

  //
  useEffect(() => {
    setLoggedIn(userlogged.isLoggedIn);
  }, [userlogged]);
  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem('user');
  };

  return (
    <section
      className={`${isLoggedIn ? 'px-0 bg-white' : 'px-0'} z-20  ${position}  ${
        moveY && move
          ? ' -translate-y-40 duration-700'
          : ' translate-y-0 duration-700'
      }     w-full    dark:bg-darkbasebg `}
    >
      {isLoggedIn ? (
        <section className="border-b-[0.5px] dark:border-darkborder   py-1">
          <section className=" justify-between  flex">
            <nav className="flex justify-between items-center max-h-32 xl:px-44 w-full my-2">
              <div className="flex w-1/2">
                <a
                  className="min-w-[200px] w-[200px] min-h-[40px] mt-2 "
                  href={userlogged.isLoggedIn ? '/dashboard' : '/'}
                >
                  <Logo theme={theme} />
                  {/* {LOGO} */}
                </a>
              </div>
              <div className="flex ml-25 justify-end items-center  w-1/2">
                <span className="p-2">
                  <p className="" />
                </span>
                {isLoggedIn && userData ? (
                  <div className="flex items-baseline ">
                    <h1 className=" font-Inter font-semibold  ">
                      {userData.email}
                    </h1>
                    <div className="mx-5 flex   ">
                      <Dropdown />
                    </div>
                  </div>
                ) : (
                  <a
                    href="login"
                    className="my-5 mr-2 p-2 w-20 text-center font-Inter font-semibold text-blue-600 bg-blue-100 rounded-md"
                  >
                    Login
                  </a>
                )}
                <DarkMode />
              </div>
            </nav>
          </section>
        </section>
      ) : (
        <section className="shadow-md dark:border-darkbasebg m-0 p-0 border pb-2 bg-white dark:bg-darkbasebg w-full relative   justify-center   z-20 ">
          <div className="flex max-h-24 xl:px-36">
            <div className="flex justify-between items-center w-full">
              <a className=" mx-10" href="/">
                {/* {LOGO} */}
                <Logo theme={theme} />
              </a>
              <ul className="flex p-5 justify-center items-center mt-4">
                <li className="px-2">
                  <a href="#" className="Text-basic">
                    Tools
                  </a>
                </li>
                <li className="px-2">
                  <a href="#" className="Text-basic">
                    Channels
                  </a>
                </li>
                <li className="px-2">
                  <a className="Text-basic" href="./plans">
                    Pricing
                  </a>
                </li>
                <li className="px-2">
                  <a href="#" className="Text-basic">
                    Blogs
                  </a>
                </li>
              </ul>
              <div className="flex ml-20 justify-center items-center mt-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="login"
                      onClick={(e) => {
                        handleLogout(e);
                      }}
                      className="my-5 mr-2 p-2 w-20 text-center font-Inter font-semibold text-blue-600 bg-blue-100 rounded-md"
                    >
                      Logout
                    </Link>
                    <Link
                      to="dashBoard"
                      className="my-5 mr-2 p-2 w-30 text-center font-Inter font-semibold text-blue-600 bg-blue-100 rounded-md"
                    >
                      DashBoard
                    </Link>
                  </>
                ) : (
                  <a
                    href="login"
                    className="dark:bg-darkbglight dark:hover:bg-darkborder dark:text-white my-5 mr-2 p-[5px] w-20  dark:border-darkborder  border-[1px] dark:bg-dark text-center font-Inter font-semibold text-blue-600 bg-blue-100 rounded-md"
                  >
                    Login
                  </a>
                )}
                <DarkMode />
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}

export default Navbar;
