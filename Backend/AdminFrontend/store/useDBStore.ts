import { create } from 'zustand'

interface DBProps {
    Apps:string[],
    Tables:string[],
    Models:string[],
    setTables: (item:string[]) => void,
    setModels:(item:string[]) => void ,
    setApps:(item:string[])=>void,
}

const useDBStore = create<DBProps>((set) =>({
    Apps:[],
    Tables:[],
    Models:[] ,
    setApps:(item)=> set(()=>({Apps:[...item]})),
    setTables: (item) => set(()=> ({Tables:[...item ]})),
    setModels: (item) => set(()=> ({Models:[...item ]}))
    

}))
export default useDBStore;