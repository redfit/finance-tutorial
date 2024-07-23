import { create } from "zustand"

type NewAccount = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useNewAccount = create<NewAccount>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
