import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem('chat-theme') || 'sunset',
    setTheme: (theme) => {
        set({ theme })
        localStorage.setItem('chat-theme', theme)
    }
}))