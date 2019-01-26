require("../../secrets.js")
const axios = require('axios');
const { generateParams, generateUrl, generateBodyWithSig, getArgs, generateSig } = require('../utils');
const header = require('../config');
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
async function withdrawAsset(
								asset,
								address,
								amount,
								timestamp,
								addressTag=null,
								name=null,
								recvWindow=null
							) 
{
	try {
		let params = generateUrl(getArgs(withdrawAsset), [...arguments]);
		const { data } = await axios.post(WITHDRAW, generateBodyWithSig(params, generateSig(params)), header);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}


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
async function getDepositHistory(
									timestamp,
									asset=null,
									status=null,
									startTime=null,
									endTime=null,
									recvWindow=null
								) 
{
	try {
		let params = generateUrl(getArgs(getDepositHistory), [...arguments]);
		const bodyWithSig = generateBodyWithSig(params, generateSig(params));
		const { data } = await axios.get(`${DEPOSIT_HISTORY}?${bodyWithSig}`, header);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}

getDepositHistory(Date.now());
