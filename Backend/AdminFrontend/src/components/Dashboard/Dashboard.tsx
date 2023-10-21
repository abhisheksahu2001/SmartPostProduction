import React, { useEffect, useState} from 'react'
import useGetDataHook from '../../../helpers/useGetDataHook'
import { Link } from 'react-router-dom'
import useDBStore from '../../../store/useDBStore'
const Dashboard = () => {
  const { Tables } = useDBStore()
  const { GetAllData} = useGetDataHook()
  useEffect(()=>{
      GetAllData()
  },[])
  return (
    <>
    <div className='font-bold text-xl m-5 ml-10 ' >Dashboard</div>
    <ul className='m-5 p-5' >{Tables.map((item , idx)=>{
      return <li className='my-2 font-semibold hover:underline ' key={idx} >
        <Link   to={`/adminpanel/${item}`}>{item}</Link>
        </li>
    })}</ul>
    </>
  )
}

export default Dashboard

