import { create } from "zustand"
import { persist } from 'zustand/middleware';

interface authState {
    token: string | null,
    user: any | null,
    setToken: (token : string | null) => void,
    setUser: (user: any | null) => void,
    logout: () => void
}

export const useAuthStore = create<authState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setToken: (token) => set({ token }),
            setUser: (user) => set({ user }),
            logout: () => {
                set({ token: null, user: null })
                if (typeof window !== "undefined") {
                    localStorage.removeItem('auth_token')
                }
            }
        }),
        {
            name: 'auth-storage'
        }
    )
)