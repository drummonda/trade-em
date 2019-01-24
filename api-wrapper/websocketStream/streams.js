const axios = require('axios');
const WebSocket = require('ws');
const initializeConnection = require('./config');
const generateStreamName = require('./utils');
const { 
		STREAM: {
			BASE,
			AGG_TRADE,
			TRADE,
			KLINE,
			MINI,
			ALL_MINI,
			TICKER,
			ALL_TICKER,
			PARTIAL_BOOK_DEPTH,
			DIFF_DEPTH
		} 
} = require('../endpoints');


/*
 * aggregateTradeStream
 * The Aggregate Trade Streams push trade information that is aggregated for a single taker order.
 * Stream Name: <symbol>@aggTrade
 * 
 * Payload:
 * {
	  "e": "aggTrade",  // Event type
	  "E": 123456789,   // Event time
	  "s": "BNBBTC",    // Symbol
	  "a": 12345,       // Aggregate trade ID
	  "p": "0.001",     // Price
	  "q": "100",       // Quantity
	  "f": 100,         // First trade ID
	  "l": 105,         // Last trade ID
	  "T": 123456785,   // Trade time
	  "m": true,        // Is the buyer the market maker?
	  "M": true         // Ignore
 *	}
 */
async function openAggTradeStream(symbol) {
	const ws = new WebSocket(AGG_TRADE(symbol));
	initializeConnection(ws);
}


/*
 * createtradeStream
 * The Trade Streams push raw trade information; each trade has a unique buyer and seller.
 * Stream Name: <symbol>@trade
 * 
 * Payload:
 * {
	  "e": "trade",     // Event type
	  "E": 123456789,   // Event time
	  "s": "BNBBTC",    // Symbol
	  "t": 12345,       // Trade ID
	  "p": "0.001",     // Price
	  "q": "100",       // Quantity
	  "b": 88,          // Buyer order ID
	  "a": 50,          // Seller order ID
	  "T": 123456785,   // Trade time
	  "m": true,        // Is the buyer the market maker?
	  "M": true         // Ignore
 *	}
 */
async function openTradeStream(symbol) {
	const ws = new WebSocket(TRADE(symbol));
	initializeConnection(ws);
}


/*
 * openKlineStream
 * The Kline/Candlestick Stream push updates to the current klines/candlestick every second.
 * Stream Name: <symbol>@kline_<interval>
 * 
 * Payload:
 * {
	  "e": "kline",     // Event type
	  "E": 123456789,   // Event time
	  "s": "BNBBTC",    // Symbol
	  "k": {
	    "t": 123400000, // Kline start time
	    "T": 123460000, // Kline close time
	    "s": "BNBBTC",  // Symbol
	    "i": "1m",      // Interval
	    "f": 100,       // First trade ID
	    "L": 200,       // Last trade ID
	    "o": "0.0010",  // Open price
	    "c": "0.0020",  // Close price
	    "h": "0.0025",  // High price
	    "l": "0.0015",  // Low price
	    "v": "1000",    // Base asset volume
	    "n": 100,       // Number of trades
	    "x": false,     // Is this kline closed?
	    "q": "1.0000",  // Quote asset volume
	    "V": "500",     // Taker buy base asset volume
	    "Q": "0.500",   // Taker buy quote asset volume
	    "B": "123456"   // Ignore
	  }
 *	}
 */
async function openKlineStream(symbol, interval) {
	const ws = new WebSocket(KLINE(symbol, interval));
	initializeConnection(ws);
}

openAggTradeStream('bnbbtc');

module.exports = {
	openAggTradeStream,
	openTradeStream
}
