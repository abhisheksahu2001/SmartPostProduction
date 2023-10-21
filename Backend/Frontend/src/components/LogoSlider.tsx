import Image from "next/image";
import React from "react";
// import images from "../Image";

const LogoSlider = () => {
  return (
    <section className="flex overflow-hidden w-full]">
      {/* <div className="animate-[slide_50s_linear_infinite] flex w-[calc(370px*3)]">
        <div className=" w-[250px]">
          <Image
            className="[250px] grayscale hover:grayscale-0"
            src={images[0]}
            alt=""
          />
        </div>
        <div className=" w-[250px]">
          <Image className=" w-[250px]" src={images[1]} alt="" />
        </div>
        <div className=" w-[250px] grayscale hover:grayscale-0">
          <Image className=" w-[250px]" src={images[2]} alt="" />
        </div>
        <div className=" w-[250px] grayscale hover:grayscale-0">
          <Image className=" w-[250px]" src={images[3]} alt="" />
        </div>
      </div> */}
    </section>
  );
};

export default LogoSlider;
