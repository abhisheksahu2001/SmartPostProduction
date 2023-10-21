import React, { useEffect, useState } from 'react';
import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import useCheckAuth from '../helpers/useCheckAuth';
import useFreeTrail from '../helpers/useFreeTrail';
import Navbar from './components/Navbar';
import Checkout from './components/Checkout';

interface Plan {
  id: string | null;
  amount: number | null;
  name: string | null;
}
function Plans() {
  const navigate = useNavigate();
  const { startFreeTrail } = useFreeTrail();

  const cookie = new Cookies();

  const [goldPlans, setGoldPlans] = useState<Plan>({
    id: '',
    name: '',
    amount: null,
  });

  const handleBuy = (
    name: Plan['name'],
    amount: Plan['amount'],
    id: Plan['id']
  ) => {
    console.log(name, id);
    const data = {
      contact_number: 6263125356,
      plan_id: id,
      plan_amount: amount,
      plan_name: name,
    };
    // try {
    //   axios.post("https://localhost:8000/payments/subscription/",data,{
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //       'X-CSRFToken': cookie.get('csrftoken'),
    //     },
    //   }).then((res)=>{navigate("./Checkout")})
    // }
    // catch{

    // }
  };
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const url = 'https://localhost:8000/payments/subscription/';
    axios
      .get(url)
      .then((res) => {
        const plan = res.data.res[0];
        setGoldPlans({
          id: plan.id,
          amount: plan.item.amount / 100,
          name: plan.item.name,
        });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [disableFreeTailButon, setDisableFreeTrailButton] = useState(false);
  const HandleFreeTrail = async () => {
    setDisableFreeTrailButton(true);

    startFreeTrail()
      .then((res) => {
        const response = res.data;
        console.log(response);
        if (response.status === 200)
          return toast.success(response.message, { autoClose: 1500 });
        if (response.status === 208)
          return toast.success(response.message, { autoClose: 1500 });
        return toast.error(response.message);
      })
      .then(() => {
        setDisableFreeTrailButton(false);
      });
  };

  return (
    <>
      <Navbar position="absolute" move={false} />
      <section className="p-5 flex justify-center flex-col md:w-full  ">
        <div className=" my-28  md:mx-24 text-center xl:mx-48 ">
          <h5 className=" font-Inter  font-semibold text-blue-600 ">Pricing</h5>
          <h1 className="font-Inter font-extrabold text-black  text-2xl md:text-4xl 2xl:text-6xl  my-2 dark:text-white">
            Simple, transparent pricing
          </h1>
          <p className="font-Inter font-medium text-gray-600 dark:text-slate-400 ">
            We believe Smartpost should be accessible to all.
          </p>
        </div>
        <span className="flex xl:flex-row flex-col xl:w-full items-center  justify-center  [&>div]:max-w-[400px] [&>div]:min-w-[350px]  xl:[&>div]:w-[400px] [&>div]:w-1/2 md:[&>div]:min-w-[300px] xl:[&>div]:min-w-[400px] md:[&>div>span>ul]:ml-2 xl:[&>div>span>ul]:ml-0">
          <div className="  border-[1px] dark:border-darkbglight  rounded-3xl text-start  dark:border-border  p-5 md:p-10  md:ml-10">
            <h3 className="text-lg   font-Inter font-semibold my-2 ">Basic</h3>
            <span className="flex items-baseline ">
              <h1 className=" text-2xl md:text-3xl  font-Inter font-semibold my-2">
                &#x20b9; 0
              </h1>
              <h4 className=" ml-1 text-lg font-normal">/week</h4>
            </span>
            <div className="flex justify-center  items-center my-5 ">
              <button
                type="button"
                onClick={() => HandleFreeTrail()}
                disabled={disableFreeTailButon}
                className={`w-3/4 ${disableFreeTailButon ? ' bg-slate-500' : ''
                  } w-full  bg-blue-600  bg-border hover:bg-blue-500 
                  delay-100 duration-150 text-white p-2 rounded-md text-center font-bold text-lg px-5 `}
              >
                Join Now
              </button>
            </div>

            <span>
              <h4 className="font-medium  ">
                Access to One <b className="text-blue-600">Channels</b>{' '}
              </h4>
              <ul className="my-2">
                <li className="font-Inter font-medium flex items-center">
                  <BsFillCheckCircleFill className="mx-2 text-green-500" />
                  <text>Facebook</text>
                </li>
                <li className="font-Inter font-medium flex items-center text-gray-400">
                  <BsXCircleFill className="mx-2 " />
                  <text>Instagram</text>
                </li>
                <li className="font-Inter font-medium flex items-center text-gray-400">
                  <BsXCircleFill className="mx-2 " />
                  <text>Twitter</text>
                </li>
                <li className="font-Inter font-medium flex items-center text-gray-400">
                  <BsXCircleFill className="mx-2 " />
                  <text>LinkedIn</text>
                </li>
              </ul>
              <span className="flex my-2">
                <h2 className="font-semibold text-md ">Facebook Post :</h2>
                <h2 className="font-normal text-md ml-2">10</h2>
              </span>
              <span className="flex my-2">
                <h2 className="font-semibold text-md ">
                  Facebook Schedule Post :
                </h2>
                <h2 className="font-normal text-md ml-2">5</h2>
              </span>
            </span>
          </div>
          <div className=" relative text-white  border-[1px] dark:border-darkborder xl:-translate-y-4 my-8  bg-darkbglight  rounded-3xl text-start    p-5 md:p-10  md:ml-10">
            <span className="absolute right-4 top-4 bg-blue-600 font-semibold text-xs  rounded-full px-3 py-1   ">
              Most popular
            </span>
            <h3 className="text-lg  font-Inter font-semibold my-2 2xl:text-2xl ">
              Silver
            </h3>
            <span className="flex items-baseline ">
              <h1 className=" text-2xl md:text-3xl  font-Inter font-semibold my-2">
                &#x20b9; 500
              </h1>
              <h4 className=" ml-1 text-lg font-normal">/6 month</h4>
            </span>
            <h2 className="font-semibold text-xs text-red-600 bg-red-300 w-fit p-1 rounded-xl px-2 ">
              Plan is valid till limit is not crossed
            </h2>
            <div className="flex justify-center  items-center my-5 ">
              <button
                type="button"
                onClick={() => HandleFreeTrail()}
                disabled={disableFreeTailButon}
                className={`w-3/4 ${disableFreeTailButon ? ' bg-slate-500' : ''
                  } w-full  bg-blue-600  bg-border hover:bg-blue-500  
                  delay-100 duration-150 text-white p-2 rounded-md text-center font-bold text-lg px-5 `}
              >
                Get started
              </button>
            </div>
            <span>
              <h4 className="font-medium  ">
                Access to Two <b className="text-blue-600">Channels</b>{' '}
              </h4>
              <ul className="my-2">
                <li className="font-Inter font-medium flex items-center">
                  <BsFillCheckCircleFill className="mx-2 text-green-400" />
                  <text>Facebook</text>
                </li>
                <li className="font-Inter font-medium flex items-center">
                  <BsFillCheckCircleFill className="mx-2 text-green-400" />
                  <text>Instagram</text>
                </li>
                <li className="font-Inter font-medium flex items-center text-gray-400">
                  <BsXCircleFill className="mx-2 " />
                  <text>Twitter</text>
                </li>
                <li className="font-Inter font-medium flex items-center text-gray-400">
                  <BsXCircleFill className="mx-2 " />
                  <text>LinkedIn</text>
                </li>
              </ul>
              <span className="flex my-2">
                <h2 className="font-semibold text-md ">Facebook Post :</h2>
                <h2 className="font-normal text-md ml-2">200</h2>
              </span>
              <span className="flex my-2">
                <h2 className="font-semibold text-md ">
                  Facebook Schedule Post :
                </h2>
                <h2 className="font-normal text-md ml-2">100</h2>
              </span>
            </span>
          </div>
          <div className="  border-[1px] dark:border-darkbglight  rounded-3xl text-start  dark:border-border  p-5 md:p-10  md:ml-10">
            <h3 className="text-lg  font-Inter font-semibold 2xl:text-2xl my-2  ">
              Gold
            </h3>
            <span className="flex items-baseline ">
              <h1 className=" text-2xl md:text-3xl  font-Inter font-semibold my-2">
                &#x20b9;{goldPlans.amount}
              </h1>
              <h4 className=" ml-1 text-lg font-normal">/6 month</h4>
            </span>
            <h2 className="font-semibold text-xs text-red-600 bg-red-300 w-fit p-1 rounded-xl px-2 ">
              Plan is valid till limit is not crossed
            </h2>
            <div className="flex justify-center  items-center my-5 ">
              <button
                type="button"
                onClick={openModal}
                disabled={disableFreeTailButon}
                className={`w-3/4 ${disableFreeTailButon ? ' bg-slate-500' : ''
                  } w-full  bg-blue-600  bg-border hover:bg-blue-500 
                  delay-100 duration-150 text-white p-2 rounded-md text-center font-bold text-lg px-5 `}
              >
                Get started
              </button>
            </div>
            <span>
              <h4 className="font-medium  ">
                Access to All <b className="text-blue-600">Channels</b>{' '}
              </h4>
              <ul className="my-2">
                <li className="font-Inter font-medium flex items-center">
                  <BsFillCheckCircleFill className="mx-2 text-green-400" />
                  <text>Facebook</text>
                </li>
                <li className="font-Inter font-medium flex items-center">
                  <BsFillCheckCircleFill className="mx-2 text-green-400" />
                  <text>Instagram</text>
                </li>
                <li className="font-Inter font-medium flex items-center ">
                  <BsFillCheckCircleFill className="mx-2 text-green-400" />
                  <text>Twitter</text>
                </li>
                <li className="font-Inter font-medium flex items-center">
                  <BsFillCheckCircleFill className="mx-2 text-green-400" />
                  <text>LinkedIn</text>
                </li>
              </ul>
              <span className="flex my-2">
                <h2 className="font-semibold text-md ">Facebook Post :</h2>
                <h2 className="font-normal text-md ml-2">400</h2>
              </span>
              <span className="flex my-2">
                <h2 className="font-semibold text-md ">
                  Facebook Schedule Post :
                </h2>
                <h2 className="font-normal text-md ml-2">200</h2>
              </span>
            </span>
          </div>
        </span>
        {showModal && (
          <Checkout closeModal={closeModal} planDetails={goldPlans} />
        )}
      </section>
    </>
  );
}

export default Plans;
