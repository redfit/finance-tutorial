import { create } from "zustand"

type NewTransaction = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useNewTransaction = create<NewTransaction>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
