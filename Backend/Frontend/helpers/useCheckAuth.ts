/* eslint-disable */
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { login } from '../src/features/auth/loginSlice';


const useCheckAuth = () => {
  useEffect(()=>{
    fetch("https://localhost:8000/accounts/session/", {
    method: "GET",
    credentials: "include" // Include cookies in the request
})
.then(response => response.json())
.then(data => {
  console.log(data)
    // Use the session data in the frontend
});
  },[])
  console.log(document.cookie)
  const cookies = new Cookies();
  console.log(cookies.get('session'))
  const dispatch = useDispatch();
  const [sessionid, setSession] = useState(null);
  const [loginSet, setLoginSet] = useState(false);
  const autoLogin = () => {
    const sid = cookies.get('sessionid');
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
