import axios from 'axios'
import { AppError } from '@utils/AppError'

const api = axios.create({
  baseURL: '192.168.1.6:3333',
  timeout: 6000
})

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
  }
)

export { api }
