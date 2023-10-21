/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useContext } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useDropzone } from 'react-dropzone';
import GlobalContext from '../../../context/GlobalContext';

type ImageUrl = {
  rawImageData: [];
  ImageUrlData: [];
};

function ImageUploader() {
  const { setUrl, ImageUrl } = useContext(GlobalContext);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUrl({
        rawImageData: [...ImageUrl.rawImageData, ...acceptedFiles],
        ImageUrlData: [
          ...ImageUrl.ImageUrlData,
          ...acceptedFiles.map((file) => URL.createObjectURL(file)),
        ],
      });
    },
    [setUrl, ImageUrl]
  );
  // setUrl((prevImageUrl: ImageUrl) => ({
  //   rawImageData: [...prevImageUrl.rawImageData, ...acceptedFiles],
  //   ImageUrlData: [
  //     ...prevImageUrl.ImageUrlData,
  //     ...acceptedFiles.map((file: File) => URL.createObjectURL(file)),
  //   ],
  // }));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="  lg:w-28  w-14 md:m-1 md:w-20 cursor-pointer "
      {...getRootProps()}
    >
      <input className="" {...getInputProps()} />
      <span className=" min-w-max border-transparent duration-200  border hover:bg-slate-200 dark:hover-bg-darkbglight  hover:border-blue-500 lg:p-2 p-1 flex justify-center items-center  rounded-md ">
        <BsFillCloudUploadFill size={20} />
        <p className="lg:text-sm ml-2 lg:block md:hidden text-center capitalize font-Inter font-normal">
          {isDragActive ? 'Upload' : 'Upload Image'}
        </p>
      </span>
    </div>
  );
}

export default ImageUploader;
