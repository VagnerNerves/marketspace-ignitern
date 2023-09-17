import { ReactNode, createContext, useState } from 'react'

import { api } from '@services/api'

import { UserDTO } from '@dtos/UserDTO'
import { storageUserSave } from '@storage/storageUser'
import { storageAuthTokenSave } from '@storage/storageAuthToken'

type AuthContextDataProps = {
  user: UserDTO
  isLoadingUser: boolean
  signIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUser, setIsLoadingUser] = useState(false)

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  async function storageUserAndTokenSave(
    userData: UserDTO,
    token: string,
    refresh_token: string
  ) {
    try {
      await storageUserSave(userData)
      await storageAuthTokenSave({ token, refresh_token })
    } catch (error) {
      throw error
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUser(true)

      const { data } = await api.post('/sessions', { email, password })

      if (data.token && data.user && data.refresh_token) {
        await storageUserAndTokenSave(data.user, data.token, data.refresh_token)

        await userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUser(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUser,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
