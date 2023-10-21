/* eslint-disable */
import React, { useRef } from 'react';
import { motion, useTransform, easeInOut, MotionValue } from 'framer-motion';
import { stylesWithCssVar } from '../../utils/motion';

const schedular = './static/schedular.png';

interface StepProps {
  effect: MotionValue<number>;
}

function Step({ effect }: StepProps) {
  const targetRefTwo = useRef<HTMLDivElement>(null);

  const scrollVal = useTransform(effect, [0.55, 0.65, 0.75], [0, 1, 2]);
  const Yscroll = useTransform(scrollVal, (val: any) => {
    const v = parseInt(val);
    return Math.round(v);
  });

  return (
    <motion.section
      className="top-[10rem] my-40  h-[150vh]   sticky "
      transition={easeInOut}
    >
      <motion.div
        ref={targetRefTwo}
        style={stylesWithCssVar({
          '--x': Yscroll,
        })}
        className="top-0 rounded-3xl flex justify-center items-center mt-20 ml-36   min-w-[600px] max-w-[1500px] p-20 "
      >
        <div className="flex  text-white border-l-4 border-r-0 border-y-0 border-[#212f42] before:duration-700 before:scrollprogress before:absolute before:left-[19.3%] before:w-1 before:bg-darktext rounded-sm  pl-20 overflow-hidden max-h-[500px] ease-in ">
          <motion.div
            style={stylesWithCssVar({
              '--x': Yscroll,
            })}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col translate-y h-[300%] duration-500 "
          >
            <motion.li className=" list-none max-w-[500px] my-28">
              <h1 className=" text-4xl w-full text-darktext">
                Advance Schedular
              </h1>
              <p className="text-xl font-Inter font-semibold pt-10 text-slate-200 w-4/5">
                Smartpost provide a advance schedular for adding future social
                media post to calender
              </p>
            </motion.li>
            <motion.li className=" list-none max-w-[500px] my-28">
              <h1 className=" text-4xl w-full text-darktext">
                Advance Schedular
              </h1>
              <p className="text-xl font-Inter font-semibold pt-10 text-slate-200 w-4/5">
                Smartpost provide a advance schedular for adding future social
                media post to calender
              </p>
            </motion.li>
            <motion.li className=" list-none max-w-[500px] my-28">
              <h1 className=" text-4xl w-full text-darktext">
                Advance Schedular
              </h1>
              <p className="text-xl font-Inter font-semibold pt-10 text-slate-200 w-4/5">
                Smartpost provide a advance schedular for adding future social
                media post to calender
              </p>
            </motion.li>
          </motion.div>
          <motion.div
            style={stylesWithCssVar({
              '--x': Yscroll,
            })}
            className="flex flex-col h-[300%] translate-y duration-700"
          >
            <motion.img src={schedular} className="max-w-[500px] py-20" />
            <motion.img src={schedular} className="max-w-[500px] py-20" />
            <motion.img src={schedular} className="max-w-[500px] py-20" />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Step;
