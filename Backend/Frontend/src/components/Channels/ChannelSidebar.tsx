/* eslint-disable */
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

interface ChannelSideBarProps {
  chooseChannel: React.Dispatch<React.SetStateAction<string>>,
  currentChannel: string;
}

function ChannelSidebar({ chooseChannel, currentChannel }: ChannelSideBarProps) {
  const handleSelectChannel = (e: any) => {
    chooseChannel(e.target.value);
  };

  return (
    <section className="md:p-5  md:mt-10">
      <div className="flex md:flex-col justify-between mx-2 text-darkbasebg dark:text-white">
        <button
          type="button"
          className={`flex items-center   mt-8 p-2 md:m-5 md:p-7 min-w-max duration-300  hover:bg-slate-200 dark:hover:bg-lightdarkbg border border-transparent  rounded-md [&>*]:pointer-events-none ${currentChannel === 'facebook'
            ? 'dark:bg-darkbglight dark:border-bluebg bg-white border-slate-300'
            : ''
            } `}
          onClick={(e: any) => handleSelectChannel(e)}
          value="facebook"
        >
          <i>
            <FaFacebook
              className=" dark:bg-white rounded-md p-2 text-bluebg mx-5"
              size={55}
            />
          </i>
          <span className="md:block hidden">
            <h1 className="font-Inter font-semibold text-2xl text-start">
              Facebook
            </h1>
            <p className="dark:text-darktext font-semibold font-Poppins">
              Group and Page
            </p>
          </span>
        </button>
        <button
          type="button"
          className={`flex items-center mt-8 p-2  md:mx-5  md:p-7 min-w-max duration-300 hover:bg-slate-200 dark:hover:bg-lightdarkbg border border-transparent  rounded-md [&>*]:pointer-events-none ${currentChannel === 'instagram'
            ? 'dark:bg-darkbglight dark:border-bluebg  bg-white border-slate-300'
            : ''
            } `}
          onClick={(e: any) => handleSelectChannel(e)}
          value="instagram"
        >
          <i defaultValue="instagram">
            <FaInstagram
              className=" dark:bg-white rounded-md p-2 text-rose-500 mx-5"
              size={55}
            />
          </i>
          <span defaultValue="instagram" className="md:block hidden">
            <h1 className="font-Inter font-semibold text-2xl text-start">
              Instagram
            </h1>
            <p className="dark:text-darktext font-semibold font-Poppins min-w-fit text-start">
              Business or Creator Accounts
            </p>
          </span>
        </button>
        <button
          type="button"
          value="twitter"
          className={`flex items-center mt-8 p-2  md:m-5  md:p-7 duration-300 min-w-max hover:bg-slate-200 dark:hover:bg-lightdarkbg border border-transparent  rounded-md [&>*]:pointer-events-none ${currentChannel === 'twitter'
            ? 'dark:bg-darkbglight dark:border-bluebg bg-white border-slate-300'
            : ''
            } `}
          onClick={(e: any) => handleSelectChannel(e)}
        >
          <i>
            <FaTwitter
              className=" dark:bg-white rounded-md p-2 text-[#1da1f2] mx-5"
              size={55}
            />
          </i>
          <span className="md:block hidden">
            <h1 className="font-Inter font-semibold text-2xl text-start">
              Twitter
            </h1>
            <p className="dark:text-darktext font-semibold font-Poppins text-start">
              Profile
            </p>
          </span>
        </button>
        <button
          type="button"
          className={`flex items-center mt-8 p-2  md:mx-5  md:p-7 duration-300 min-w-max hover:bg-slate-200 dark:hover:bg-lightdarkbg border border-transparent  rounded-md [&>*]:pointer-events-none ${currentChannel === 'linkedin'
            ? 'dark:bg-darkbglight dark:border-bluebg bg-white border-slate-300'
            : ''
            } `}
          value="linkedin"
          onClick={(e: any) => handleSelectChannel(e)}
        >
          <i>
            <FaLinkedin
              className=" dark:bg-white rounded-md p-2 text-[#2867b2] mx-5"
              size={55}
            />
          </i>
          <span className="md:block hidden">
            <h1 className="font-Inter font-semibold text-2xl text-start">
              LinkedIn
            </h1>
            <p className=" dark:text-darktext font-semibold font-Poppins">
              Page or Profile
            </p>
          </span>
        </button>
      </div>
    </section>
  );
}

export default ChannelSidebar;
