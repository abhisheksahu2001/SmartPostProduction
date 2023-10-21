import { create } from 'zustand';

interface PlanModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePlanModal = create<PlanModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default usePlanModal;