'use client'

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { authApi } from "../types"

export const useAuth = () => {
    const router = useRouter()
    const {token, user, setUser, setToken, logout} = useAuthStore()

    const login = async (username: string, password: string) => {
     try {
        const response = await authApi.login({username, password})

        setToken(response.token)
        document.cookie = `auth_token=${response.token}; path=/; max-age=86400`;
        if (typeof window != "undefined") {
            localStorage.setItem('auth_token', response.token)
        }

        const response2 = await authApi.self()

        setUser(response2)

        router.push('/inventory')
        return {...response, user: response2}

     } catch (error) {
        throw error
     }
    }

    const isAuthenticated =  !!token

    return { token, user, login, logout, isAuthenticated }
}