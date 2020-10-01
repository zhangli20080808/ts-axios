import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })
// //
// const date = new Date()
//
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })
// //
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })
//
// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8',
//     'accept': 'application/json,text/plain,*/*'
//   },
//   data: {
//     a: 3,
//     b: 4
//   }
// })

// const arr = new Int32Array([21, 31])
//
//
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

// 浏览器发现我们传入这样一个对象之后 会给我们添加一个合适的 content-type供服务端解析
// 服务端可以拿到正确的数据 然后响应 返回过来 比如我我们传入一个form-data这样的数据 也会添加合适的content-type
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// //
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 5,
    b: 6
  }
}).then((res) => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) => {
  console.log(res)
})
