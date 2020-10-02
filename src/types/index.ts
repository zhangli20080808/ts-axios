/*
params 是用于拼接 url 的，get 请求传参就是拼到 url 中，而 data 是放在 request body 中的，用于 post 请求
* */
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  // text json blob
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

/*
 * AxiosPromise 接口继承自 AxiosResponse 这个 泛型接口
 * Promise 是一个泛型接口，resolve 函数的参数类型就是 T 类型，
 * 这个是 Promise 内部的实现机制。
 * 所以 Promise<AxiosResponse> 就表示 resolve 函数的参数就是 AxiosResponse 类型
 * */
export interface AxiosPromise extends Promise<AxiosResponse> {}

// 增强错误信息
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  // 为了让 JS 调用方判断 error 的类型，并和 JS 版本的 axios API 接口保持一致
  isAxiosError: boolean
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  getUri(config?: AxiosRequestConfig): string
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}
