/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Loading } from '../Loading';

function InvoiceDetails() {
    const cookie = new Cookies();
    const { id } = useParams();
    const navigate = useNavigate();
    const [url, setUrl] = useState<string | null>();
    useEffect(() => {
        axios
            .post(
                `https://localhost:8000/payments/subscription-payment/`,
                { data: id },
                {
                    headers: {
                        'X-CSRFToken': cookie.get('csrftoken'),
                    },
                }
            )
            .then((res) => {
                setUrl(res.data.url);
            })
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
            setTimeout(() => {
                navigate(-1);
            }, 1500);
        }
    }, [url]);

    return url ? null : <Loading />;
}

export default InvoiceDetails;
