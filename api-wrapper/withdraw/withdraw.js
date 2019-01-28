require("../../secrets.js")
const axios = require('axios');
const { request } = require('../utils');
const { headers } = require('../config');
const { symbols: { BNBBTC } } = require('../enums');
const { 
		POST: { 	
			WITHDRAW,
			SUB_ACCOUNT_TRANSFER
		},
		GET: {
			DEPOSIT_HISTORY,
			WITHDRAW_HISTORY,
			DEPOSIT_ADDRESS,
			ACCOUNT_STATUS,
			SYSTEM_STATUS,
			API_TRADING_STATUS,
			DUST_LOG,
			TRADE_FEE,
			ASSET_DETAIL,
			SUB_ACCOUNT_LIST,
			SUB_ACCOUNT_TRANSFER_HISTORY
		}
	} = require('../endpoints');

// ACCOUNT ENDPOINTS

/*
 * withdrawAsset
 * Submit a withdraw request
 * Parameters:
 * 		Name		Type	Mandatory
 *		asset		STRING	YES	
 *		address		STRING	YES	
 *		amount		DECIMAL	YES	
 *		addressTag	STRING	NO			Secondary address identifier for coins like XRP,XMR etc.
 *		name		STRING	NO			Description of the address
 *		recvWindow	LONG	NO	
 *		timestamp	LONG	YES
 * 
 * Response:
	{
	    "msg": "success",
	    "success": true,
	    "id":"7213fea8e94b4a5593d507237e5a555b"
	}
 */
const withdrawAsset = params => request(WITHDRAW, 'post', params, headers, true);


/*
 * getDepositHistory
 * Fetch deposit history.
 * Parameters:
 * 		Name		Type	Mandatory
 *		asset		STRING	NO	
 *		status		INT		NO			0(0:pending,1:success)
 *		startTime	LONG	NO	
 *		endTime		LONG	NO	
 *		recvWindow	LONG	NO	
 *		timestamp	LONG	YES
 * 
 * Response:
	{
	    "depositList": [
	        {
	            "insertTime": 1508198532000,
	            "amount": 0.04670582,
	            "asset": "ETH",
	            "address": "0x6915f16f8791d0a1cc2bf47c13a6b2a92000504b",
	            "txId": "0xdf33b22bdb2b28b1f75ccd201a4a4m6e7g83jy5fc5d5a9d1340961598cfcb0a1",
	            "status": 1
	        },
	        {
	            "insertTime": 1508298532000,
	            "amount": 1000,
	            "asset": "XMR",
	            "address": "463tWEBn5XZJSxLU34r6g7h8jtxuNcDbjLSjkn3XAXHCbLrTTErJrBWYgHJQyrCwkNgYvyV3z8zctJLPCZy24jvb3NiTcTJ",
	            "addressTag": "342341222",
	            "txId": "b3c6219639c8ae3f9cf010cdc24fw7f7yt8j1e063f9b4bd1a05cb44c4b6e2509",
	            "status": 1
	        }
	    ],
	    "success": true
	}
 */
const getDepositHistory = (params={}) => request(DEPOSIT_HISTORY, 'get', params, headers, true);


/*
 * getWithdrawHistory
 * Fetch deposit history.
 * Parameters:
 * 		Name		Type	Mandatory
 *		asset		STRING	NO	
 *		status		INT		NO				0(0:Email Sent,1:Cancelled 2:Awaiting Approval 3:Rejected 4:Processing 5:Failure 6Completed)
 *		startTime	LONG	NO	
 *		endTime		LONG	NO	
 *		recvWindow	LONG	NO	
 *		timestamp	LONG	YES
 * 
 * Response:
	{
	    "withdrawList": [
	        {
	            "id":"7213fea8e94b4a5593d507237e5a555b",
	            "amount": 1,
	            "address": "0x6915f16f8791d0a1cc2bf47c13a6b2a92000504b",
	            "asset": "ETH",
	            "txId": "0xdf33b22bdb2b28b1f75ccd201a4a4m6e7g83jy5fc5d5a9d1340961598cfcb0a1",
	            "applyTime": 1508198532000,
	            "status": 4
	        },
	        {
	            "id":"7213fea8e94b4a5534ggsd237e5a555b",
	            "amount": 1000,
	            "address": "463tWEBn5XZJSxLU34r6g7h8jtxuNcDbjLSjkn3XAXHCbLrTTErJrBWYgHJQyrCwkNgYvyV3z8zctJLPCZy24jvb3NiTcTJ",
	            "addressTag": "342341222",
	            "txId": "b3c6219639c8ae3f9cf010cdc24fw7f7yt8j1e063f9b4bd1a05cb44c4b6e2509",
	            "asset": "XMR",
	            "applyTime": 1508198532000,
	            "status": 4
	        }
	    ],
	    "success": true
	}
 */
