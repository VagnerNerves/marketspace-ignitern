import axios, { AxiosInstance } from 'axios'
import { AppError } from '@utils/AppError'

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptorTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.1.4:3333',
  timeout: 6000
}) as APIInstanceProps

api.registerInterceptorTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(
    response => response,
    async error => {
      if (error?.response?.status === 401) {
        signOut()

        return Promise.reject(new AppError('Acesse sua conta novamente.'))
      }

      if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message))
      } else {
        return Promise.reject(error)
      }
    }
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
