import {
	APP_ID
} from 'store/actions/action-types'

const initialState = {
	appID: ''
}

const app = (state = initialState, action) => {
	switch (action.type) {
		case APP_ID:
			return Object.assign({}, state, {appID: action.payload})
		default:
			return state
	}
}

export default app