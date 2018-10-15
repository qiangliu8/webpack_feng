import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'

import RouteConfig from 'router'

class App extends React.Component {
	static propTypes = {
		history: PropTypes.object,
	}

	render () {
		return (
			<ConnectedRouter history={this.props.history}>
				<Route path="/" component={RouteConfig} />
			</ConnectedRouter>
		)
	}
}

export default App
