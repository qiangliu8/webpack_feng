import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import {
  routerReducer,
  routerMiddleware
} from 'react-router-redux'

import FastClick from 'fastclick'

import {
	appReducer,
	homeReducer
} from 'store/reducers'
import rootSaga from 'store/sagas'

import App from 'pages/app'

import 'styles/common.scss'

FastClick.attach(document.body)

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
/**
 * 创建状态容器
 */
const persistConfig = {
  key: 'root',
  storage,
}
const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, combineReducers(Object.assign(
	{},
	{app: appReducer},
	{home: homeReducer},
	{router: routerReducer}
)))
const store = createStore(persistedReducer, applyMiddleware(middleware, sagaMiddleware))
const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)

/**
 * 框架
 */
ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App history={history} />
		</PersistGate>
	</Provider>,
	document.getElementById('app')
)