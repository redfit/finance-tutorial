import { create } from "zustand"

type NewCategory = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useNewCategory = create<NewCategory>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
