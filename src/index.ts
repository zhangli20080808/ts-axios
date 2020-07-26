// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
/*
 * bindUrl的实现
 * */
import { buildUrl } from './helpers/url'
import { AxiosRequestConfig } from './types'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  /*url参数逻辑处理*/
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  processHeaders(headers, data)
}

export default axios
