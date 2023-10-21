/* eslint-disable */
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios, { AxiosResponse } from 'axios';

export const usePostData = () => {
  const cookies = new Cookies();

  const FBPostApi = async (data: any) => {
    return axios.post('/facebook-access/facebook-post/', data, {
      headers: {
        Credential: 'include'
      },
    });
  };

  return { FBPostApi };
};
