import React, { useContext, useRef } from 'react';
import { TbExternalLink } from 'react-icons/tb';
import { easeIn, motion, useScroll, useTransform } from 'framer-motion';
import './home/canvas.css';
import Step from './home/Step';
import Footer from './home/Footer';
import GlobalContext from '../context/GlobalContext';
import Canvas from './home/Canvas';

const socialpost = 'static/socialpost.png';
const bgvideo = 'static/asset.mp4';
const igLogo = 'static/instalogo.png';
const fbLogo = 'static/facebooklogo.png';
const linkedinLogo = 'static/linkinlogo.png';
const twitterLogo = 'static/Twitterlogo.png';
function Hero() {
  const { theme } = useContext(GlobalContext);

  const { scrollYProgress: parallexEffect } = useScroll();
  const y = useTransform(parallexEffect, [0, 1], ['0%', '50%']);

  const targetRefTwo = useRef<HTMLDivElement>(null);
  const targetRefThree = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: forTargetRefFour } = useScroll({
    target: heroRef,
    offset: ['end start', 'start end'],
  });
  const fbvilocity = useTransform(forTargetRefFour, [0.4, 0.1], [0, 10]);
  const fbLogoX = useTransform(forTargetRefFour, [0.4, 0.1], [0, 0]);

  return (
    <section
      className="bg-white  dark: rounded-b-3xl w-screen "
      ref={targetRefThree}
    >
      {theme === 'dark' ? (
        <motion.section
          style={{ y }}
          className="bgimage dark:bg-darkbasebg  z-0 relative h-screen bg-no-repeat scroll-smooth "
        >
          <div className="">
            <Canvas />
            <div className="flex   justify-center items-center w-full h-full absolute gradient ">
              <div className="flex flex-col w-1/2 text-center justify-center items-center  ">
                <h1 className=" font-Inter font-semibold text-[4rem] textgradient leading-[80px] ">
                  The modern way to publish content on social handles
                </h1>
                <h3 className="text-slate-100 font-semibold font-poppins text-xl mt-8  w-[75%] ">
                  Smartpost is a leading content marketing platform that make
                  sure your brand gets the attention it deservers
                </h3>
                <button
                  className="  hover:w-48 duration-500 hover:border 
                 hover:bg-lightdarkbg hover:text-slate-100  border border-transparent hover:border-darkborder bg-[#7fb0d9]
               text-darkbasebg font-poppins text-xl font-semibold w-40 mb-10 p-3 rounded-md mt-8 text-center "
                  type="button"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      ) : (
        <motion.section
          style={{ y }}
          className=" dark:bg-darkbasebg  z-0 relative h-screen bg-no-repeat scroll-smooth "
        >
          <div className="flex justify-center items-center pt-20 ">
            <span
              ref={heroRef}
              className=" max-w-[50%] min-h-fit flex flex-col shadow-lg justify-start items-start text-start mt-40 ml-36 leading-10   bg-slate-100 p-10 rounded-3xl"
            >
              <h1 className=" font-Inter font-semibold text-[5rem] text-black leading-[80px] ">
                The modern way to publish content on social handles
              </h1>
              <h3 className="text-slate-700 font-semibold font-poppins text-xl mt-8  w-[75%] ">
                Smartpost is a leading content marketing platform that make sure
                your brand gets the attention it deservers
              </h3>
              <button
                className=" shadow-[0_0_21px_6px_rgba(87,84,83,0.26)] hover:w-48 duration-500 hover:border hover:border-slate-900 
              hover:bg-slate-100 hover:text-slate-900  border border-transparent bg-slate-900 
              text-slate-100 font-poppins text-xl font-semibold w-40 mb-10 p-3 rounded-md mt-8 text-center "
                type="button"
              >
                Get Started
              </button>
            </span>
            <ul>
              <li>
                <motion.img
                  style={{ x: fbLogoX, y: fbvilocity }}
                  transition={{ delay: 1, ease: easeIn }}
                  alt=""
                  src={fbLogo}
                  className="w-47 absolute top-[65%] left-[54%] z-10 shadow-lg rounded-lg"
                />
              </li>
              <li>
                <motion.img
                  style={{ x: fbLogoX, y: fbvilocity }}
                  alt=""
                  src={linkedinLogo}
                  className="w-47 absolute top-[75%] left-40 shadow-lg rounded-lg"
                />
              </li>
              <li>
                <motion.img
                  style={{ x: fbLogoX, y: fbvilocity }}
                  alt=""
                  src={twitterLogo}
                  className="w-47 absolute top-[25%] left-[54%]   shadow-lg rounded-lg"
                />
              </li>
              <li>
                <motion.img
                  style={{ x: fbLogoX, y: fbvilocity }}
                  alt=""
                  src={igLogo}
                  className="w-47 absolute top-1/4 left-32 shadow-lg rounded-lg"
                />
              </li>
            </ul>
            <video
              loop
              muted
              autoPlay
              src={bgvideo}
              className="w-[45%] h-[500px] dark:hidden flex justify-center items-center translate-y-32"
            />
          </div>
        </motion.section>
      )}
      <section className="bg-slate-900 rounded-t-[2.5rem] p-10 z-10 absolute ">
        <motion.section
          // ref={targetRef}
          // style={{ x, y: z, scale: y, position }}
          // transition={{
          //   ease: [0.5, 0.6, 0.7, 0.8],
          // }}
          className=" dark:bg-darkbglight   bg-slate-200 rounded-[2.5rem]
        w-full shadow-sm border border-black p-10 "
        >
          <h1 className="w-2/3 my-20 ml-72 flex text-center justify-center items-center font-poppins font-medium text-6xl text-slate-900 leading-[80px]">
            Lorem ipsum dolor sit amet consectetur
            <br /> adipisicing elit. Temporibus,
            <br /> nisi iusto! Natus
          </h1>
          <div className="flex flex-row-reverse justify-center m-10 p-10">
            <motion.img
              // style={{ opacity }}
              // transition={{ damping: 1 }}
              src={socialpost}
              alt="social media post"
              className="mt-20 w-[650px] mr-30 "
            />
            <div className="w-full ml-40">
              <div className=" mt-20  ">
                <h1 className="relative font-Inter ml-20 left-14  font-medium text-6xl">
                  You don’t need a marketings team
                </h1>
                <h2 className="relative mt-10 ml-20 mr-44  left-14 text-gray-500 font-normal font-Poppins text-[1.6rem] ">
                  Use smartpost to publish your content on different social
                  media platform with a single click
                </h2>
                <button
                  type="button"
                  className=" relative flex items-center font-bold mt-10 ml-20 left-14 group text-xl  "
                >
                  <h1 className="group-hover:underline group-hover:text-slate-600">
                    Start using Smartpost
                  </h1>
                  <TbExternalLink className="mx-2 group-hover:underline group-hover:text-slate-600 " />
                </button>
              </div>
            </div>
          </div>
          <div className="flex  justify-center m-10 p-10">
            <motion.img
              // style={{ opacity }}
              // transition={{ damping: 1 }}
              src={socialpost}
              alt="social media post"
              className="mt-20 w-[650px] ml-52 "
            />
            <div className="w-full mr-40">
              <div className=" mt-20  ">
                <h1 className="relative font-Inter ml-20 left-14  font-medium text-6xl">
                  You don’t need a marketings team
                </h1>
                <h2 className="relative mt-10 ml-20  left-14 text-gray-500 font-normal font-Poppins text-[1.6rem] ">
                  Use smartpost to publish your content on different social
                  media platform with a single click
                </h2>
                <button
                  type="button"
                  className=" relative flex items-center font-bold mt-10 ml-20 left-14 group text-xl  "
                >
                  <h1 className="group-hover:underline group-hover:text-slate-600">
                    Start using Smartpost
                  </h1>
                  <TbExternalLink className="mx-2 group-hover:underline group-hover:text-slate-600 " />
                </button>
              </div>
            </div>
          </div>
        </motion.section>
        <Step effect={parallexEffect} />
        <Footer effect={parallexEffect} />
      </section>
    </section>
  );
}

export default Hero;
