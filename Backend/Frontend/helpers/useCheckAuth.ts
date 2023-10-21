/* eslint-disable */
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { login } from '../src/features/auth/loginSlice';


const useCheckAuth = () => {
 
  console.log(document.cookie)
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [sessionid, setSession] = useState(null);
  const [loginSet, setLoginSet] = useState(false);
  const autoLogin = () => {
    const sid = cookies.get('clientsessionid');
    setSession(sid);
  };

  useMemo(() => {
    if (sessionid && !loginSet) {
      dispatch(login({ isLoggedIn: true, session: sessionid }));
      setLoginSet(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionid, loginSet]);
  return { autoLogin };
};

export default useCheckAuth;
