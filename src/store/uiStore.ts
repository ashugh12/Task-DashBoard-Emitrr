// store/uiStore.ts
import { create } from 'zustand'

interface UIState {
  isBoardViewVisible: boolean
  showBoardView: () => void
  hideBoardView: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isBoardViewVisible: false,
  showBoardView: () => set({ isBoardViewVisible: true }),
  hideBoardView: () => set({ isBoardViewVisible: false })
}))
