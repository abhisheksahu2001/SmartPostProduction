/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { register } from '../src/features/auth/signupSlice';


interface ResponseData {
  status: number;
  message: string;
}

const useRegisterHook = () => {
  const url = import.meta.env.VITE_URL+ 'accounts/' + import.meta.env.VITE_REGISTER;
const CSRF_URL = import.meta.env.VITE_URL+ 'accounts/' + + import.meta.env.VITE_CSRF;

  const dispatch = useDispatch();

  const cookies = new Cookies();
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<ResponseData | null>(null);
  const [fetchCsrf, setFetchCsrf] = useState<boolean>(false);

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': cookies.get('csrftoken'),
  };

  const signUpHook = async (
    email: string,
    name: string,
    phone: string,
    password: string,
    checkPass: string
  ) => {
    if (cookies.get('csrftoken')) {
      try {
        const response = await axios.post(
          url,
          {
            email: `${email}`,
            name: `${name}`,
            phone_num: `${phone}`,
            password: `${password}`,
            password2: `${checkPass}`,
          },
          { headers }
        );

        setUser(response.data);
        console.log(response);
        if (response.status === 200) {
          dispatch(register({ registered: true }));
        }
      } catch (err) {
        console.log(err);
        setUser({ status: 501, message: 'Something went wrong' });
      }
    } else {
      alert('Server was not able to connect');
      setFetchCsrf(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  useMemo(() => {
    const getCsrf = async () => {
      try {
        await axios.get(CSRF_URL, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
      } catch (csrferror) {
        setError('Please refresh the page.');
      }
    };
    getCsrf();
  }, [fetchCsrf]);

  return { status: user?.status, error, message: user?.message, signUpHook };
};

export default useRegisterHook;
