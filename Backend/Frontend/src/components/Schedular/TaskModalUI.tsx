import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { AiOutlineLike } from 'react-icons/ai';
import { TfiComment } from 'react-icons/tfi';
import { BiShare } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import GlobalContext from '../../context/GlobalContext';
import ImageUploader from './PostModal/ImageUploader';
import { validDate } from './PostModal/ModalHelpers';
import { usePostData } from '../../../helpers/usePostData';

interface CalenderHeaderProps {
  page_id: number;
  page_name: string;
  page_profile_pic_url: string;
}

interface TaskModalProp {
  HideModal: Dispatch<SetStateAction<boolean>>;
  selectedData: string | '';
  channels: CalenderHeaderProps[];
}
type ImageObject = {
  row: File;
  url: string;
};
// eslint-disable-next-line react/function-component-definition
const TaskModalUI: React.FC<TaskModalProp> = ({
  HideModal,
  selectedData,
  channels,
}) => {
  const { setDisableKeyControl, setUrl, ImageUrl } = useContext(GlobalContext);

  const [postText, setPostText] = useState('');
  const [selectedUrlImage, setSelectedImage] = useState<ImageObject>();
  const [channel, setChannel] = useState({
    id: channels[0]?.page_id,
    name: channels[0]?.page_name,
    url: channels[0]?.page_profile_pic_url,
  });
  const [PostTime, setPostTime] = useState({
    date_time: selectedData,
  });
  const [disableTimePicker, setDisableTimePicker] = useState(false);
  const handleModelClose = (e: any) => {
    e.stopPropagation();
    if (e.target.id === 'close') {
      HideModal((pre) => !pre);
      setDisableKeyControl(false);
    }
  };
  const handleTimePicker = (e: any) => {
    setPostTime({ date_time: e.target.value });
  };

  const handleChannelChange = (e: any) => {
    const page = channels.find((val) => val.page_id === e.target.value);
    if (page) {
      setChannel({
        id: page.page_id,
        name: page.page_name,
        url: page.page_profile_pic_url,
      });
    }
  };
  const handleSelectImage = (idx: number, e: any) => {
    setSelectedImage({
      row: ImageUrl.rawImageData[idx],
      url: ImageUrl.ImageUrlData[idx],
    });
  };
  const handleDeleteImage = (idx: number, e: any) => {
    e.stopPropagation();
    setUrl({
      rawImageData: ImageUrl.rawImageData.filter((_, index) => index !== idx),
      ImageUrlData: ImageUrl.ImageUrlData.filter((_, index) => index !== idx),
    });
  };
  useEffect(() => {
    setSelectedImage({
      row: ImageUrl.rawImageData[ImageUrl.rawImageData.length - 1],
      url: ImageUrl.ImageUrlData[ImageUrl.ImageUrlData.length - 1],
    });
  }, [ImageUrl]);
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
  const { FBPostApi } = usePostData();

  const SubmitPost = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('page_id', `${channel.id}`);
    if (postText) {
      formData.append('caption', postText);
      formData.delete('type');
      formData.append('type', '0');
    }
    if (selectedUrlImage?.row) {
      formData.append('image', selectedUrlImage.row);
      formData.delete('type');
      formData.append('type', '1');
    }
    if (disableTimePicker) {
      const TimeStampDate = new Date(PostTime.date_time.replace('T', ' '));
      const timeStampInSecond = TimeStampDate.getTime() / 1000;
      formData.append('time_stamp', `${timeStampInSecond}`);
    }
    if (postText && selectedUrlImage?.row) {
      formData.delete('type');

      formData.append('type', '2');
    }
    if (postText && disableTimePicker) {
      formData.delete('type');

      formData.append('type', '3');
    }

    if (selectedUrlImage?.row && disableTimePicker) {
      formData.delete('type');

      formData.append('type', '4');
    }
    if (selectedUrlImage?.row && disableTimePicker && postText) {
      formData.delete('type');

      formData.append('type', '5');
    }

    FBPostApi(formData)
      .then((res) => {
        toast.success(res.data.res);
      })
      .catch((error) => toast.error('Something went wrong please try again'));
  };

  // const renderProfile = useCallback(
  //   (ch: number) => {
  //     const page = channels.find((val) => val.page_id == ch);
  //     return page ? page.page_profile_pic_url : null;
  //   },
  //   [channel]
  // );

  const handleDisableTimePicker = () => {
    setDisableTimePicker((pre) => !pre);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      onClick={(e) => handleModelClose(e)}
      id="close"
      className="fixed h-screen w-screen left-0 top-0 backdrop-blur-sm  "
    >
      <motion.div
        animate={{ transition: { staggerChildren: 1 } }}
        className="absolute flex justify-center   m-auto top-14 bottom-0 left-0 right-0 w-full md:w-full lg:w-3/4 "
        id="close"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.3 } }}
          className="flex w-full lg:w-2/5 md:w-1/2  relative h-1/2 lg:h-[82%] md:h-[70%] top-20 m-1 p-3 md:p-1   bg-slate-50  shadow-xl z-10  text-black md:rounded-md  rounded-lg   "
        >
          <button
            type="button"
            onClick={(e) => handleModelClose(e)}
            id="close"
            className="close text-black ml-2 absolute  text-2x font-bold text-Poppins "
          >
            X
          </button>

          <section className="flex mt-3 w-full ">
            <form
              className="m-2   p-1  mt-4 rounded-md w-full  "
              onSubmit={(e) => SubmitPost(e)}
            >
              <textarea
                rows={20}
                placeholder="What do you want to share ?"
                onChange={(e) => setPostText(e.target.value)}
                className="border-b bg-slate-50 rounded-md  w-full p-2 font-Poppins md:text-sm text-xs lg:text-md resize-none    text-black outline-none  "
              />
              <div className="flex">
                <ImageUploader />
                <div className="flex ">
                  {ImageUrl.ImageUrlData.length !== 0
                    ? ImageUrl.ImageUrlData.map((el, i) => {
                      return (
                        <motion.div
                          className="w-full group duration-500"
                          key={i}
                          variants={container}
                          initial="hidden"
                          animate="show"
                        >
                          <motion.button
                            type="button"
                            onClick={(e) => handleSelectImage(i, e)}
                          >
                            <MdDelete
                              size={30}
                              onClick={(e) => handleDeleteImage(i, e)}
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
              </div>
              <div className="m-1 p-1 pl-0 ml-0 flex  justify-between items-center  ">
                <span className="lg:m-2 lg:p-2 m-1 p-1 pl-0 ml-0 flex  ">
                  <div className="flex my-2 mr-2 ">
                    <span className="mr-3 text-md font-medium text-gray-900 dark:text-gray-600">
                      Schedule Post
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={disableTimePicker}
                        className="sr-only peer"
                        onChange={(e) => handleDisableTimePicker()}
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
                        className="outline-none font-medium rounded-md border border-slate-400 p-1   "
                        min={selectedData}
                        max={validDate(selectedData)}
                        value={PostTime.date_time}
                        onChange={(e) => handleTimePicker(e)}
                        required
                      />
                    </div>
                  ) : (
                    <p
                      className="text-center border border-slate-400 flex items-center px-2 font-semibold 
                    capitalize text-sm text-slate-600 p-1 bg-slate-100 rounded-md duration-300 "
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
            </form>
          </section>
        </motion.div>
        <motion.div
          initial={{ width: '0px', opacity: 0 }}
          animate={{
            width: '33%',
            opacity: 1,
            transition: { duration: 0.5 },
          }}
          className="flex w-1/3  relative lg:h-[82%] md:h-[70%]  top-20 m-1 p-3   bg-white  shadow-xl z-10  text-black   rounded-lg   "
        >
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="Container m-5 delay-500 w-full "
          >
            <h1 className="font-Inter font-semibold capitalize ">
              Post Preview
            </h1>
            {postText === '' &&
              (selectedUrlImage?.url === '' ||
                selectedUrlImage?.url === undefined) ? (
              <div className="mx-[10%] shadow rounded-md p-4 w-3/4 translate-y-full ">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-200 h-14 w-14" />
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-7 bg-slate-200 rounded" />
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-5 bg-slate-200 rounded col-span-2" />
                        <div className="h-6 bg-slate-200 rounded col-span-1" />
                      </div>
                      <div className="h-2 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              channels &&
              channels.length > 0 && (
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
                  <div className="mt-1 md:mt-3 lg:mt-5">
                    <label
                      htmlFor="platform"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Select Channel
                    </label>
                    <select
                      required
                      onChange={(e: any) => handleChannelChange(e)}
                      id="platform"
                      // value={channel.name}
                      className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option>Select Page</option>
                      {channels.map((el: any) => {
                        return (
                          <option key={el.page_name} value={el.page_id}>
                            {el.page_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <section className="flex flex-col border border-grey-100 mt-10 overflow-y-scroll max-h-[380px]  ">
                    <div className="m-1 p-2 flex items-center">
                      <img
                        src={`${channel.url}`}
                        className="rounded-full w-10 h-10"
                        alt=""
                      />
                      <span className="flex flex-col ml-2">
                        <h1 className="font-semibold font-Poppins">
                          {channel.name}
                        </h1>
                        <h2 className="">Now</h2>
                      </span>
                    </div>
                    <div className="m-1 py-1 px-2  text-lg w-fit  ">
                      <p className="max-w-full font-Poppins text-[1rem] ">
                        {postText}
                      </p>
                    </div>
                    <div className="m-1 p-1">
                      {selectedUrlImage?.url !== undefined ? (
                        <img src={`${selectedUrlImage?.url}`} alt="postImage" />
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
                          <BiShare
                            size={20}
                            className="text-gray-500 font-normal "
                          />
                          <p className="ml-1">Share</p>
                        </span>
                      </li>
                    </div>
                  </section>
                </section>
              )
            )}
          </motion.section>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TaskModalUI;
