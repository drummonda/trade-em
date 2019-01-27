require("../../secrets.js")
const axios = require('axios');
const { headers } = require('../config');
const { request } = require('../utils');
const { POST: { NEW_USER_DATA_STREAM },
		PUT: { KEEPALIVE_USER_DATA_STREAM },
		DELETE: { CLOSE_USER_DATA_STREAM }
	} = require('../endpoints');

// USER DATA STREAM ENDPOINTS

/*
 *
 * startUserDataStream
 * Start a new user data stream. The stream will close after 60 minutes unless a keepalive is sent.
 * Parameters: NONE
 *
 *	Response:
	{
	  "listenKey": "pqia91ma19a5s61cv6a81va65sdf19v8a65a1a5s61cv6a81va65sdf19v8a65a1"
	}
 *
 */
const startUserDataStream = () => request(NEW_USER_DATA_STREAM, 'post', {}, headers)


/*
 *
 * keepaliveUserDataStream
 * Keepalive a user data stream to prevent a time out. User data streams will close after 60 minutes. It's recommended to send a ping about every 30 minutes.
 *
 *	Parameters:
 * 	Name		Type	Mandatory
 *	listenKey	STRING	YES
 * 
 * Response:
 * 	{}
 */
const keepaliveUserDataStream = listenKey => request(KEEPALIVE_USER_DATA_STREAM, 'put', { listenKey }, headers);
// 	try {
// 		const { data } = await axios.put(KEEPALIVE_USER_DATA_STREAM, `listenKey=${listenKey}`, header);
// 		console.log('data stream was kept alive', data);
// 	} catch(err) {
// 		console.error(err.message);
// 	}
// }


/*
 *
 * closeUserDataStream
 * Close out a user data stream.
 *	
 * Parameters:
 * 	Name		Type	Mandatory
 *	listenKey	STRING	YES
 * 
 * Response:
 * 	{}
 * 
 */
const closeUserDataStream = listenKey => request(CLOSE_USER_DATA_STREAM, 'delete', { listenKey }, headers);
// 	try {
// 		const { data } = await axios.delete(CLOSE_USER_DATA_STREAM, { data: `listenKey=${listenKey}`, headers: header.headers });
// 		console.log('data stream was closed', data);
// 	} catch(err) {
// 		console.error(err);
// 	}
// }


/*
 *
 * testUserDataStream
 * Make sure everything works as expected
 * 
 */

async function testUserDataStream() {
	const {listenKey} = await startUserDataStream();
	await keepaliveUserDataStream(listenKey);
	await closeUserDataStream(listenKey);
}


module.exports = {
	startUserDataStream,
	keepaliveUserDataStream,
	closeUserDataStream
}