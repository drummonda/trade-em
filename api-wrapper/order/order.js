require("../../secrets.js")
const { request } = require('../utils');
const { headers } = require('../config');
const { 
		orderTypes: { 
			LIMIT,
			MARKET
		}, 
		orderSide: { 
			BUY 
		},
		symbols: { 
			BNBBTC 
		} 
	} = require('../enums');
const { 
		POST: { 	
			NEW_ORDER,
			NEW_ORDER_TEST
		},
		GET: {
			QUERY_ORDER,
			OPEN_ORDERS,
			ALL_ORDERS
		},
		DELETE: {
			DELETE_ORDER
		}
	} = require('../endpoints');


// ACCOUNT ENDPOINTS

/*
 *
 * openOrder
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
const openOrder = params => request(NEW_ORDER, 'post', order, headers, true)


/*
 *
 * openTestOrder
 * Same as above but is just a test order
 *
 * Response: {}
 */
const openTestOrder = async params => request(NEW_ORDER_TEST, 'post', params, headers, true);


/*
 *
 * queryOpenOrder
 * Check an order's status.
 * Parameters:
 *	 	Name				Type		Mandatory
 *		symbol				STRING		YES	
 *		orderId				LONG		YES	
 *		origClientOrderId	STRING		NO	
 *		recvWindow			LONG		NO	
 *		timestamp			LONG		YES
 *
 * Either orderId or origClientOrderId must be sent.
 * For some historical orders cummulativeQuoteQty will be < 0, meaning the data is not available at this time.
 *
 * Response:
 	{
	  "symbol": "LTCBTC",
	  "orderId": 1,
	  "clientOrderId": "myOrder1",
	  "price": "0.1",
	  "origQty": "1.0",
	  "executedQty": "0.0",
	  "cummulativeQuoteQty": "0.0",
	  "status": "NEW",
	  "timeInForce": "GTC",
	  "type": "LIMIT",
	  "side": "BUY",
	  "stopPrice": "0.0",
	  "icebergQty": "0.0",
	  "time": 1499827319559,
	  "updateTime": 1499827319559,
	  "isWorking": true
	}
 */
const queryOpenOrder = async params => request(QUERY_ORDER, 'get', params, headers, true);



/*
 *
 * cancelOpenOrder
 * Check an order's status.
 * Parameters:
 *	 	Name				Type		Mandatory
 *		symbol				STRING		YES	
 *		orderId				LONG		YES	
 *		origClientOrderId	STRING		NO
 * 		newClientOrderId	STRING		NO		Used to uniquely identify this cancel. Automatically generated by default.
 *		recvWindow			LONG		NO	
 *		timestamp			LONG		YES
 *
 * Either orderId or origClientOrderId must be sent.
 *
 * Response:
	{
	  "symbol": "LTCBTC",
	  "orderId": 28,
	  "origClientOrderId": "myOrder1",
	  "clientOrderId": "cancelMyOrder1",
	  "transactTime": 1507725176595,
	  "price": "1.00000000",
	  "origQty": "10.00000000",
	  "executedQty": "8.00000000",
	  "cummulativeQuoteQty": "8.00000000",
	  "status": "CANCELED",
	  "timeInForce": "GTC",
	  "type": "LIMIT",
	  "side": "SELL"
	}
 */
const cancelOpenOrder = async params => request(DELETE_ORDER, 'delete', params, headers, true);


/*
 *
 * queryAllOpenOrders
 * Get all open orders on a symbol. Careful when accessing this with no symbol.
 * Weight: 1 for a single symbol; 40 when the symbol parameter is omitted

 * Parameters:
 *	 	Name				Type		Mandatory
 *		symbol				STRING		NO	
 *		recvWindow			LONG		NO	
 *		timestamp			LONG		YES
 *
 * If the symbol is not sent, orders for all symbols will be returned in an array.
 * When all symbols are returned, the number of requests counted against the rate limiter is equal to the number of symbols currently trading on the exchange.
 *
 * Response:
	[
	  {
	    "symbol": "LTCBTC",
	    "orderId": 1,
	    "clientOrderId": "myOrder1",
	    "price": "0.1",
	    "origQty": "1.0",
	    "executedQty": "0.0",
	    "cummulativeQuoteQty": "0.0",
	    "status": "NEW",
	    "timeInForce": "GTC",
	    "type": "LIMIT",
	    "side": "BUY",
	    "stopPrice": "0.0",
	    "icebergQty": "0.0",
	    "time": 1499827319559,
	    "updateTime": 1499827319559,
	    "isWorking": true
	  }
	]
 */
const queryAllOpenOrders = async params => request(OPEN_ORDERS, 'get', params, headers, true);
// 	try {
// 		const { data } = await axios.get(generateUrlWithSig(OPEN_ORDERS, queryAllOpenOrders, [...arguments]), header);
// 		console.log("data", data);
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// }


/*
 *
 * queryAllOrders
 * Get all account orders; active, canceled, or filled.
 *
 * Parameters:
 *	 	Name			Type	Mandatory
 *		symbol			STRING	YES	
 *		orderId			LONG	NO	
 *		startTime		LONG	NO	
 *		endTime			LONG	NO	
 *		limit			INT		NO			Default 500; max 1000.
 *		recvWindow		LONG	NO	
 *		timestamp		LONG	YES
 *
 * If orderId is set, it will get orders >= that orderId. Otherwise most recent orders are returned.
 * For some historical orders cummulativeQuoteQty will be < 0, meaning the data is not available at this time.
 *
 * Response:
	[
	  {
	    "symbol": "LTCBTC",
	    "orderId": 1,
	    "clientOrderId": "myOrder1",
	    "price": "0.1",
	    "origQty": "1.0",
	    "executedQty": "0.0",
	    "cummulativeQuoteQty": "0.0",
	    "status": "NEW",
	    "timeInForce": "GTC",
	    "type": "LIMIT",
	    "side": "BUY",
	    "stopPrice": "0.0",
	    "icebergQty": "0.0",
	    "time": 1499827319559,
	    "updateTime": 1499827319559,
	    "isWorking": true
	  }
	]
 */
const queryAllOrders = params => request(ALL_ORDERS, 'get', params, headers, true);



module.exports = {
	openOrder,
	openTestOrder,
	queryOpenOrder,
	cancelOpenOrder,
	queryAllOpenOrders,
	queryAllOrders
}