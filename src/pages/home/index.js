import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
  
import { setAppID } from 'store/actions/app'

import './index.scss'

class HomePage extends React.Component {
	render () {
		return (
			<div className="page home">
        <div>Home: { this.props.demoHome }</div>
        <div>appID: { this.props.appID }</div>
        <a onClick={() => this.props.setAppID('1')}>修改APPID为1</a>
        <a onClick={() => this.props.toDemoPage()}>跳转至Demo</a>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		appID: state.app.appID,
		demoHome: state.home.demoHome,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setAppID: appID => dispatch(setAppID(appID)),
		toDemoPage: () => dispatch(push('/demo'))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage)