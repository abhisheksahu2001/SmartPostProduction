/* eslint-disable */
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { getUser, user } from '../src/features/auth/userSlice';
import { Plan } from '../src/features/auth/planSlice';

const useFetchUser = () => {
const url = import.meta.env.VITE_URL+ 'accounts/' + import.meta.env.VITE_REGISTER;
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const userData = useSelector(getUser);
  const [fetchedUser, setFetchedUser] = useState(false);
  const setUserData = () => {
    if (userData.email === '' && !fetchedUser) {
      setFetchedUser(true);
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            credentials:'include'
          },
        })
        .then((res) => {
          const { data } = res.data;
          const { user_plan: plan } = res.data.data;
          const { user_active: planDetail } = res.data.data.user_plan;
          if (plan?.user_plan_status) {
            dispatch(
              user({
                id: data?.user_id,
                pic: data?.user_pic,
                last_login: data?.user_last_login,
                email: data?.user_email,
                name: data?.user_name,
                phone: data?.user_contact,
                created_at: data?.user_created_at,
                user_plan_status: plan?.user_plan_status,
                plan_id: planDetail?.id,
                user_post_count: planDetail?.user_post_count,
                user_post_schedule_count: planDetail?.user_post_schedule_count,
                plan_type: planDetail?.plan_type,
                user_plan_activate_date: planDetail?.start_at,
                user_plan_expiry_date: planDetail?.end_at,
              })
            );
            dispatch(
              Plan({
                id: plan?.plan_id,
                type: plan?.plan_type,
                details: plan?.plan_details,
                post_limit: plan?.plan_post_limit,
                post_schedule_limit: plan?.plan_post_schedule,
              })
            );
          } else {
            dispatch(
              user({
                id: data?.user_id,
                pic: data?.user_pic,
                last_login: data?.user_last_login,
                email: data?.user_email,
                name: data?.user_name,
                created_at: data?.user_created_at,
                user_plan_status: plan?.user_plan_status,
              })
            );
          }
        });
    }
  };
  return { setUserData };
};

export default useFetchUser;
