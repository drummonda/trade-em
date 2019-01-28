const WebSocket = require('ws');
/*
 * Initialize a WebSocket connection
 */
const initializeConnection = ws => {
	// what to do on opening a socket connection
	ws.on('open', () => {
		console.log("Someone shook my hand");
	});

	// what to do when there is a socket error
	ws.on('close', () => {
		console.log("Ouchie that burns, no more socket");
	});

	// what was the error, if any
	ws.on('error', err => {
		console.log("error was", err);
	})

	// what to do when the socket receives a message
	ws.on('message',  data => {
		const parsed = JSON.parse(data);
		console.log("fuck yeah we got some data", parsed);
	});
}

/*
 * Generate a websocket connection
 */
const generateStream = (TYPE, ...args) => {
	const ws = new WebSocket(TYPE(...args));
	initializeConnection(ws);
	return ws;
}

module.exports = {
	initializeConnection,
	generateStream
}