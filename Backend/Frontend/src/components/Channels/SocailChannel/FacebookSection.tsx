/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useChannelsData from '../../../../helpers/useChannelsData';

function FacebookSection() {
    const [channel, setChannel] = useState<string[]>([]);

    const handleFacebookLogin = () => {
        localStorage.setItem('channelReqested', 'facebook');
        axios
            .get('/facebook-access/facebook-login/')
            .then((res) => {
                const url = res.data;

                return url;
            })
            .then((url) => {
                window.location.replace(url);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="p-8">
            <button
                className=" bg-blue-500 dark:bg-blue-600 p-2 rounded-md 
                font-Inter font-[400] dark:text-whitetext-black"
                onClick={() => handleFacebookLogin()}
            >
                Connect Page
            </button>
        </div>
    );
}

export default FacebookSection;
