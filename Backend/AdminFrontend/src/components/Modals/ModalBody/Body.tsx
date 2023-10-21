import React, { useMemo, useState } from 'react'

interface BodyProps {
   setData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  Data: { [key: string]: any };
}


const Body:React.FC<BodyProps> = ({Data , setData}) => {
    const  objectKeys = Object.keys(Data)
    const handleInput = (e:React.ChangeEvent<HTMLInputElement> ) =>{
        setData({...Data , [e.target.name]:e.target.value })
    }
    return (
    <form className=''  >
         {objectKeys.map((item) =>{
             return (
             <div className="flex flex-col gap-2 m-3   ">
                <label className='capitalize' >{item.replace('_' ,' ' )} </label>
                <input type="text" name={item} className='w-full p-3 h-10 border ' onChange={(e) => handleInput(e)} required />
            </div>)
            } 
         )}

        </form>
  )
}

export default Body