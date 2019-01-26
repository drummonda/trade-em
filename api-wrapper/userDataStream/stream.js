require("../../secrets.js")
const axios = require('axios');
const header = require('../config');
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
async function startUserDataStream() {
	try {
		const { data: { listenKey } } = await axios.post(NEW_USER_DATA_STREAM, null, header);
		console.log('listenKey', listenKey);
		return listenKey;
	} catch(err) {
		console.error(err.message);
	}
}


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
async function keepaliveUserDataStream(listenKey) {
	try {
		const { data } = await axios.put(KEEPALIVE_USER_DATA_STREAM, `listenKey=${listenKey}`, header);
		console.log('data stream was kept alive', data);
	} catch(err) {
		console.error(err.message);
	}
}


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
async function closeUserDataStream(listenKey) {
	try {
		const { data } = await axios.delete(CLOSE_USER_DATA_STREAM, { data: `listenKey=${listenKey}`, headers: header.headers });
		console.log('data stream was closed', data);
	} catch(err) {
		console.error(err);
	}
}


/*
 *
 * testUserDataStream
 * Make sure everything works as expected
 * 
 */

async function testUserDataStream() {
	const listenKey = await startUserDataStream();
	console.log("got the key", listenKey);
	await keepaliveUserDataStream(listenKey);
	await closeUserDataStream(listenKey);
}


module.exports = {
	startUserDataStream,
	keepaliveUserDataStream,
	closeUserDataStream
}