const getWithdrawalHistory = (params={}) => request(WITHDRAW_HISTORY, 'get', params, headers, true);


/*
 * getDepositAddress
 * Fetch deposit address.
 * Parameters:
 * 		Name		Type	Mandatory
 *		asset		STRING	YES	
 *		status		INT		NO		
 *		recvWindow	LONG	NO	
 *		timestamp	LONG	YES
 * 
 * Response:
	{
	    "address": "0x6915f16f8791d0a1cc2bf47c13a6b2a92000504b",
	    "success": true,
	    "addressTag": "1231212",
	    "asset": "BNB"
	}
 */
const getDepositAddress = params => request(DEPOSIT_ADDRESS, 'get', params, headers, true);


/*
 * getAccountStatus
 * Fetch account status detail.
 * Parameters:
 * 		Name		Type	Mandatory	
 *		recvWindow	LONG	NO	
 *		timestamp	LONG	YES
 * 
 * Response:
	{
	    "msg": "Order failed:Low Order fill rate! Will be reactivated after 5 minutes.",
	    "success": true,
	    "objs": [
	        "5"
	    ]
	}
 */
const getAccountStatus = (params={}) => request(ACCOUNT_STATUS, 'get', params, headers, true);



/*
 * getSystemStatus
 * Fetch system status.
 * Parameters: NONE
 * 
 * Response:
	{ 
	    "status": 0,              // 0: normal，1：system maintenance
	    "msg": "normal"           // normal or system maintenance
	}
 */
const getSystemStatus = () => request(SYSTEM_STATUS, 'get', {}, headers, true);


/*
 * getAPITradingStatus
 * Fetch account api trading status detail.
 * Parameters:
 * 		Name		Type	Mandatory	
 *		recvWindow	LONG	NO	
 *		timestamp	LONG	YES
 * 
 * Response:
	{
	    "success": true,     // Query result
	    "status": {          // API trading status detail
	        "isLocked": false,   // API trading function is locked or not
	        "plannedRecoverTime": 0,  // If API trading function is locked, this is the planned recover time
	        "triggerCondition": { 
	            "GCR": 150,  // Number of GTC orders
	            "IFER": 150, // Number of FOK/IOC orders
	            "UFR": 300   // Number of orders
	        },
	        "indicators": {  // The indicators updated every 30 seconds
	           "BTCUSDT": [  // The symbol
	            {
	            "i": "UFR",  // Unfilled Ratio (UFR)
	            "c": 20,     // Count of all orders
	            "v": 0.05,   // Current UFR value
	            "t": 0.995   // Trigger UFR value
	            },
	            {
	            "i": "IFER", // IOC/FOK Expiration Ratio (IFER)
	            "c": 20,     // Count of FOK/IOC orders
	            "v": 0.99,   // Current IFER value
	            "t": 0.99    // Trigger IFER value
	            },
	            {
	            "i": "GCR",  // GTC Cancellation Ratio (GCR)
	            "c": 20,     // Count of GTC orders
	            "v": 0.99,   // Current GCR value
	            "t": 0.99    // Trigger GCR value
	            }
	            ],
	            "ETHUSDT": [ 
	            {
	            "i": "UFR",
	            "c": 20,
	            "v": 0.05,
	            "t": 0.995
	            },
	            {
	            "i": "IFER",
	            "c": 20,
	            "v": 0.99,
	            "t": 0.99
	            },
	            {
	            "i": "GCR",
	            "c": 20,
	            "v": 0.99,
	            "t": 0.99
	            }
	            ]
	        },
	        "updateTime": 1547630471725   // The query result return time
	    }
	}
 */
const getAPITradingStatus = (params={}) => request(ACCOUNT_STATUS, 'get', params, headers, true);


