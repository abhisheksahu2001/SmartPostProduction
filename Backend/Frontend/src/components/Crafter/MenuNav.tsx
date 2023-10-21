/* eslint-disable */
import React from 'react';
import { GrFormView } from 'react-icons/gr';
import { MdModeEdit, MdOutlineScreenshotMonitor } from 'react-icons/md';
import { BsRobot } from 'react-icons/bs';
import { BiFullscreen } from 'react-icons/bi';

interface MenuNavProps {
    ChangeMenu: React.Dispatch<React.SetStateAction<string>>;
}

function MenuNav({ ChangeMenu }: MenuNavProps) {
    return (
        <div className=" rounded-lg p-1 px-5   bg-white-200 shadow-md shadow-blue-200/40 dark:border dark:border-darkborder dark:shadow-none  w-min bg-white    dark:bg-lightdarkbg  ">
            <ul className="flex  justify-between  items-center pt-2    ">
                <li className="rounded-md group   ">
                    <button
                        onClick={() => ChangeMenu('Preview')}
                        className="  "
                        type="button"
                        title="Post Preview"
                    >
                        <BiFullscreen
                            size={20}
                            className=" group-hover:text-blue-400 duration-150"
                        />
                    </button>
                </li>
                <li className=" px-5  rounded-md   group  ">
                    <button
                        onClick={(e) => ChangeMenu('Enhance')}
                        className=""
                        type="button"
                        title="Enhance Post"
                    >
                        <MdModeEdit
                            size={20}
                            className=" group-hover:text-blue-400 duration-150"
                        />
                    </button>
                </li>
                <li className=" rounded-md    group ">
                    <button
                        onClick={(e) => ChangeMenu('Ai')}
                        className=""
                        type="button"
                        title="AI Assistance"
                    >
                        <BsRobot
                            size={18}
                            className=" group-hover:text-blue-400 duration-150"
                        />
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default MenuNav;
