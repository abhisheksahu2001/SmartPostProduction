/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

function ConfirmChannels() {
    const { auth } = useParams();
    const confermModal = useMemo(() => {
        console.log(auth);
    }, [auth]);

    useEffect(() => {
        axios
            .get('/facebook-access/facebook-token/')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    }, []);
    return <div>ConfirmChannels</div>;
}

export default ConfirmChannels;
