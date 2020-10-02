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

export interface AxiosResponse<T = any> {
  data: T
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
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

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
  // defaults: AxiosRequestConfig
  // interceptors: {
  //   request: AxiosInterceptorManager<AxiosRequestConfig>
  //   response: AxiosInterceptorManager<AxiosResponse>
  // }
  // 我们允许请求的时候 传入一个具体的类型

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  getUri(config?: AxiosRequestConfig): string
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config: AxiosRequestConfig): AxiosPromise<T>
}

// 拦截器 管理类对外暴露接口
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
