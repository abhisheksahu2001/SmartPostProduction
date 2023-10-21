/* eslint-disable */
import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const useUpdateUser = () => {
  const baseUrl = import.meta.env.VITE_URL
  const cookie = new Cookies();
  
  const updateProfile = async (id: string, pic: File, name: string) => {
    const url = `${baseUrl}accounts/users/${id}/`;
    const formdata = new FormData();
    if (pic && name === '') {
      formdata.append('profile_pic', pic);
      console.log(formdata.get('profile_pic'));
      return axios.patch(url, formdata, {
        headers: {
          'X-CSRFToken': cookie.get('csrftoken'),
        },
      });
    }
    if (name !== undefined && pic === undefined) {
      formdata.append('name', name);

      return axios.patch(url, formdata, {
        headers: {
          'X-CSRFToken': cookie.get('csrftoken'),
        },
      });
    }
    formdata.append('name', name);
    formdata.append('profile_pic', pic);
    return axios.patch(url, formdata, {
      headers: {
        'X-CSRFToken': cookie.get('csrftoken'),
      },
    });
  };

  return { updateProfile };
};

export default useUpdateUser;