/*
 * getDustLog
 * Fetch small amounts of assets exchanged BNB records.
 * Parameters:
 * 		Name		Type	Mandatory	
 *		recvWindow	LONG	NO	
 *		timestamp	LONG	YES
 * 
 * Response:
	{
	    "success": true, 
	    "results": {
	        "total": 2,   //Total counts of exchange
	        "rows": [
	            {
	                "transfered_total": "0.00132256",//Total transfered BNB amount for this exchange.
	                "service_charge_total": "0.00002699",   //Total service charge amount for this exchange.
	                "tran_id": 4359321,
	                "logs": [           //Details of  this exchange.
	                    {
	                        "tranId": 4359321,
	                        "serviceChargeAmount": "0.000009",
	                        "uid": "10000015",
	                        "amount": "0.0009",
	                        "operateTime": "2018-05-03 17:07:04",
	                        "transferedAmount": "0.000441",
	                        "fromAsset": "USDT"
	                    },
	                    {
	                        "tranId": 4359321,
	                        "serviceChargeAmount": "0.00001799",
	                        "uid": "10000015",
	                        "amount": "0.0009",
	                        "operateTime": "2018-05-03 17:07:04",
	                        "transferedAmount": "0.00088156",
	                        "fromAsset": "ETH"
	                    }
	                ],
	                "operate_time": "2018-05-03 17:07:04" //The time of this exchange.
	            },
	            {
	                "transfered_total": "0.00058795",
	                "service_charge_total": "0.000012",
	                "tran_id": 4357015,
	                "logs": [       // Details of  this exchange.
	                    {
	                        "tranId": 4357015,
	                        "serviceChargeAmount": "0.00001",
	                        "uid": "10000015",
	                        "amount": "0.001",
	                        "operateTime": "2018-05-02 13:52:24",
	                        "transferedAmount": "0.00049",
	                        "fromAsset": "USDT"
	                    },
	                    {
	                        "tranId": 4357015,
	                        "serviceChargeAmount": "0.000002",
	                        "uid": "10000015",
	                        "amount": "0.0001",
	                        "operateTime": "2018-05-02 13:51:11",
	                        "transferedAmount": "0.00009795",
	                        "fromAsset": "ETH"
	                    }
	                ],
	                "operate_time": "2018-05-02 13:51:11"
	            }
	        ]
	    }
	}
 */
const getDustLog = (params={}) => request(DUST_LOG, 'get', params, headers, true);


/*
 * getTradeFee
 * Fetch trade fee.
 * Parameters:
 * 		Name		Type	Mandatory	
 *		recvWindow	LONG	NO	
 *		timestamp	LONG	YES
 *		symbol		STRING	NO
 * 
 * Response:
	{
		"tradeFee": [{
			"symbol": "ADABNB",
			"maker": 0.9000,
			"taker": 1.0000
		}, {
			"symbol": "BNBBTC",
			"maker": 0.3000,
			"taker": 0.3000
		}],
		"success": true
	}
 */
const getTradeFee = (params={}) => request(TRADE_FEE, 'get', params, headers, true);


/*
 * getAssetDetail
 * Fetch asset detail.
 * Parameters:
 * 		Name		Type	Mandatory	
 *		recvWindow	LONG	NO	
 *		timestamp	LONG	YES
 * 
 * Response:
	{
	    "success": true,
	    "assetDetail": {
	        "CTR": {
	            "minWithdrawAmount": "70.00000000", //min withdraw amount
	            "depositStatus": false,//deposit status
	            "withdrawFee": 35, // withdraw fee
	            "withdrawStatus": true, //withdraw status
	            "depositTip": "Delisted, Deposit Suspended" //reason
	        },
	        "SKY": {
	            "minWithdrawAmount": "0.02000000",
	            "depositStatus": true,
	            "withdrawFee": 0.01,
	            "withdrawStatus": true
	        }	
	    }
	}
 */
const getAssetDetail = (params={}) => request(ASSET_DETAIL, 'get', params, headers, true);


module.exports = {
	withdrawAsset,
	getDepositHistory,
	getWithdrawalHistory,
	getSystemStatus,
	getAccountStatus,
	getDepositAddress,
	getAPITradingStatus,
	getDustLog,
	getTradeFee
}