const EventEmitter = require('events');
const checkProfit = require('./currencyPairs');

const marketDataEmitter = new EventEmitter();
// Only do this once so we don't loop forever
marketDataEmitter.once('newListener', (event, listener) => {
	console.log("listener added!");
});

marketDataEmitter.on('update', data => {
	console.log('data', data);
});

marketDataEmitter.on('TICKER', data => {
	console.log("symbol", data["s"], "price", data["c"]);
	checkProfit(data["s"], data["c"]);
});

marketDataEmitter.on('TRADE', data => {
	console.log('----new trade stream data----\n', data);
});



module.exports = marketDataEmitter;