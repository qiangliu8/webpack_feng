// import { watchFetchWxJSSDK } from 'store/sagas/app'

// our root saga: single entry point to start our sagas at once
export default function* rootSaga () {
	// combine all of our sagas that we create
	// and we want to provide all our Watchers sagas
	yield [
		// watchFetchWxJSSDK()
	]
}