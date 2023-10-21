/* eslint-disable */

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import { getUser } from '../src/features/auth/userSlice';

const usePaymentHook = () => {
  const url = import.meta.env.VITE_URL
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const cookie = new Cookies();
  const [res, setRes] = useState<number>();
  const [createSubRes, setCreateSubRes] = useState({});
  const [flag, setFlag] = useState<boolean>(false);
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  let plangoldid = '';
  let subid = '';
  const makeCheckout = () => {
    axios
      .get(url+'payments/subscription-checkout/')
      .then((res) => {
        console.log(res);
        setCreateSubRes(res);
        subid = res.data.res.subscription_id;
        completePayment(subid, plangoldid);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);
  const makePayment = async (planid: string | null, name: string | null, amount: number |null) => {
      if(planid != null && name != null && amount!= null){
    try {

        console.log(planid);
      plangoldid = planid;
      const res = await axios.post(
        url+'payments/subscription/',
        { plan_id: planid, plan_name: name, plan_amount: amount },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Credential:'include'
          },
        }
        );
        setRes(res.status);
        setFlag(true);
        makeCheckout();
      }catch (err) {
      console.log(err);
    }
    } 
  };
  const handleConfirm = () => {
    axios
      .get(url+'payments/callback/')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const completePayment = (subid: string, planid: string) => {
    const option = {
      key: 'rzp_test_OMNJqo2GQFsI00', // Enter the Key ID generated from the Dashboard
      // "amount": "{{amount}}", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      // "name": "Smartpost Corp", //your business name
      description: 'Test Transaction',
      image:
        'https://as2.ftcdn.net/v2/jpg/03/69/86/45/1000_F_369864552_MFRZfXoPeaNVTJCOJEOp3ioIl7s2SFof.jpg',
      callback_url: 'https://localhost:8000/payments/raz_callback/',
      prefill: {
        name: user.name, // your customer's name
        email: user.email, // your customer's email
        contact: user.phone,
      },
      name: planid,
      subscription_id: subid,
      notes: {
        address: 'Smartpost Corporate Office',
      },
      theme: {
        color: '#0B2447',
      },
    };
    const rzp1 = new (window as any).Razorpay(option);
    rzp1.open();
  };

  return { makePayment, res };
};

export default usePaymentHook;
