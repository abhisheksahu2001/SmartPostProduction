import { useEffect, useState, useMemo } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import fetchUser from './useFetchUser';
// import { user } from '../src/features/auth/userSlice';
// import { login } from '../src/features/auth/loginSlice';
// import useCheckAuth from './useCheckAuth';

interface ResponseData {
  status: number;
  session: string;
  message: string;
  user: string | null;
}

const url = import.meta.env.VITE_URL + import.meta.env.VITE_LOGIN;
const CSRF_URL = import.meta.env.VITE_URL + import.meta.env.VITE_CSRF;
const UseLoginHook = () => {
  const cookie = new Cookies();
  // const dispatch = useDispatch();
  // const { autoLogin } = useCheckAuth();

  const [error, setError] = useState<string>('');
  const [userData, setUser] = useState<ResponseData | null>(null);
  const [fetchCsrf, setFetchCsrf] = useState<boolean>(false);
  // useEffect(() => {
  //   autoLogin;
  // },[]);
  const loginHook = async (email: string, password: string) => {
    const csrf =  cookie.get('csrftoken') 
    const sessionid = cookie.get('sessionid')
    if (csrf && !sessionid) {
      try {
        const response = await axios.post<ResponseData>(
          url,
          { email: `${email}`, password: `${password}` },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'X-CSRFToken': cookie.get('csrftoken'),
            },
          }
        );
        setUser(response.data);
        // if (response.data.status === 200) {
        //   dispatch(
        //     login({ isLoggedIn: true, session: cookie.get('sessionid') })
        //   );
        // }
        return userData;
      } catch (err) {
        setError(err.message);
      }
    }else if (csrf && sessionid){
      const user:ResponseData = {
        status:200,
        session:sessionid,
        message:'Welcome Back',
        user:null
      }
      setUser(user)
      return userData;
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
        const res = await axios.get(CSRF_URL, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        });
      } catch (csrferror) {
        console.log(csrferror);
        setError('Please refresh the page.');
      }
    };
    getCsrf();
  }, [fetchCsrf]);
  useEffect(() => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [userData]);

  return {
    loginHook,
  };
};

export default UseLoginHook;
