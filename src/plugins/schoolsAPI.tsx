import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 2000
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.url !== undefined && config.url[config.url.length - 1] !== '/') {
    config.url += '/'
  }
  return config
})

export default instance
