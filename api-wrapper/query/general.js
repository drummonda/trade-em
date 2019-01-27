const axios = require('axios');
const { request } = require('../utils');
const { GET: 
		{ 	
			PING,
			TIME,
			EXCHANGE_INFO
		}
	} = require('../endpoints');

// GENERAL ENDPOINTS

/*
 *
 * pingServer
 * Ping the Binance Server to test connectivity
 * Parameters: NONE
 * 
 */
const pingServer = () => request(PING, 'get');

/*
 *
 * getServerTime
 * Test connectivity to the Rest API and get the current server time.
 * Parameters: NONE
 * 
 */
const getServerTime = () => request(TIME, 'get');


/*
 *
 * getExchangeInfo
 * Current exchange trading rules and symbol information
 * Parameters: NONE
 * 
 */
const getExchangeInfo = () => request(EXCHANGE_INFO, 'get');


module.exports = {
	pingServer,
	getServerTime,
	getExchangeInfo
}