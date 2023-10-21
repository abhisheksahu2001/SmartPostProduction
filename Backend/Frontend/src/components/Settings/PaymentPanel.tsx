import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface PaymentPanelProps {
  HideModel: React.Dispatch<React.SetStateAction<boolean>>;
}
interface PaymentHistoryItem {
  raz_invoice_id: string;
  raz_plan_type: string;
  raz_plan_start: string;
  raz_payment_id: string;
  // Add other properties if available
}
function PaymentPanel({ HideModel }: PaymentPanelProps) {
  const [payHistory, setPayHistory] = useState<PaymentHistoryItem[]>();
  useEffect(() => {
    axios
      .get('https://localhost:8000/payments/subscription-payment-history')
      .then((res) => {
        setPayHistory(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className=" w-full isolate  py-5 px-2 rounded-2xl dark:text-slate-300   ">
      <div className="flex w-full items-center justify-between px-5 ">
        <h1 className="font-semibold text-xl   ">Subscription History</h1>
        <button type="button" onClick={() => HideModel(false)}>
          <AiFillCloseCircle
            size={25}
            className="font-bold hover:text-slate-500  duration-100  "
          />
        </button>
      </div>
      <div className=" rounded-2xl   border border-slate-200   dark:border-darkborder     my-10 ml-5  w-[95%]   ">
        <div className="relative overflow-x-auto rounded-2xl ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-slate-300/50 dark:bg-darkbglight  dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3">
                  Plan
                </th>
                <th scope="col" className="px-3 py-3">
                  Subscribed On
                </th>
                <th scope="col" className="px-3 py-3">
                  Payment Id
                </th>
                <th scope="col" className="px-3 py-3">
                  Invoice Id
                </th>
              </tr>
            </thead>
            <tbody>
              {payHistory &&
                payHistory.map((item) => (
                  <tr
                    key={item.raz_invoice_id}
                    className="bg-white text-xs   even:dark:bg-darkborder odd:dark:text-slate-300 odd:dark:bg-darkbasebg
                      odd:bg-slate-200/50 odd:text-slate-500 even:bg-gray-100/90
                    "
                  >
                    <th
                      scope="row"
                      className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.raz_plan_type}
                    </th>
                    <td className="px-3 py-4">{item.raz_plan_start}</td>
                    <td className="px-3 py-4"> {item.raz_payment_id}</td>
                    <td className="px-3 py-4">
                      <Link
                        to={`/Setting/${item.raz_invoice_id}`}
                        className=" text-blue-400 hover:text-blue-500 "
                      >
                        {item.raz_invoice_id}
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PaymentPanel;
