import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { RiCloseCircleFill } from 'react-icons/ri';
import SuccessAnimation from '../assets/SuccessAnimation.json';
import { PaymentDetails } from '../type.';
import Success from './Payment/Success';
import { Loading } from './Loading';

function Confirm() {
  const cookie = new Cookies();
  const payment = cookie.get('paymentid');
  const [success, setSuccessfully] = useState(false);
  const [paymentDetail, setPaymentDetails] = useState<PaymentDetails>();

  useEffect(() => {
    axios
      .get('https://localhost:8000/payments/subscription-payment/')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchPayment = async () => {
    const response = axios.get(
      'https://localhost:8000/payments/subscription-payment/'
    );
    const { data } = await response;
    const { payment_details: payDetails } = await data;
    const createdAt = payDetails.created_at;

    if (createdAt && !Number.isNaN(Date.parse(createdAt))) {
      const formattedDate = dayjs(createdAt).format('DD-MM-YYYY');
      console.log(formattedDate);
    } else {
      console.log('Invalid or missing createdAt value');
    }
    if (payDetails?.status) {
      setSuccessfully(true);
    }

    setPaymentDetails({
      payId: payDetails.id,
      status: payDetails.status,
      invoiceId: payDetails.invoice_id,
      orderId: payDetails.order_id,
      company: payDetails.notes.address,
      amount: payDetails.amount / 100,
      email: payDetails.email,
      customerId: payDetails.customer_id,
      createdAt,
      method: payDetails.method,
    });
  };

  useEffect(() => {
    fetchPayment();
  }, []);
  const mode = localStorage.getItem('theme') || 'dark';
  useEffect(() => {
    const tag = window.document.getElementsByTagName('html')[0];
    if (tag) tag.classList.add(mode);
    return () => {
      if (tag) {
        tag.classList.remove(mode);
      }
    };
  }, [mode]);

  return (
    <section className="dark:bg-darkbasebg bg-slate-100 w-screen h-screen flex justify-center items-center z-10  ">
      {success !== null && success ? (
        <Success paymentDetail={paymentDetail} />
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default Confirm;
