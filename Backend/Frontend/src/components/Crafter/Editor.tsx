/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdDelete } from 'react-icons/md';
import dayjs from 'dayjs';
import DarkMode from '../DarkMode';
import ImageUploader from '../Schedular/PostModal/ImageUploader';
import GlobalContext from '../../context/GlobalContext';
import { validDate } from '../Schedular/PostModal/ModalHelpers';

type ImageUrl = { rawImageData: File[]; ImageUrlData: string[] }

interface EditorProps {
    setCaption: React.Dispatch<React.SetStateAction<string>>;
    imageUrl: ImageUrl;
    setImage: (url: any) => void;
    setImageUrl: (url: ImageUrl) => void;
}

// eslint-disable-next-line react/function-component-definition
const Editor = ({
    setCaption,
    setImage,
    imageUrl,
    setImageUrl,
}: EditorProps) => {
    const currDate = dayjs().format('YYYY-MM-DD');
    const currentTime = dayjs(dayjs().add(15, 'minutes')).format('HH:mm');
    const selectedData = `${currDate}T${currentTime}`;

    const [disableTimePicker, setDisableTimePicker] = useState(false);

    const handleDisableTimePicker = () => {
        setDisableTimePicker((pre) => !pre);
    };
    const [PostTime, setPostTime] = useState({
        date_time: selectedData,
    });
    const handleSelectImage = (idx: number) => {
        setImage({
            row: imageUrl.rawImageData[idx],
            url: imageUrl.ImageUrlData[idx],
        });
    };
    const handleDeleteImage = (idx: number, e: any) => {
        e.stopPropagation();
        setImageUrl({
            rawImageData: imageUrl.rawImageData.filter((_, index) => index !== idx),
            ImageUrlData: imageUrl.ImageUrlData.filter((_, index) => index !== idx),
        });
    };
    useEffect(() => {
        setImage({
            row: imageUrl.rawImageData[imageUrl.rawImageData.length - 1],
            url: imageUrl.ImageUrlData[imageUrl.ImageUrlData.length - 1],
        });
    }, [imageUrl]);
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delayChildren: 0.5,
                staggerDirection: 1,
            },
        },
    };
    const handleTimePicker = (e: any) => {
        setPostTime({ date_time: e.target.value });
    };
    return (
        <div className="p-5">
            <nav className="flex justify-between items-center  ">
                <div className="font-semibold">Post Editor</div>
                <div>
                    <DarkMode />
                </div>
            </nav>
            <section className="mt-5 p-2 dark:bg-lightdarkbg rounded-xl  ">
                <textarea
                    onChange={(e) => setCaption(e.target.value)}
                    className=" resize-none   font-Inter font-semibold outline-none p-3 h-[300px] w-full border dark:border-darkborder    dark:text-slate-100 
                    dark:placeholder:text-slate-400 placeholder:text-xs 
                    rounded-lg dark:bg-darkbglight       "
                    placeholder="Add your content here e.g. caption , image etc.  "
                />
                <ImageUploader />
                <div className="flex ">
                    {imageUrl.ImageUrlData.length !== 0
                        ? imageUrl.ImageUrlData.map((el, i) => {
                            return (
                                <motion.div
                                    className="m-1 group duration-500"
                                    key={i}
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                >
                                    <motion.button
                                        type="button"
                                        onClick={(e: any) => handleSelectImage(i)}
                                    >
                                        <MdDelete
                                            size={30}
                                            onClick={(e: any) => handleDeleteImage(i, e)}
                                            className=" p-1 absolute bg-darkbglight text-blue-200 -translate-y-2 -translate-x-1 opacity-0 group-hover:opacity-100    rounded-full  text-center   hover:opacity-100 "
                                        />
                                        <motion.img
                                            alt=""
                                            src={`${el}`}
                                            className="w-20 h-20 m-1 rounded-md"
                                        />
                                    </motion.button>
                                </motion.div>
                            );
                        })
                        : null}
                </div>
            </section>
            <div className="m-1 p-1 pl-0 ml-0 flex  justify-between items-center  ">
                <span className="lg:m-2 lg:p-2 m-1 p-1 pl-0 ml-0 flex  ">
                    <div className="flex my-2 mr-2 ">
                        <span className="mr-3 text-md font-medium text-gray-900 dark:text-gray-200">
                            Schedule Post
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={disableTimePicker}
                                className="sr-only peer"
                                onChange={() => handleDisableTimePicker()}
                            />
                            <div
                                className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-400 
                      peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] 
                      after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all 
                      dark:border-gray-600 peer-checked:bg-blue-600"
                            />
                        </label>
                    </div>
                    {disableTimePicker ? (
                        <div className="flex duration-300 ">
                            <input
                                type="datetime-local"
                                name="date_time"
                                className="outline-none dark:bg-transparent 
                                font-medium rounded-md border
                                 border-slate-400 focus:bg-slate-900  p-1 dark:invert dark:text-black   dark:border-transparent    "
                                min={selectedData}
                                max={validDate(selectedData)}
                                value={PostTime.date_time}
                                onChange={(e: any) => handleTimePicker(e)}
                                required
                            />
                        </div>
                    ) : (
                        <p
                            className="text-center  flex items-center px-2 font-normal 
                    capitalize text-sm text-slate-600 p-1 bg-slate-100 dark:bg-darkbglight dark:text-slate-200  rounded-md duration-300 "
                        >
                            created post will be posted immediately
                        </p>
                    )}
                </span>
            </div>
            <button
                type="submit"
                className="m-2 w-1/3 p-2 bg-blue-600 rounded-md text-md hover:bg-blue-500 font-Inter text-white "
            >
                Schedule Post
            </button>
        </div>
    );
};

export default Editor;
