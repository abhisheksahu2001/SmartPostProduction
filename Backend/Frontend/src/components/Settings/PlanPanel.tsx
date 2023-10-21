import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plan, getPlan } from '../../features/auth/planSlice';

interface PlanPanelProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: any;
}

// eslint-disable-next-line react/function-component-definition
const PlanPanel: React.FC<PlanPanelProps> = ({ setShow, currentUser }) => {
  const planDetail = useSelector(getPlan);
  const [planProgress, setPlanProgress] = useState({
    post_Api: 0,
    schedule_Api: 0,
  });
  useMemo(() => {
    const postpercentage =
      (currentUser.user_post_count / planDetail.post_limit) * 100;
    const schedulepercentage =
      (currentUser.user_post_schedule_count / planDetail.post_schedule_limit) *
      100;
    setPlanProgress({
      post_Api: postpercentage,
      schedule_Api: schedulepercentage,
    });
  }, [planDetail, currentUser]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="group relative z-0 transition-all focus-within:z-10">
        <div className=" xl:max-w-[90%]  border  dark:border-darkborder  isolate mt-3 -space-y-px rounded-2xl dark:bg-darkbglight bg-slate-100/70">
          <div className="group relative dark:bg-blue-500 bg-blue-600  rounded-lg  flex p-5 justify-between items-center z-0 transition-all focus-within:z-10">
            <div className=" text-white   mb-2  text-start ">
              <h1 className="font-bold mb-2 text-lg lg:text-3xl font-Poppins capitalize">
                {planDetail.type}
              </h1>
              <h2 className="text-xs lg:text-[16px] mb-2 font-semibold">
                {dayjs(currentUser.user_plan_activate_date).format(
                  ' DD-MMMM-YYYY '
                )}
                -
                {dayjs(currentUser.user_plan_expiry_date).format(
                  ' DD-MMMM-YYYY'
                )}
              </h2>
            </div>
            <Link
              to="/plans"
              className={`text-center text-sm lg:text-md  w-1/3 lg:w-40 mt-2 font-Inter font-normal p-3 hover:bg-darkbglight rounded-md text-white bg-darkbasebg   `}
            >
              Upgrade
            </Link>
          </div>
          <section className="p-5">
            <h1 className="font-semibold mb-2 text-sm lg:text-xl font-Inter capitalize">
              Usage
            </h1>
            <div className="my-9">
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-slate-700 dark:text-white">
                  Post Api : {currentUser.user_post_count} /{' '}
                  {planDetail.post_limit}
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-white">
                  {planProgress.post_Api}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-slate-600">
                <div
                  className="bg-blue-500 h-2.5 rounded-full "
                  style={{ width: `${planProgress.post_Api}%` }}
                />
              </div>
            </div>
            <div className="my-9">
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-slate-700 dark:text-white">
                  Schedule Api : {currentUser.user_post_schedule_count} /{' '}
                  {planDetail.post_schedule_limit}
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-white">
                  {planProgress.schedule_Api}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-slate-600">
                <div
                  className="bg-blue-500 h-2.5 rounded-full "
                  style={{ width: `${planProgress.schedule_Api}%` }}
                />
              </div>
            </div>
          </section>
        </div>
        <span className="flex items-center mt-4 xl:w-[88%] justify-end mr-4 z-50 ">
          <button
            onClick={() => {
              setShow(true);
            }}
            type="button"
            className="text-sm font-semibold capitalize text-neutral-400 hover:text-blue-500"
          >
            View Subscription History
          </button>
        </span>
      </div>
    </div>
  );
};

export default PlanPanel;
