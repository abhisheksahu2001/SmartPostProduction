/* eslint-disable */
import React, { useContext, useState } from 'react';
import { Dayjs } from 'dayjs';
import Navbar from '../Navbar';
import ChannelsList from '../Channels/ChannelsList';
import useChannelsData from '../../../helpers/useChannelsData';
import Editor from './Editor';

import { Footer } from './Footer';
import EditorMenu from './EditorMenu';
import GlobalContext from '../../context/GlobalContext';

interface CrafterProps {
  date?: Dayjs | null;
}

// eslint-disable-next-line react/function-component-definition
const Crafter: React.FC<CrafterProps> = () => {
  const { setUrl, ImageUrl } = useContext(GlobalContext);
  const [postText, setPostText] = useState('');
  const [selectedUrlImage, setSelectedImage] = useState<{ row: File, url: string } | null>(null);
  const { error, pageArray } = useChannelsData();

  const [channel, setChannel] = useState({
    id: pageArray[0]?.page_id,
    name: pageArray[0]?.page_name,
    url: pageArray[0]?.page_profile_pic_url,
  });

  return (
    <div className="fixed w-screen h-screen left-0   ">
      <div className="  grid grid-cols-[8rem_1fr_10rem] lg:grid-cols-[12rem_1fr_18rem] md:grid-cols-[12rem_1fr_14rem]   xl:grid-cols-[20rem_1fr_24rem] 2xl:grid-cols-[350px_1fr_550px]    w-full h-screen dark:bg-[#141a1f] ">
        <div className=" pt-1 border border-transparent border-r-slate-200  dark:border-r-[#223547] ">
          <ChannelsList channelsArray={pageArray} error={error} />
        </div>
        <div className="  ">
          <Editor
            imageUrl={ImageUrl}
            setImageUrl={setUrl}
            setCaption={setPostText}
            setImage={setSelectedImage}
          />
        </div>
        <div className="  border border-transparent border-l-slate-200  dark:border-l-[#23303c] dark:bg-darkbasebg bg-slate-100 ">
          <EditorMenu URlImage={selectedUrlImage} caption={postText} />
        </div>
      </div>
    </div>
  );
};

export default Crafter;
