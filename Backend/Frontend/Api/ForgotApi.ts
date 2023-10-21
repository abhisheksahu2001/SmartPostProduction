/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotApi = async (email: string) => {
  const url = import.meta.env.VITE_URL+ 'accounts/' 
  const data = new FormData();
  data.append('email', email);
  const res = await axios.post(
    url+'forgot-password/',
    data
  );

  if (res.data.status === 404) {
    toast.error(res.data.msg);
    return 'error';
  }
  if (res.data.status === 200) {
    toast.success('Email has been send');
    localStorage.setItem('resetId', res.data.id);
    return 'success';
  }
  toast.success('Something went wrong');
  return 'failed';
};

export default ForgotApi;
