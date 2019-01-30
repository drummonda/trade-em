const WebSocket = require('ws');
/*
 * Initialize a WebSocket connection
 */
const initializeConnection = (ws, emitter, event) => {
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
		// console.log("fuck yeah we got some data", parsed);
		emitter.emit(event, JSON.parse(data));
	});
}

/*
 * Generate a websocket connection
 */
const generateStream = (emitter, event, TYPE, ...args) => {
	const ws = new WebSocket(TYPE(...args));
	initializeConnection(ws, emitter, event);
}

module.exports = {
	initializeConnection,
	generateStream
}