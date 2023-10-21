import useTableStore from "../../store/useDBStore"



const useSearchHook = () => {
    const { Tables , Apps , Models  }  = useTableStore()

    const SearchInTable = (TableName:string | undefined ) =>{
        
        const idx =  Tables.findIndex(table => table === TableName);
        if(idx === -1 ) {
          const app = localStorage.getItem('app');
          const model = localStorage.getItem('model')
          return {  app: app , model:model }
        }
        localStorage.setItem('app' , Apps[idx] )
        localStorage.setItem('model' , Models[idx] )
        return { app: Apps[idx], model: Models[idx] } 
}
  return { SearchInTable }
}
export default useSearchHook

 