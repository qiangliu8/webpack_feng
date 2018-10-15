import { Toast } from 'antd-mobile'
/**
 * 100 普通服务器端错误，直接将错误信息弹框显示
 * 101 登录超时，跳转到登录页重新登录
 * 200 普通客户端校验，正常显示错误信息
 */

/**
 * 展示错误信息
 * @param code 错误码
 * @param msg 错误信息
 */
export function showErrorMsg(error) {
	console.error('showErrorMsg', error)
	let {code, msg} = error
	if (code === 100) { // 普通服务器端错误，直接将错误信息弹框显示
		Toast.offline(msg, 1.5)
	} else if (code === 101) { // 登录超时，跳转到登录页重新登录
		Toast.info('登录失败，请重新登录', 1.5)
		window.location.href = '/'
	} else if (code === 200) { // 普通客户端校验，正常显示错误信息
		Toast.info(msg, 1.5)
	} else if (code === 201) { // WXJSSDK相关
		Toast.info(msg, 1.5)
	} else {
		return
	}
}

/**
 *  初始化服务器端返回错误信息 (服务器端错误统一1XX)
 * @param error 服务器返回错误信息
 * @returns {{code: number, msg}} 封装后错误信息
 */
export function initServerError (error) {
	const {response, request} = error
	if (request.status === 0) {
		return {
			code: 100,
			msg: '服务器开小差了~稍后再试'
		}
	}
	// 判断如果是401错误 直接跳转至登录页
	if (response.status === 401) {
		return {
			code: 101,
			msg: '登录超时，请重新登录'
		}
	}
	return {
		code: 100,
		msg: '服务器开小差了~稍后再试'
	}
}

/**
 * 初始前端验证返回错误信息 (客户端错误统一2XX)
 * @param errorMsg 需要提示给用户的错误信息
 * @returns {{code: number, msg: *}} 封装后错误信息
 */
export function initValidate ({code, msg}) {
	return {
		code: code || 200,
		msg: msg
	}
}

/**
 * initValidate 的promise版
 * @param errorMsg 需要提示给用户的错误信息
 * @returns {Promise.<*>} 封装后错误信息
 */
export function initValidateByPromise (errorMsg) {
	return Promise.reject(initValidate({msg: errorMsg}))
}
