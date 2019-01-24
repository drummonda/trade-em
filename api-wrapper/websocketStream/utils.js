/*
 * Create a trade stream endpoint for the websocket
 */
module.exports = (socket, symbol, name) => {
	return `${socket}/${symbol}@${name}`;
}