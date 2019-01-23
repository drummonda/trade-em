require("../../secrets.js")
const axios = require('axios');
const { generateParams, generateUrl, generateBodyWithSig, getArgs } = require('../utils');
const { POST: 
		{ 	
			NEW_ORDER,
			NEW_ORDER_TEST
		}
	} = require('../endpoints');
const { orderTypes: { LIMIT } } = require('../enums');
const header = require('./config');
const generateSig = require('./hash');

// ACCOUNT ENDPOINTS

/*
 *
 * postOrder
 * Send in a new order.
 * Parameters:
 * 		symbol  	      [STRING]    (MANDATORY)
 *		side		      [ENUM]	  (MANDATORY)
 *		type 		      [ENUM]	  (MANDATORY)
 *		timeInForce       [ENUM]	  (NOT MANDATORY)
 *		quantity	      [DECIMAL]	  (MANDATORY)
 *		price 		      [DECIMAL]	  (NOT MANDATORY)
 *		newClientORderId  [STRING]	  (NOT MANDATORY)	A unique id for the order. Automatically generated if not sent.
 *		stopPrice		  [DECIMAL]	  (NOT MANDATORY)	Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
 *		icebergQty		  [DECIMAL]	  (NOT MANDATORY)	Used with LIMIT, STOP_LOSS_LIMIT, and TAKE_PROFIT_LIMIT to create an iceberg order.
 * 		newORderRespType  [ENUM]	  (NOT MANDATORY)	Set the response JSON. ACK, RESULT, or FULL; MARKET and LIMIT order types default to FULL, all other orders default to ACK.
 *		recvWindow		  [LONG]	  (NOT MANDATORY)
 *		timestamp		  [LONG]	  (MANDATORY)
 * 
 * Additional mandatory parameters based on type:
 *		LIMIT				timeInForce, quantity, price
 *		MARKET				quantity
 *		STOP_LOSS			quantity, stopPrice
 *		STOP_LOSS_LIMIT		timeInForce, quantity, price, stopPrice
 *		TAKE_PROFIT			quantity, stopPrice
 *		TAKE_PROFIT_LIMIT	timeInForce, quantity, price, stopPrice
 *		LIMIT_MAKER			quantity, price
 *
 * Response:
	{
	  "symbol": "BTCUSDT",
	  "orderId": 28,
	  "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
	  "transactTime": 1507725176595,
	  "price": "1.00000000",
	  "origQty": "10.00000000",
	  "executedQty": "10.00000000",
	  "cummulativeQuoteQty": "10.00000000",
	  "status": "FILLED",
	  "timeInForce": "GTC",
	  "type": "MARKET",
	  "side": "SELL"
	}
 */
async function postOrder(symbol, side, type, quantity, timestamp, price=null, timeInForce=null, newClientORderId=null, stopPrice=null, icebergQty=null, newOrderRespType=null, recvWindow=null) {
	try {
		let params = generateUrl(getArgs(postTestOrder), [...arguments]);
		const { data } = await axios.post(NEW_ORDER, generateBodyWithSig(params, generateSig(params)), header);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}


/*
 *
 * postTestOrder
 * Same as above but is just a test order
 *
 * Response: {}
 */
async function postTestOrder(symbol, side, type, quantity, timestamp, price=null, timeInForce=null, newClientORderId=null, stopPrice=null, icebergQty=null, newOrderRespType=null, recvWindow=null) {
	try {
		let params = generateUrl(getArgs(postTestOrder), [...arguments]);
		const { data } = await axios.post(NEW_ORDER_TEST, generateBodyWithSig(params, generateSig(params)), header);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}

module.exports = {
	postOrder,
	postTestOrder
}