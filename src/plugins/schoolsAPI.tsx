import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 2000
})

export const getFirstErrorMessage = (err: unknown | AxiosError): string => {
  if (axios.isAxiosError(err)) {
    if (err.response?.data.non_field_errors.length > 0) {
      return err.response?.data.non_field_errors[0]
    }
  }

  return 'Something went wrong'
}

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})

instance.interceptors.response.use((config: AxiosResponse) => {
  return config
})

export default instance
