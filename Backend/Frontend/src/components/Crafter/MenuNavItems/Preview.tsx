/* eslint-disable */
import React, { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { BiShare } from 'react-icons/bi';
import { TfiComment } from 'react-icons/tfi';
import { SlScreenSmartphone, SlScreenDesktop } from 'react-icons/sl';

interface EditorMenuProps {
  caption: string;
  URlImage: {
    row: File;
    url: string;
  } | null;
}

function Preview({ caption, URlImage }: EditorMenuProps) {
  const [screenType, setScreenType] = useState('pc');

  return (
    <div className="flex flex-col w-full   relative m-1 z-10  text-black      ">
      <div className="flex p-1 my-5  rounded-md justify-between items-center w-20 border dark:bg-lightdarkbg dark:border-darkborder dark:text-slate-200 bg-slate-200/50   ">
        <button
          type="button"
          onClick={(e) => setScreenType('pc')}
          className={` duration-200 w-full flex-1 h-8 text-center  rounded-md ${screenType === 'pc'
            ? '  bg-white text-blue-700 dark:text-slate-100 dark:bg-darkbglight shadow-sm    '
            : ''
            }`}
        >
          <SlScreenDesktop size={18} className="text-center w-full " />
        </button>
        <button
          type="button"
          onClick={(e) => {
            setScreenType('mobile');
          }}
          className={` duration-200  w-full h-8 flex-1 rounded-md ${screenType === 'mobile'
            ? ' bg-white text-blue-700  dark:text-slate-100 dark:bg-darkbglight shadow-sm   '
            : ''
            }`}
        >
          <SlScreenSmartphone size={18} className="w-full text-center" />
        </button>
      </div>
      <section className="  w-full dark:bg-lightdarkbg shadow-lg  rounded-xl  p-3 bg-white  ">
        <h1 className="font-Inter font-semibold capitalize ">Post Preview</h1>

        <section>
          <div className="mt-1 md:mt-3 lg:mt-5">
            <label
              htmlFor="platform"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select an Social Media
            </label>
            <select
              id="platform"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Choose</option>
              <option value="US">Facebook</option>
              <option value="CA">Instagram</option>
              <option value="FR">Twitter</option>
              <option value="DE">LinkedIn</option>
            </select>
          </div>

          <section className="flex flex-col border border-grey-100 mt-10 overflow-y-scroll max-h-[380px]  ">
            <div className="m-1 p-2 flex items-center">
              <img
                // src={`${channel.url}`}
                className="rounded-full w-10 h-10"
                alt=""
              />
              <span className="flex flex-col ml-2">
                <h1 className="font-semibold font-Poppins">
                  {/* {channel.name} */}
                </h1>
                <h2 className="">Now</h2>
              </span>
            </div>
            <div className="m-1 py-1 px-2  text-lg w-fit  ">
              <p className="max-w-full font-Poppins text-[1rem] ">{caption}</p>
            </div>
            <div className="m-1 p-1">
              {URlImage !== null ? (
                <img src={`${URlImage.url}`} alt="postImage" />
              ) : null}
            </div>
            <div className="m-1 p-1">
              <li className="flex justify-between w-[90%] mx-4 ">
                <span className="flex items-center">
                  <AiOutlineLike
                    size={20}
                    className="text-gray-500 font-normal "
                  />
                  <p className="ml-1">Like</p>
                </span>
                <span className="flex items-center">
                  <TfiComment
                    size={20}
                    className="text-gray-500 font-normal "
                  />
                  <p className="ml-1">Comment</p>
                </span>
                <span className="flex items-center">
                  <BiShare size={20} className="text-gray-500 font-normal " />
                  <p className="ml-1">Share</p>
                </span>
              </li>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}

export default Preview;
