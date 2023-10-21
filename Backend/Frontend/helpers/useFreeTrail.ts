/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

const useFreeTrail = () => {
const url = import.meta.env.VITE_URL+ 'payments/free-trial/';
  const cookie = new Cookies();
  const startFreeTrail = async () => {
    return axios.post( url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials:'include'
      },
    });
  };
  return { startFreeTrail };
};

export default useFreeTrail;
