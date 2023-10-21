/* eslint-disable */
import React, { useRef } from 'react';
import { TbExternalLink } from 'react-icons/tb';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import socialpost from '../../../public/socialpost.png';

function Imagecomponent() {
  const targetRef = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end start', 'start end'],
  });
  const opacity = useTransform(scrollYProgress, [0.7, 0.8], [1, 0]);
  return (
    <motion.img
      ref={targetRef}
      style={{ opacity }}
      src={socialpost}
      alt="social media post"
      className="relative left-60 w-full h-5/6 mt-12 z-1"
    />
  );
}

export default Imagecomponent;
