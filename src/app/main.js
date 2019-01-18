import React, { Component } from 'react';
import { connect } from 'react-redux';
import './main.css'

class Main extends Component {
	constructor() {
		super();
	}

	pickColor() {
		const { incr } = this.props;
		let colorChange = incr ? 'increase' : 'decrease';
		this.setState({ color: colorChange });
	}

	render() {
		const { price, incr } = this.props;
		let color = incr ? 'increase' : 'decrease';
		console.log("component price", price)
		return (
			<div>
				<h4 className={color}>Last bid exchange rate: { price }</h4>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	price: state.data.price,
	incr: state.data.incr
})

export default connect(mapStateToProps)(Main);

