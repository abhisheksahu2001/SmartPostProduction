import React, { Profiler, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import { getUser, user } from './features/auth/userSlice';
import 'react-circular-progressbar/dist/styles.css';
import UserPanel from './components/Settings/UserPanel';
import Plans from './Plans';
import useFreeTrail from '../helpers/useFreeTrail';
import PlanPanel from './components/Settings/PlanPanel';
import useUpdateUser from '../helpers/useUpdateUser';
import PaymentPanel from './components/Settings/PaymentPanel';
import { Loading } from './components/Loading';

interface Profile {
  value: File | null; // Adjust the type according to your needs
}

function Setting() {
  const [loaded, setLoaded] = useState(false);
  setTimeout(() => {
    setLoaded(true);
  }, 1500);

  const [ShowPayHistoryModal, setShowPayHistoryModal] = useState(false);
  const PaymentHistoryModalRef = useRef(null);
  const profileRef: React.RefObject<HTMLInputElement> = useRef(null);
  const [picUpload, setPicUpload] = useState<File | null>(null);
  const { startFreeTrail } = useFreeTrail();
  const [disableFreeTrailButton, setDisableFreeTrailButton] = useState(false);
  const userData = useSelector(getUser);
  const handleUpload = (e: any) => {
    setPicUpload(e.target.files[0]);
  };
  const handleFreeTrail = async () => {
    setDisableFreeTrailButton(true);
    startFreeTrail()
      .then((res) => {
        const response = res.data;
        if (response.status === 200)
          return toast.success(response.message, { autoClose: 1500 });
        if (response.status === 208)
          return toast.success(response.message, { autoClose: 1500 });
        return toast.error(response.message);
      })
      .then(() => {
        setDisableFreeTrailButton(false);
      });
  };
  const clearInput = () => {
    if (profileRef.current) {
      profileRef.current.value = '';
    }
    setPicUpload(null);
  };
  const { updateProfile } = useUpdateUser();
  const handleUpdate = () => {
    if (picUpload instanceof File) {
      updateProfile(userData.id, picUpload, '')
        .then((res) => toast.success('Profile Update', { autoClose: 1500 }))
        .catch((err) => toast.error(err));
    }
  };

  const variants = {
    open: { x: '0%' },
    closed: {
      x: '100%',
    },
  };

  return (
    <section className="bg-slate-100    dark:bg-darkbasebg overflow-hidden ">
      <Navbar move={false} position="fixed" />
      {loaded ? (
        <>
          <section
            className={`  w-4/5 xl:w-[90%] absolute duration-500 transition  ${ShowPayHistoryModal ? 'blur-md' : ''
              }   mx-[6%]  pt-28 pb-10 `}
          >
            <div className="text-start">
              <span className="flex w-full xl:w-[90%] xl:mx-20 justify-between items-center">
                <h1 className="text-start text-lg font-Inter ml-2 font-bold lg:text-2xl xl:text-4xl dark:text-slate-200 md:text-xl  ">
                  Hi, {userData.name}
                </h1>
                <div className="flex w-1/3 lg:w-[20%] xl:w-[10%]  md:w-1/4  items-center ">
                  <h3 className="w-1/3 dark:text-slate-300 font-medium ">
                    Plan
                  </h3>
                  <span className=" text-center py-1 text-blue-700 dark:text-blue-500  font-semibold  text-md rounded-full bg-blue-100 dark:bg-darkbglight flex-1  ">
                    {userData.user_plan_status ? userData.plan_type : 'No Plan'}
                  </span>
                </div>
              </span>
              <form className="xl:ml-20 ">
                <div className="shrink-0 flex justify-start  items-center mx-2 my-10  ">
                  {picUpload === null && userData.pic ? (
                    <img
                      src={`${userData.pic}`}
                      alt="upload "
                      className="w-20 h-20 rounded-full mr-8 "
                    />
                  ) : null}
                  {picUpload instanceof File && (
                    <>
                      <img
                        src={URL.createObjectURL(picUpload)}
                        alt="upload "
                        className="w-20 h-20 rounded-full mr-8 "
                      />
                      <span className="text-sm w-1/4 sm:w-[20%] lg:w-[15%] xl:text-lg xl:w-[10%]   capitalize font-Inter">
                        Update photo
                      </span>
                    </>
                  )}

                  <label className="block text-sm  ">
                    <span className="sr-only text-xs   ">
                      Choose profile photo
                    </span>
                    <input
                      ref={profileRef}
                      onChange={(e) => handleUpload(e)}
                      type="file"
                      className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:text-xs lg:file:text-sm
                  file:rounded-full file:border-0
                   file:font-semibold
                   file:bg-blue-100
                   dark:file:bg-darkbglight
                   dark:file:text-blue-300
                   file:text-blue-700
                  hover:file:bg-blue-200
                   file:cursor-pointer
                  "
                    />
                  </label>
                  {picUpload && (
                    <>
                      <button
                        type="button"
                        className="absolute  shadow-lg text-white translate-x-16 -translate-y-8 font-bold rounded-full text-xs  bg-blue-500 hover:bg-blue-700  w-5 h-5  "
                        onClick={() => {
                          clearInput();
                        }}
                      >
                        X
                      </button>
                      <button
                        type="button"
                        className="text-xs dark:text-white text-blue-500  absolute translate-y-16 mt-2 w-20  font-bold bg-blue-100 dark:bg-blue-500 dark:hover:bg-blue-700  p-2 rounded-full "
                        onClick={() => {
                          handleUpdate();
                        }}
                      >
                        Update
                      </button>
                    </>
                  )}
                </div>
                <div className="flex-col xl:flex-row flex">
                  <div className="flex flex-1 flex-col ">
                    <h2 className="font-Poppins my-4 text-md ml-2  ">
                      Personal Information
                    </h2>
                    <UserPanel />
                  </div>
                  {userData.user_plan_status ? (
                    <div className="flex flex-col flex-1">
                      <h2 className="font-Poppins my-4 text-md ml-2 ">
                        Plan Information
                      </h2>

                      <PlanPanel
                        setShow={setShowPayHistoryModal}
                        currentUser={userData}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-1 flex-col">
                      <div className=" xl:max-w-[90%]  border  dark:border-darkborder  isolate mt-3 -space-y-px rounded-2xl dark:bg-darkbglight bg-white/50">
                        <div className="group relative dark:bg-blue-500 bg-blue-600  rounded-lg  flex p-5 justify-between items-center z-0 transition-all focus-within:z-10">
                          <div className=" text-white   mb-2  text-start ">
                            <h1 className="font-bold mb-2 text-sm lg:text-lg font-Poppins capitalize">
                              Start your Free trail
                            </h1>
                            <h2 className="text-xs lg:text-[16px] mb-2 font-semibold">
                              Oops, you don't have active plan
                            </h2>
                          </div>
                          <button
                            disabled={disableFreeTrailButton}
                            onClick={() => {
                              handleFreeTrail();
                            }}
                            type="button"
                            className={`text-center text-sm lg:text-md  w-1/3 lg:w-40 mt-2 font-Inter font-bold p-3 hover:bg-darkbglight rounded-md text-white bg-darkbasebg ${disableFreeTrailButton ? 'bg-darkbglight' : ''
                              }  `}
                          >
                            Join
                          </button>
                        </div>
                        <h1>Small Slider of plans</h1>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </section>
          <motion.section
            variants={variants}
            animate={ShowPayHistoryModal ? 'open' : 'closed'}
            transition={{ ease: 'linear', duration: 0.4 }}
            className="fixed translate-x-[100%]  h-full top-0 xl:w-1/3 md:w-[60%] right-0  overflow-hidden z-20   border border-slate-200 dark:border-l-darkborder dark:border-transparent  rounded-l-3xl   "
          >
            <motion.div
              ref={PaymentHistoryModalRef}
              className="relative right-0  h-screen bg-white    dark:bg-lightdarkbg  z-20     
           
         py-5 flex flex-col duration-700 transition   "
            >
              <PaymentPanel HideModel={setShowPayHistoryModal} />
            </motion.div>
          </motion.section>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default Setting;
