import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getLoggedUser } from '../features/auth/loginSlice';
import useFetchUser from '../../helpers/useFetchUser';
import { getUser } from '../features/auth/userSlice';

function PrivateRoute() {
  const loginStatus = useSelector(getLoggedUser);
  const { setUserData } = useFetchUser();
  if (loginStatus.isLoggedIn) {
    setUserData();
  }
  const cookie = new Cookies();
  const session = cookie.get('sessionid');
  return session ? <Outlet /> : <Navigate to="./login" />;
}

export default PrivateRoute;
