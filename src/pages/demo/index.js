import React from 'react'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'

import './index.scss'

class DemoPage extends React.Component {
	render () {
		return (
			<div className="page demo">
        <a onClick={() => this.props.goBack()}>返回</a>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		goBack: () => dispatch(goBack())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DemoPage)