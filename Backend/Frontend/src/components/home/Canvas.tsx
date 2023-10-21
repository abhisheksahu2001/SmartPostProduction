/* eslint-disable */
import React, { useRef } from 'react';
import './canvas.css';
import { motion } from 'framer-motion';
import { GrFacebook } from 'react-icons/gr';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { cursor } from './cursor';

const igLogo = 'static/instalogo.png';
const fbLogo = 'static/facebooklogo.png';
const linkedinLogo = 'static/linkinlogo.png';
const twitterLogo = 'static/Twitterlogo.png';

function Canvas() {
  const ref = useRef(null);
  const { x, y } = cursor(ref);
  return (
    <div className="gridhome  w-full h-full pl-44 pt-32 absolute ">
      <div className="flex justify-between mt-10 w-10/12">
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            duration: 1,
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-700 mx-10 -mt-10"
        >
          <div className="w-10 h-10 border border-darkbglight rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-300 mx-10 -mt-12"
        >
          <div className="w-20 h-20 bg-[#0c2230] p-1 rounded-md text-center ">
            <GrFacebook size={40} className=" m-4  rounded-md text-gray-600 " />
          </div>
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-500 mx-10 mt-20  "
        >
          <div className="w-14 h-14 bg-[#112438] rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-500 mx-10 mt-5"
        >
          <div className="w-10 h-10 bg-[#0C1D30] rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-300 mx-10 -mt-12"
        >
          <div className="w-20 h-20 bg-[#0f3349] p-1 rounded-md text-center ">
            <GrFacebook size={40} className=" m-4  rounded-md text-gray-400 " />
          </div>
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-700 mx-10 mt-20"
        >
          <div className="w-12 h-12 border border-darkborder rounded-md " />
        </motion.li>
      </div>
      <div className="flex  justify-between mt-10 w-10/12">
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-300 mx-10 -mt-12"
        >
          <div className="w-20 h-20 bg-[#0f3349] p-1 rounded-md text-center ">
            <AiOutlineTwitter
              size={40}
              className=" m-4  rounded-md text-gray-400 "
            />
          </div>
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-500 mx-10 mt-5"
        >
          <div className="w-10 h-10 bg-[#0C1D30] rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-700 mx-10 mt-20"
        >
          <div className="w-12 h-12 border border-darkborder rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-500 mx-10 mt-20 "
        >
          <div className="w-14 h-14 bg-[#112438] rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-500 mx-10 mt-5"
        >
          <div className="w-10 h-10 bg-[#0C1D30] rounded-md " />
        </motion.li>
      </div>
      <div className="flex  justify-between mt-10 w-10/12">
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-700 mx-10 -mt-10"
        >
          <div className="w-10 h-10 border border-darkbglight rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-500 mx-10 mt-20 "
        >
          <div className="w-14 h-14 bg-[#112438] rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-300 mx-10 -mt-12"
        >
          <div className="w-20 h-20 bg-[#0f3349] p-1 rounded-md text-center ">
            <GrFacebook size={40} className=" m-4  rounded-md text-gray-400 " />
          </div>
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            duration: 500,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-500 mx-10 mt-5"
        >
          <div className="w-10 h-10 bg-[#0C1D30] rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-300 mx-10 -mt-12"
        >
          <div className="w-20 h-20 bg-lightdarkbg p-1 rounded-md text-center ">
            <AiFillInstagram
              size={60}
              className=" m-2 rounded-md text-gray-400 "
            />
          </div>
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-700 mx-10 mt-20"
        >
          <div className="w-12 h-12 border border-darkborder rounded-md " />
        </motion.li>
      </div>
      <div className="flex  justify-between mt-10 w-10/12">
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-700 mx-10 -mt-10"
        >
          <div className="w-10 h-10 border border-darkbglight rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-500 mx-10 mt-20 "
        >
          <div className="w-14 h-14 bg-[#112438] rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            duration: 1,
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-700 mx-10 -mt-10"
        >
          <div className="w-10 h-10 border border-darkbglight rounded-md " />
        </motion.li>
        <motion.li
          ref={ref}
          animate={{ x, y }}
          transition={{
            type: 'spring',
            damping: 10,
            duration: 500,
            stiffness: 100,
            restDelta: 0.001,
          }}
          className=" list-none duration-500 mx-10 mt-5"
        >
          <div className="w-10 h-10 bg-[#0C1D30] rounded-md " />
        </motion.li>
      </div>
    </div>
  );
}

export default Canvas;
