import axios from 'axios'
import useDBStore from '../store/useDBStore'
import useTableStore from '../store/useTableStore'
import { toast } from 'react-toastify'

interface GetTableDataProps {
    app:string,
    model:string
}
 const useGetDataHook = () => {
   const { setApps , setModels ,setTables ,Tables } = useDBStore()
   const { setTableItems }  = useTableStore()
    const GetAllData = async() => {
      try{
        const res = await axios.get('https://localhost:8000/admin/show_models/')
          const TableRes = res.data.Tables
          const ModelRes = res.data.Models
          const AppRes = res.data.AppName
          setApps(AppRes)
          setModels(ModelRes)
          setTables(TableRes)
    }catch(error){
      console.log(error)
      toast.error('Something went wrong')
    }

}

 const GetTableData= async (props:GetTableDataProps)  =>{
    const {app , model} = props
    try{      
      const response = await axios.get(`https://localhost:8000/admin/get_tables/${app}/${model}/`)
      setTableItems(response.data.table)
      
    }catch(error){
      toast.error('Something went wrong')
      console.log(error)
    }
    
  
}
 return  { GetAllData , GetTableData }
}
export default useGetDataHook




