import { ReactNode, createContext, useEffect, useState } from 'react'

import { api } from '@services/api'

import { UserDTO } from '@dtos/UserDTO'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave
} from '@storage/storageUser'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave
} from '@storage/storageAuthToken'

type AuthContextDataProps = {
  user: UserDTO
  isLoadingUser: boolean
  signIn: (email: string, password: string) => Promise<void>
  singOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

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
      const { data } = await api.post('/sessions', { email, password })

      if (data.token && data.user && data.refresh_token) {
        setIsLoadingUser(true)

        await storageUserAndTokenSave(data.user, data.token, data.refresh_token)

        await userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUser(false)
    }
  }

  async function singOut() {
    try {
      setIsLoadingUser(true)

      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUser(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUser(true)

      const userLogged = await storageUserGet()
      const { token } = await storageAuthTokenGet()

      if (token && userLogged) {
        await userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUser(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptorTokenManager(singOut)

    return () => {
      subscribe()
    }
  }, [singOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUser,
        signIn,
        singOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
