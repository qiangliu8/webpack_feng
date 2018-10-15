// 以下代码为示例代码：
// import { takeEvery, call, put } from 'redux-saga/effects'
// import { push } from 'react-router-redux'

// import { CHOOSE_LOCAL_IMAGE } from 'store/actions/action-types'
// import {
//   setUploadLoadingVisible,
//   setCropTipsVisible,
//   setLocalImage,
//   setImgSrcType
// } from 'store/actions/app'

// import { chooseImage, localId2RemoteUrl } from 'services/weixin'
// import { showErrorMsg } from 'utils/error'

// function* chooseLocalImage() {
//   try {
//     const res = yield call(chooseImage)
//     yield put(setUploadLoadingVisible(true))
//     const img = yield call(localId2RemoteUrl, res[0])
//     yield put(setUploadLoadingVisible(false))
//     yield put(setLocalImage(img))
//     if(img.size > 3 * 1024) {
//       yield put(setCropTipsVisible(true))
//       yield put(setImgSrcType('base64'))
//     } else {
//       yield put(setImgSrcType('local'))
//       yield put(push('/result'))
//     }
//   } catch(e) {
//     yield put(setUploadLoadingVisible(false))
//     showErrorMsg(e)
//   }
// }

// export function* watchFetchWxJSSDK() {
//   yield takeEvery(CHOOSE_LOCAL_IMAGE, chooseLocalImage)
// }