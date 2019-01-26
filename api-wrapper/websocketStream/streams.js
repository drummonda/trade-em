const axios = require('axios');
const { initializeConnection, generateStream } = require('./config');
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
 * Generate a new websocket based on a url, and initialize it
 */

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
const openAggTradeStream = symbol => generateStream(AGG_TRADE, symbol);


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
const openTradeStream = symbol => generateStream(TRADE, symbol);


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
const openKlineStream = (symbol, interval) => generateStream(KLINE, symbol, interval)


/*
 * openMiniTickerStream
 * 24hr rolling window mini-ticker statistics for a single symbol pushed every second. 
 * These are NOT the statistics of the UTC day, but a 24hr rolling window from requestTime to 24hrs before.
 * Stream Name: <symbol>@miniTicker
 * 
 * Payload:
 * {
    "e": "24hrMiniTicker",  // Event type
    "E": 123456789,         // Event time
    "s": "BNBBTC",          // Symbol
    "c": "0.0025",          // Close price
    "o": "0.0010",          // Open price
    "h": "0.0025",          // High price
    "l": "0.0010",          // Low price
    "v": "10000",           // Total traded base asset volume
    "q": "18"               // Total traded quote asset volume
 * }
 */
const openMiniTickerStream = symbol => generateStream(MINI, symbol);




/*
 * openAllMarketMiniTickerStream
 * 24hr rolling window mini-ticker statistics for all symbols that changed in an array pushed every second. 
 * These are NOT the statistics of the UTC day, but a 24hr rolling window from requestTime to 24hrs before.
 * Stream Name: !miniTicker@arr
 * 
 * Payload:
 * {
    "e": "24hrMiniTicker",  // Event type
    "E": 123456789,         // Event time
    "s": "BNBBTC",          // Symbol
    "c": "0.0025",          // Close price
    "o": "0.0010",          // Open price
    "h": "0.0025",          // High price
    "l": "0.0010",          // Low price
    "v": "10000",           // Total traded base asset volume
    "q": "18"               // Total traded quote asset volume
 * }
 */
const openAllMarketMiniTickerStream = () => generateStream(ALL_MINI);


/*
 * openTickerStream
 * 24hr rollwing window ticker statistics for a single symbol pushed every second. 
 * These are NOT the statistics of the UTC day, but a 24hr rolling window from requestTime to 24hrs before.
 * Stream Name: <symbol>@ticker
 * 
 * Payload:
 * {
	  "e": "24hrTicker",  // Event type
	  "E": 123456789,     // Event time
	  "s": "BNBBTC",      // Symbol
	  "p": "0.0015",      // Price change
	  "P": "250.00",      // Price change percent
	  "w": "0.0018",      // Weighted average price
	  "x": "0.0009",      // First trade(F)-1 price (first trade before the 24hr rolling window)
	  "c": "0.0025",      // Last price
	  "Q": "10",          // Last quantity
	  "b": "0.0024",      // Best bid price
	  "B": "10",          // Best bid quantity
	  "a": "0.0026",      // Best ask price
	  "A": "100",         // Best ask quantity
	  "o": "0.0010",      // Open price
	  "h": "0.0025",      // High price
	  "l": "0.0010",      // Low price
	  "v": "10000",       // Total traded base asset volume
	  "q": "18",          // Total traded quote asset volume
	  "O": 0,             // Statistics open time
	  "C": 86400000,      // Statistics close time
	  "F": 0,             // First trade ID
	  "L": 18150,         // Last trade Id
	  "n": 18151          // Total number of trades
 *	}
 */
const openTickerStream = symbol => generateStream(TICKER, symbol);


/*
 * openAllMarketTickerStream
 * 24hr rolling window ticker statistics for all symbols that changed in an array pushed every second. 
 * These are NOT the statistics of the UTC day, but a 24hr rolling window from requestTime to 24hrs before.
 * Stream Name: !ticker@arr
 * 
 * Payload:
 * {
	  "e": "24hrTicker",  // Event type
	  "E": 123456789,     // Event time
	  "s": "BNBBTC",      // Symbol
	  "p": "0.0015",      // Price change
	  "P": "250.00",      // Price change percent
	  "w": "0.0018",      // Weighted average price
	  "x": "0.0009",      // First trade(F)-1 price (first trade before the 24hr rolling window)
	  "c": "0.0025",      // Last price
	  "Q": "10",          // Last quantity
	  "b": "0.0024",      // Best bid price
	  "B": "10",          // Best bid quantity
	  "a": "0.0026",      // Best ask price
	  "A": "100",         // Best ask quantity
	  "o": "0.0010",      // Open price
	  "h": "0.0025",      // High price
	  "l": "0.0010",      // Low price
	  "v": "10000",       // Total traded base asset volume
	  "q": "18",          // Total traded quote asset volume
	  "O": 0,             // Statistics open time
	  "C": 86400000,      // Statistics close time
	  "F": 0,             // First trade ID
	  "L": 18150,         // Last trade Id
	  "n": 18151          // Total number of trades
 *	}
 */
const openAllMarketTickerStream = () => generateStream(ALL_TICKER);


/*
 * openPartialBookDepthStream
 * Top <levels> bids and asks, pushed every second. Valid <levels> are 5, 10, or 20.
 * Stream Name:  <symbol>@depth<levels>
 * 
 * Payload:
 * {
	  "lastUpdateId": 160,  // Last update ID
	  "bids": [             // Bids to be updated
	    [
	      "0.0024",         // Price level to be updated
	      "10",             // Quantity
	      []                // Ignore
	    ]
	  ],
	  "asks": [             // Asks to be updated
	    [
	      "0.0026",         // Price level to be updated
	      "100",            // Quantity
	      []                // Ignore
	    ]
	  ]
 *	}
 */
const openPartialBookDepthStream = (symbol, levels) => generateStream(PARTIAL_BOOK_DEPTH, symbol, levels);


/*
 * openDiffDepthStream
 * Order book price and quantity depth updates used to locally manage an order book pushed every second.
 * Stream Name:  <symbol>@depth
 * 
 * Payload:
 *  {
	  "e": "depthUpdate", // Event type
	  "E": 123456789,     // Event time
	  "s": "BNBBTC",      // Symbol
	  "U": 157,           // First update ID in event
	  "u": 160,           // Final update ID in event
	  "b": [              // Bids to be updated
	    [
	      "0.0024",       // Price level to be updated
	      "10",
	      []              // Ignore
	    ]
	  ],
	  "a": [              // Asks to be updated
	    [
	      "0.0026",       // Price level to be updated
	      "100",          // Quantity
	      []              // Ignore
	    ]
	  ]
 *	}
 */
const openDiffDepthStream = symbol => generateStream(DIFF_DEPTH, symbol);


module.exports = {
	openAggTradeStream,
	openTradeStream,
	openKlineStream,
	openMiniTickerStream,
	openAllMarketMiniTickerStream,
	openTickerStream,
	openAllMarketTickerStream,
	openPartialBookDepthStream,
	openDiffDepthStream
}
