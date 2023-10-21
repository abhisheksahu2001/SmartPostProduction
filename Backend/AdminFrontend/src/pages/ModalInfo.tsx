import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Tables from '../components/Tables/Tables';
import useGetDataHook from '../../helpers/useGetDataHook';
import useTableStore from '../../store/useTableStore';
import useSearchHook from '../utils/useSearchHook';
import useDBStore from '../../store/useDBStore';
import PlanModal from '../components/Modals/PlanModal';
import usePlanModal from '../../Hooks/usePlanModal'
import dayjs from 'dayjs';
import { TableFields } from './TableFields';
const ModalInfo = () => {
  const {  GetTableData } = useGetDataHook()
  const { SearchInTable} = useSearchHook()
  const { TableName } = useParams();
  const { TableItems }  = useTableStore();
  

  const planModal = usePlanModal();
  const model = localStorage.getItem('model')

  const [key , setKey] = useState()
  
  useEffect(() => {
  const { app, model } = SearchInTable(TableName);
  GetTableData({ app, model }); 
  setKey(Object.keys(TableFields[model]));
}, [TableName]);

useMemo(() => {
   if (model) setKey(Object.keys(TableFields[model]));
}, [model]);
const handleDeletePlan = (e) =>{
     console.log(TableItems)
    console.log(e.target.value)
  }
 
  return (
    <>
    <div className='flex justify-between items-center font-bold text-xl capitalize pt-10 '>

      <h1 className=' ' >Table : {TableName?.replace('_', " ")}</h1>
      <button className='mr-10 bg-blue-500 p-2 rounded-md text-white ' onClick={planModal.onOpen}>Add Plan</button>
    </div>
    <div className="py-4 px-10 w-[100%] ">
         <h2 className="text-xl font-semibold mb-4">Table Data</h2>
         <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-200">
               <tr>
                  { key !== undefined ? (

                     key.map((item)=>{
                        
                        return(
                           <th scope="col" className="px-6 py-3 max-w-[200px]  overflow-x-auto text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                           {item.replace('_' , ' ')}
                           </th>
                        )
                     })
                     ) : (null) 
                  }
                  <th scope="col" className="px-6 py-3 max-w-[100px]  overflow-x-auto text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                  
                  </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {  key !== undefined ? (

                 TableItems.map((item, idx) => (
                    <tr key={idx}>
                        {key.map((keyItem) => (
                           <td key={keyItem} className="px-6 max-w-[200px] overflow-x-hidden hover:overflow-x-auto  py-4 whitespace-nowrap">
                           { keyItem.includes('at') || keyItem.includes('last')  ? dayjs(item[keyItem]).format('MM-YY-DD hh:mm a')   : `${item[keyItem]}`}
                        </td>
                     ))}
                     <td>
                        <button value={item.id} onClick={(e) => handleDeletePlan(e)}>delete</button>
                     </td>
                  </tr>
                      ))
                      ) : (null)
                     }
            </tbody>

         </table>
      </div>
    </>
  )
}

export default ModalInfo
