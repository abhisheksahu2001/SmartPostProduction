/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Page {
  page_id:number;
  page_name: string;
  page_profile_pic_url: string;
}

type PageArray = Page[];

const useChannelsData = () => {
  const [pageArray, setPageArray] = useState<PageArray>([]);
  const [error, setError] = useState<string>();
  useEffect(() => {
    // axios
    //   .get('/facebook-access/facebook-token/')
    //   .then((res) => {
    //     setPageArray(res.data.data);
    //   })
    //   .catch((err) => setError(err));

    pageArray.push(
      {
        page_id:121342567,
        page_name: 'smartpost',
        page_profile_pic_url:
          'https://cdn.pixabay.com/photo/2023/05/21/16/03/mosque-8008801_1280.png',
      },
      {
        page_id:98765543,
        page_name: 'fandom',
        page_profile_pic_url:
          'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg',
      }
    );
  }, []);
  return { pageArray, error };
};
export default useChannelsData;
