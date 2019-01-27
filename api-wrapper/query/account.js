require("../../secrets.js")
const { headers } = require('../config');
const { request } = require('../utils');
const { GET: 
		{ 	
			ACCOUNT_INFO,
			ACCOUNT_TRADE_LIST
		}
	} = require('../endpoints');

// ACCOUNT DATA ENDPOINTS

/*
 *
 * getAccountInfo
 * Get current account information.
 * Parameters:
 * 		Name		Type	Mandatory
 *		recvWindow	LONG	NO	
 *		timestamp	LONG	YES
 * 
 * Response:
	{
	  "makerCommission": 15,
	  "takerCommission": 15,
	  "buyerCommission": 0,
	  "sellerCommission": 0,
	  "canTrade": true,
	  "canWithdraw": true,
	  "canDeposit": true,
	  "updateTime": 123456789,
	  "balances": [
	    {
	      "asset": "BTC",
	      "free": "4723846.89208129",
	      "locked": "0.00000000"
	    },
	    {
	      "asset": "LTC",
	      "free": "4763368.68006011",
	      "locked": "0.00000000"
	    }
	  ]
	}
 */
const getAccountInfo = params => request(ACCOUNT_INFO, 'get', params, headers, true)


/*
 *
 * getAccountTradeList
 * Get trades for a specific account and symbol.
 *
 * Parameters:
 * 		Name		Type	Mandatory
 *		symbol		STRING	YES	
 *		startTime	LONG	NO	
 *		endTime		LONG	NO	
 *		fromId		LONG	NO			TradeId to fetch from. Default gets most recent trades.
 *		limit		INT		NO			Default 500; max 1000.
 *		recvWindow	LONG	NO	
 *		timestamp	LONG	YES
 * 
 * If fromId is set, it will get orders >= that fromId. Otherwise most recent orders are returned
 *
 * Response:
	[
	  {
	    "symbol": "BNBBTC",
	    "id": 28457,
	    "orderId": 100234,
	    "price": "4.00000100",
	    "qty": "12.00000000",
	    "commission": "10.10000000",
	    "commissionAsset": "BNB",
	    "time": 1499865549590,
	    "isBuyer": true,
	    "isMaker": false,
	    "isBestMatch": true
	  }
	]
 */
const getAccountTradeList = params => request(ACCOUNT_TRADE_LIST, 'get', params, headers, true);


module.exports = {
	getAccountInfo,
	getAccountTradeList
}