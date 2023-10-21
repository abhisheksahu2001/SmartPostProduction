/* eslint-disable */
import React, { useState } from 'react';
import Navbar from '../Navbar';
import ChannelSidebar from './ChannelSidebar';
import ConnectForms from './ConnectForms';

function Channels() {
  const [connect, setConnect] = useState('none');

  return (
    <section className="bg-[#f3f6f9]">
      <Navbar move={false} position="relative" />
      <div className="absolute  pt-20   flex mt-5 md:mt-0 flex-col md:items-center w-full h-full ">
        <span className="md:w-1/2 px-5">
          <h1 className="font-Inter  text-sm text-bluebg font-semibold pb-2">
            Channels
          </h1>
          <h1 className="font-Inter text-xl md:text-3xl  font-semibold">
            Connect a new channel
          </h1>
        </span>
        <section className="md:w-1/2 md:h-[95%]  md:min-w-[50%] rounded-md  border-transparent  md:max-w-[100%]  md:min-h-[50%] md:max-h-[100%] ">
          <div className="flex md:flex-row flex-col  min-h-full ">
            <section className="md:w-4/6 w-full ">
              <ChannelSidebar
                chooseChannel={setConnect}
                currentChannel={connect}
              />
            </section>
            <section className="min-w-[95%]  ">
              <ConnectForms selectedChannel={connect} />
            </section>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Channels;
