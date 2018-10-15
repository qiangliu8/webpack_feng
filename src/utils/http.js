import axios from 'axios'
import qs from 'qs'

import {
  initServerError,
  initValidate,
	initValidateByPromise
} from 'utils/error'

// 超时时间15s
axios.defaults.timeout = 15000
// Ajax请求
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'

//请求拦截器
axios.interceptors.request.use(config => {
  if (config.method !== 'get') {
    let headers = (config.headers['Content-Type'] && config.headers) || axios.defaults.headers[config.method] || axios.defaults.headers.common || {}
    // config.headers = headers
    // 参数特殊处理
    if (headers['Content-Type'].indexOf('application/json') < 0) {
      config.data = qs.stringify(config.data)
    }
  }
  config.url = config.url + '?' + new Date().getTime()
  // config.url = config.url.indexOf('?') < 0 ? (config.url + '?_=' + new Date().getTime()) : (config.url + '&_=' + new Date().getTime())
  return config
}, error => Promise.reject(error))

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  let result = response.data || {}
  if(result.code !== 0){
    if(result.code === 401) {
      return Promise.reject(initValidate({code: 101, msg: result.desc}))
    }
		return initValidateByPromise(result.desc)
	}
  return result.data
}, err => {
  return Promise.reject(initServerError(err))
})

export default axios