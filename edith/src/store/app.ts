import { create } from 'zustand'

type AppState = {
  latest: string
  composerOpen: boolean
  input: string
  setLatest: (t: string) => void
  setComposerOpen: (v: boolean) => void
  setInput: (v: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  latest: 'Hello, I am EDITH. How can I help?',
  composerOpen: false,
  input: '',
  setLatest: (t) => set({ latest: t }),
  setComposerOpen: (v) => set({ composerOpen: v }),
  setInput: (v) => set({ input: v }),
}))

