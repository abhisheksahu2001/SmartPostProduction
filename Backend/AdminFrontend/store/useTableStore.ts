import { create } from 'zustand'

interface TableProps {
    TableItems:object[]    
    setTableItems: (item) => void,
}

const useTableStore = create<TableProps>((set) =>({
    TableItems:[],
    setTableItems: (item) => set((state)=> ({TableItems: [...item ]})),
    

}))
export default useTableStore;