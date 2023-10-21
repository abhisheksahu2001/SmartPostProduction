/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { BsFacebook, BsFillExclamationCircleFill } from 'react-icons/bs';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import UseInitFbSDK from '../../fbApi/FbApi';
import 'react-toastify/dist/ReactToastify.css';

function FacebookAuth() {
  const cookie = new Cookies();
  const isFbSDKInitialized = UseInitFbSDK();
  const [fbToken, setToken] = useState('');
  const [fbTokenXp, setfbTokenXp] = useState();
  const [userID, setuserID] = useState(null);
  const [logging, setLogging] = useState<null | boolean>(null);
  const [facebookToggle, setFacebookToggle] = useState(false);
  // const [pagesData, setPagesData] = useState();
  const [ExtendedToken, setExtendedToken] = useState('');

  // const SaveFbToken = async (
  //   temptoken: string,
  //   userid: number,
  //   expirein: number
  // ) => {
  //   try {
  //     const response = await axios.post(
  //       '/facebook-access/facebook-token/',
  //       {
  //         user_access_token: temptoken,
  //         user_access_token_expiry: expirein,
  //         user_id: userid,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //           'X-CSRFToken': cookie.get('csrftoken'),
  //         },
  //       }
  //     );

  //     if (response.data.status === 200) {
  //       setExtendedToken(response.data.ac_ext_token);
  //     }
  //     toast.success('Facebook account connected successfully');
  //     setToken(temptoken);
  //     setfbTokenXp(expirein);
  //     setuserID(userid);
  //     setFacebookToggle(true);
  //   } catch (err) {
  //     toast.error('Something went wrong');
  //     console.log(err);
  //   }
  // };

  // const handleFacebookLogin = async () => {
  //   let temptoken;
  //   let userid;
  //   let expirein;
  //   try {
  //     const loginResponse = await new Promise((resolve) => {
  //       window.FB.getLoginStatus(resolve);
  //     });

  //     switch (loginResponse.status) {
  //       case 'connected':
  //         temptoken = loginResponse?.authResponse.accessToken;
  //         expirein = loginResponse?.authResponse.expiresIn;
  //         break;
  //       case 'unknown':
  //         cookie.remove('fblo_655985629660872');
  //         const loginResponseUnknown = await new Promise((resolve) => {
  //           window.FB.login((res) => resolve(res), {
  //             scope: [
  //               'pages_show_list',
  //               'pages_read_engagement',
  //               'pages_manage_metadata',
  //               'pages_manage_posts',
  //             ],
  //           });
  //         });

  //         if (loginResponseUnknown) {
  //           temptoken = loginResponseUnknown?.authResponse.accessToken;
  //           expirein = loginResponseUnknown?.authResponse.expiresIn;
  //         }
  //         break;
  //       default:
  //         const defaultLoginResponse = await new Promise((resolve) => {
  //           window.FB.login((res) => resolve(res), {
  //             scope: [
  //               'pages_show_list',
  //               'pages_read_engagement',
  //               'pages_manage_metadata',
  //               'pages_manage_posts',
  //             ],
  //           });
  //         });

  //         if (defaultLoginResponse) {
  //           temptoken = defaultLoginResponse?.authResponse.accessToken;
  //           expirein = defaultLoginResponse?.authResponse.expiresIn;
  //         }
  //     }

  //     const meResponse = await new Promise((resolve) => {
  //       window.FB.api('/me', (res) => resolve(res));
  //     });
  //     userid = meResponse.id;

  //     await SaveFbToken(temptoken, userid, expirein);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleFacebookLogin = () => {
    axios
      .get('/facebook-access/facebook-login/')
      .then((res) => {
        const url = res.data;
        console.log(url);

        return url;
      })
      .then((url) => {
        window.location.replace(url);
      })
      .catch((err) => console.log(err));
  };

  // const SavePage = async (pagesData) => {
  //   axios
  //     .post(
  //       '/facebook-access/facebook-token-update/',
  //       { pagesData },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //           'X-CSRFToken': cookie.get('csrftoken'),
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       toast.success('Facebook channels added successfully');
  //     })
  //     .catch(() => {
  //       toast.error('Something went wrong please try again');
  //     });
  // };
  // const handlePageCall = async () => {
  //   try {
  //     if (userID !== null) {
  //       const res = await new Promise((resolve) => {
  //         window.FB.api(
  //           `${userID}/accounts?fields=name,access_token,picture&access_token=${ExtendedToken}`,
  //           resolve
  //         );
  //       });
  //       console.log(res);
  //       const pagesData = res.data;
  //       await SavePage(pagesData);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handdleFacebookLogout = () => {
  //   cookie.remove('fblo_655985629660872');
  //   window.FB.logout((response) => {
  //     console.log(response);
  //   });
  // };

  return (
    <div className="md:p-5 m-2 dark:bg-lightdarkbg border-slate-300 border dark:border-transparent md:w-full  bg-[#e7ebf0] dark:text-white mt-10 lg:min-h-[60%] lg:max-w-[600px] lg:w-1/2 rounded-lg ">
      <section className="overflow-hidden">
        <div
          className={`md:w-full flex  duration-500 ${facebookToggle ? '-translate-x-[100%]' : 'translate-x-0'
            } `}
        >
          <section className="min-w-full   md:w-full md:h-[500px]">
            <h2 className="w-full text-center font-Inter font-semibold pt-10 text-sm  md:text-2xl capitalize ">
              Connect Facebook business/Influencer account
            </h2>
            <li className="flex justify-center items-center flex-col h-[200px] md:h-[300px]  ">
              <button
                // disabled={isFbSDKInitialized}
                className=" flex h-14 justify-center items-center bg-blue-500 hover:bg-blue-600 rounded-md  p-5"
                type="button"
                onClick={() => handleFacebookLogin()}
              >
                <BsFacebook size={30} className="mr-2 text-white  " />
                <h3 className="font-Inter text-sm  md:text-lg ml-2 text-white ">
                  Connect Account
                </h3>
              </button>
              {/* <button type="button" onClick={() => handdleFacebookLogout()}>
                logout
              </button> */}
              <br />
            </li>
          </section>
          <section className="min-w-full   text-black">
            <div className="w-full md:h-[500px] flex justify-center mb-2">
              <li className=" list-none text-white flex justify-center items-center">
                <button
                  type="button"

                  className="p-5 m-5 font-Poppins flex flex-col justify-center items-center bg-darkbglight hover:bg-darkborder  rounded-md "
                >
                  <BsFacebook
                    className="text-blue-500 bg-white rounded-full"
                    size={40}
                  />
                  <h2 className="font-semibold text-lg mt-2 ">Facebook</h2>
                  <h3 className="font-light text-sm ">Pages</h3>
                </button>
                <button
                  disabled
                  type="button"
                  className="p-5 m-5 font-Poppins flex flex-col justify-center items-center bg-darkbglight hover:bg-darkborder   rounded-md "
                >
                  <BsFacebook
                    className="text-blue-500 bg-white rounded-full"
                    size={40}
                  />
                  <h2 className="font-semibold text-lg mt-2 ">Facebook</h2>
                  <h3 className="font-light text-sm ">Group</h3>
                </button>
              </li>
            </div>
            <span className="flex items-center md:text-md mb-2   md:-translate-y-44 -translate-y-2 dark:text-slate-300  ">
              <BsFillExclamationCircleFill size={20} className="mr-2" />
              <b className="text-sm  ">
                Facebook account is required to connect pages and group
              </b>
            </span>
          </section>
        </div>
        <button
          type="button"
          className="p-1    capitalize font-Poppins text-sm flex items-center hover:text-darktext duration-75 font-medium"
          onClick={() => setFacebookToggle((pre) => !pre)}
        >
          <i className="min-w-[20px]">
            <BiChevronLeft
              size={25}
              className={`  ${facebookToggle ? ' block ' : 'hidden'} `}
            />
          </i>
          <p className="min-w-[30px]">
            {facebookToggle ? 'Account' : 'group and pages'}
          </p>
          <i className="min-w-[20px]">
            <BiChevronRight
              size={25}
              className={`  ${facebookToggle ? ' hidden ' : 'block'} `}
            />
          </i>
        </button>
      </section>
    </div>
  );
}

export default FacebookAuth;
