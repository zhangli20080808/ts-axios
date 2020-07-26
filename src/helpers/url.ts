import { isDate, isPlainObject } from './util'

/*
*
*  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
* 参数 url params 所有的参数我们处理成数组 然后通过join拼接起来
 我们这个函数不直接调用  encodeURIComponent 因为我们要对一些特殊字符做处理 比如 @ ：->转义后的字符串
 还需要把转义后的字符串转义回来
 encodeURIComponent("http://www.w3school.com.cn") -> http%3A%2F%2Fwww.w3school.com.cn
 encodeURIComponent("http://www.w3school.com.cn/p 1/") -> http%3A%2F%2Fwww.w3school.com.cn%2Fp%201%2F
 encodeURIComponent(",/?:@&=+$#") ->  %2C%2F%3F%3A%40%26%3D%2B%24%23
 *
 * encodeURI 自身无法产生能适用于HTTP GET 或 POST 请求的URI，例如对于 XMLHTTPRequests,
 * 因为 "&", "+", 和 "=" 不会被编码，然而在 GET 和 POST 请求中它们是特殊字符。
 * 然而encodeURIComponent这个方法会对这些字符编码。
* */

/*i 表示忽略大小写，g 表示全局匹配*/
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/gi, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  // forEach return 是跳不出的 会跳到下一次循环
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null && typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      /*相当于告诉服务端这个字段要解析成一个数组**/
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  //  再把我们的 kv 拆成 & 连接的形式  注意 hash后面的东西我们也要忽略掉 如果没有?我们拼一下
  let serializedParams = parts.join('&')
  if (serializedParams) {
    //  是否有hash
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
