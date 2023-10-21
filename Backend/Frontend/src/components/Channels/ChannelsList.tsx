/* eslint-disable */
import React, { useEffect } from 'react';

interface DataType {
  page_profile_pic_url: string;
  page_name: string;
}

interface ChannelsListProp {
  setSelectedChannel?: (data: DataType) => void;
  channelsArray: DataType[];
  error: string | undefined;
}

const ChannelsList: React.FC<ChannelsListProp> = ({
  channelsArray,
  error,
  setSelectedChannel,
}) => {
  useEffect(() => {
    console.log(setSelectedChannel);
  }, [setSelectedChannel]);

  return (
    <section className="p-5 rounded-md h-screen">
      <div className="font-semibold text-darkbglight dark:text-white">
        Accounts
      </div>
      <div className="font-Inter">
        {channelsArray?.map((data, i) => (
          <button
            onClick={() => setSelectedChannel && setSelectedChannel(data)}
            key={i}
            type="button"
            className="rounded-md flex w-full items-center h-16 hover:bg-blue-100 dark:hover:bg-darkbglight p-2 m-1"
          >
            <img
              src={data.page_profile_pic_url}
              className="rounded-full w-10 h-10"
              alt="pageimage"
            />
            <h2 className="ml-5 font-semibold capitalize">{data.page_name}</h2>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ChannelsList;
