/* eslint-disable */
import React from 'react';

function BoilerUi() {
    return (
        <div className="mx-[5%] shadow  rounded-md p-4 mt-5 w-full dark:border dark:border-darkborder  ">
            <div className="animate-pulse  flex space-x-4">
                <div className="rounded-full dark:bg-lightdarkbg bg-slate-200/90 h-20 w-20" />
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-7 bg-slate-500/50 dark:bg-darkborder  rounded" />
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-5 bg-slate-200/60 dark:bg-darkbglight rounded col-span-2" />
                            <div className="h-6 bg-slate-200/60 dark:bg-darkbglight rounded col-span-1" />
                        </div>
                        <div className="h-8 bg-slate-200 rounded dark:bg-darkbglight" />
                    </div>
                </div>
            </div>
            <div className="h-20 mt-5  w-full bg-slate-200 rounded  dark:bg-lightdarkbg  " />
        </div>
    );
}

export default BoilerUi;
