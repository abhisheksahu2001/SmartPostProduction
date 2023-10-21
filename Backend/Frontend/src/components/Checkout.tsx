import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { getLoggedUser } from '../features/auth/loginSlice';
import { getUser } from '../features/auth/userSlice';
import usePaymentHook from '../../helpers/usePaymentHook';
import useFetchUser from '../../helpers/useFetchUser';

interface ChildProps {
  closeModal: () => void;
  planDetails: {
    id: string | null;
    name: string | null;
    amount: number | null;
  };
}
interface Plan {
  id: string | null;
  name: string | null;
  amount: number | null;
}
const razorpayIcon = `/static/razorpay-icon.svg`;
function Checkout(props: ChildProps) {
  const { setUserData } = useFetchUser();
  const { makePayment, res } = usePaymentHook();
  const currentUser = useSelector(getUser);
  const [userDataset, setUserDataSet] = useState(false);
  if (!currentUser.email && !userDataset) {
    setUserData();
    setUserDataSet(true);
  }
  const [plan, setPlan] = useState<Plan>();
  const { closeModal, planDetails } = props;
  useEffect(() => {
    setPlan({
      id: planDetails.id,
      name: planDetails.name,
      amount: planDetails.amount,
    });
  }, [planDetails]);

  const handlePayment = () => {
    if (plan != null) {
      makePayment(plan.id, plan.name, plan.amount);
    }
  };
  const handleValidity = () => {
    const currDate = dayjs().format('MMMM-DD-YYYY');
    const endDate = dayjs(dayjs().add(6, 'months')).format('MMMM-DD-YYYY');
    return `${currDate} - ${endDate}`;
  };
  return (
    <div className="flex justify-center backdrop-blur-sm   items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto  min-w-content p-5 dark:text-white  bg-lightdarkbg border border-darkborder   rounded-xl ">
        <button
          type="button"
          onClick={closeModal}
          className=" text-end w-full font-bold  "
        >
          X
        </button>
        <section className=" min-w-[400px] p-2 m-2 ">
          <div className="font-semibold text-2xl border-2 border-transparent  border-b-darkbglight ">
            Checkout
          </div>
          <div className=" my-4  ">
            <li className="flex font-normal  list-none text-md   my-2  text-slate-200">
              <p className="ml-2">{currentUser.email}</p>
            </li>
            <li className="flex list-none text-md  font-medium my-2 text-slate-200 ">
              <p className="ml-2 font-normal ">Validity :</p>
              <p className="ml-2">{handleValidity()}</p>
            </li>
            <li className="flex font-normal  list-none text-md   my-2  text-slate-200">
              <p className="ml-2 font-normal ">Total :</p>
              <p className="ml-2 font-bold "> &#x20b9;{plan?.amount}</p>
            </li>
          </div>
          <span className="flex flex-col items-center p-2 justify-between ">
            <button
              type="button"
              onClick={() => handlePayment()}
              className="bg-blue-600 p-2 rounded-md hover:bg-blue-500 w-full font-medium "
            >
              Proceed to Payment
            </button>
            <span className="flex items-center justify-between w-full mt-6 px-1 ">
              <p className="text-slate-400 text-xs ">
                Supported Payment method
              </p>
              <img
                src={razorpayIcon}
                alt="payment mathod icon "
                className="w-24 bg-white rounded-sm p-2 "
              />
            </span>
          </span>
        </section>
      </div>
    </div>
  );
}

export default Checkout;
