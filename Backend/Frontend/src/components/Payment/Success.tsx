/* eslint-disable */ import { Player } from '@lottiefiles/react-lottie-player';
import React, { useState } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { PaymentDetails } from '../../type.';

// eslint-disable-next-line react/function-component-definition

interface SuccessProps {
    paymentDetail: PaymentDetails | undefined;
}

const Success = ({ paymentDetail }: SuccessProps) => {
    const [showPayInfo, setShowPayInfo] = useState(false);
    setTimeout(() => {
        setShowPayInfo(true);
    }, 3000);
    const [style, setStyle] = useState({
        width: '800px',
        height: '800px',
    });

    return (
        <>
            {showPayInfo ? (
                <div className="flex flex-col items-center justify-between  w-full xl:w-1/2  ">
                    <div className="bg-gradient  border dark:border-slate-700   w-1/2 p-5 rounded-3xl  ">
                        <span className="w-full   font-bold  justify-between  ">
                            <BsFillCheckCircleFill
                                className=" shadow-SuccessShadow   absolute -translate-y-24  translate-x-44  w-20 h-20 bg-white  rounded-full  text-green-400    "
                                size={60}
                            />
                            <h1 className="text-xl text-center my-10 w-full font-Inter  ">
                                Payment Successful !
                            </h1>
                            <h1 className="text-lg font-normal mt-5">
                                {paymentDetail?.email}
                            </h1>
                            <h1 className="text-lg font-normal mt-5">
                                Payment Id : {paymentDetail?.payId}{' '}
                            </h1>
                        </span>
                        <div className="flex flex-col [&>span>h2]:text-slate-400 [&>span>h3]:text-gray-100   ">
                            <span className="flex mt-10 mb-5   ">
                                <h2 className="flex-1">Payment Method</h2>
                                <h3 className="flex-1 capitalize ">{paymentDetail?.method}</h3>
                            </span>
                            <span className="flex  mb-5 ">
                                <h2 className="flex-1">Customer Id</h2>
                                <h3 className="flex-1">{paymentDetail?.customerId}</h3>
                            </span>
                            <span className="flex  mb-5">
                                <h2 className="flex-1">Total Fee</h2>
                                <h3 className="flex-1"> &#x20b9; {paymentDetail?.amount}</h3>
                            </span>
                            <span className="flex  mb-5">
                                <h2 className="flex-1">Order Id</h2>
                                <h3 className="flex-1">{paymentDetail?.orderId}</h3>
                            </span>
                            <span className="flex  my-10">
                                <h2 className="flex-1">Invoice Id</h2>
                                <h3 className="flex-1">{paymentDetail?.invoiceId}</h3>
                            </span>
                        </div>
                        <Link to="/Setting">
                            <button type="button" className="">
                                Get Invoice
                            </button>{' '}
                        </Link>
                    </div>
                </div>
            ) : (
                <Player
                    keepLastFrame
                    src="https://lottie.host/7fe87f39-bc79-495a-86df-0a588db188bf/ioU3V7TQXu.json"
                    autoplay
                    style={{ ...style }}
                />
            )}
        </>
    );
};

export default Success;

//

//
//

// {
//     showPayInfo ? (
//         ) : (

//     )
// }
