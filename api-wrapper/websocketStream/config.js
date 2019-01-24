/*
 * Initialize a WebSocket connection
 */
module.exports = ws => {
	// what to do on opening a socket connection
	ws.on('open', () => {
		console.log("Someone shook my hand");
	});

	// what to do when there is a socket error
	ws.on('close', () => {
		console.log("Ouch that burns, no more socket");
	});

	// what was the error, if any
	ws.on('error', err => {
		console.log("error was", error);
	})

	// what to do when the socket receives a message
	ws.on('message',  data => {
		console.log("fuck yeah we got some data", data);
	});
}