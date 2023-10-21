/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import FacebookSection from './SocailChannel/FacebookSection';

function SocialConnect() {
    const [socialChannel, setSocialChannel] = useState('facebook');

    const SelectedChannel = useMemo(() => {
        if (socialChannel === 'facebook') {
            return <FacebookSection />;
        }
    }, [socialChannel, setSocialChannel]);
    useEffect(() => {
        return localStorage.removeItem('channelRequested');
    }, []);
    return (
        <>
            <Navbar move={false} position="relative" />
            <section className=" absolute mx-32 pt-10 rounded-xl ml-48   w-[80%]    ">
                <div className="flex w-full  p-5">
                    <section className=" w-1/4 p-5 flex flex-col  ">
                        <h1 className="text-lg font-bold dark:text-slate-100    ">
                            Connect Social Account
                        </h1>
                        <li className=" list-none my-4 hover:text-darktext duration-200">
                            <button
                                className="font-semibold text-md "
                                onClick={() => setSocialChannel('facebook')}
                            >
                                Facebook
                            </button>
                        </li>
                        <li className=" list-none hover:text-darktext duration-200">
                            <button className="font-semibold text-md ">Instagram</button>
                        </li>
                        <li className=" list-none my-4 hover:text-darktext duration-200">
                            <button className="font-semibold text-md ">LinkedIn</button>
                        </li>
                        <li className=" list-none hover:text-darktext duration-200">
                            <button className="font-semibold text-md ">X Twitter </button>
                        </li>
                    </section>
                    <section className="flex-1 bg-slate-100 dark:bg-lightdarkbg  h-[80vh] rounded-xl border dark:border-darkborder   ">
                        {SelectedChannel}
                    </section>
                </div>
            </section>
        </>
    );
}

export default SocialConnect;
