/*请求和响应的相关 我们定义在这里 */

import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  // formData blob 这些我们不需要做转化  我们只需要对普通对象做转换
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
