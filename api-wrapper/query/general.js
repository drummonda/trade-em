const axios = require('axios');
const { GET: 
		{ 	
			PING,
			TIME,
			EXCHANGE_INFO
		}
	} = require('../endpoints');

/*
 * Create a simple get query that requires no parameters
 */
const simpleGetQuery = endPoint => async () => {
	const { data } = await axios.get(endPoint);
	console.log("data", data);
}

// GENERAL ENDPOINTS

/*
 *
 * pingServer
 * Ping the Binance Server to test connectivity
 * Parameters: NONE
 * 
 */
const pingServer = simpleGetQuery(PING);

/*
 *
 * getServerTime
 * Test connectivity to the Rest API and get the current server time.
 * Parameters: NONE
 * 
 */
const getServerTime = simpleGetQuery(TIME);

/*
 *
 * getExchangeInfo
 * Current exchange trading rules and symbol information
 * Parameters: NONE
 * 
 */
const getExchangeInfo = simpleGetQuery(EXCHANGE_INFO);


module.exports = {
	pingServer,
	getServerTime,
	getExchangeInfo
}