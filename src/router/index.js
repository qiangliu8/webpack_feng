import React from 'react'
import { Switch, Route } from 'react-router-dom'
/** 组件异步加载，小型项目无需使用 */
import Loadable from 'react-loadable'

// const HomePage = Loadable({ loader: () => import(/*webpackChunkName: 'home'*/'pages/home'), loading: Loading })
import HomePage from 'pages/home'
import DemoPage from 'pages/demo'

class Loading extends React.Component {
	render() {
		return '加载中'
	}
}

class RouteConfig extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={HomePage}/>
				<Route path="/demo" component={DemoPage}/>
			</Switch>
		)
	}
}

export default RouteConfig