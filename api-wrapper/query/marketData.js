const axios = require('axios');
const { generateParams, getArgs } = require('../utils');
const { GET: 
		{ 	
			SYMBOL_ORDER_BOOK,
			RECENT_TRADES,
			HISTORICAL_TRADES,
			AGG_TRADES,
			CANDLE_STICK,
			AVG_PRICE,
			TICKER_PRICE_CHANGE,
			SYMBOL_TICKER,
			BOOK_TICKER,
		}
	} = require('../endpoints');
const { candleStickIntervals: { TWO_HOURS } } = require('../enums');

// MARKET DATA ENDPOINTS

/*
 *
 * getOrderBook
 * Get the market depth for a currency pair
 * Parameters:
 * 		symbol [STRING]  (MANDATORY)
 *		limit  [INT]	 (NOT MANDATORY)	Default 100; max 1000. Valid limits:[5, 10, 20, 50, 100, 500, 1000]
 * 
 * Response:
 	{
	  "lastUpdateId": 1027024,
	  "bids": [
	    [
	      "4.00000000",     // PRICE
	      "431.00000000",   // QTY
	      []                // Ignore.
	    ]
	  ],
	  "asks": [
	    [
	      "4.00000200",
	      "12.00000000",
	      []
	    ]
	  ]
	}
 */
async function getOrderBook(symbol, limit=100) {
	try {
		const params = generateParams(getArgs(getOrderBook), [...arguments]);
		const { data } = await axios.get(SYMBOL_ORDER_BOOK, params);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}


/*
 *
 * getRecentTrades
 * Get recent trades (up to last 500).
 * Parameters:
 * 		symbol [STRING]  (MANDATORY)
 *		limit  [INT]	 (NOT MANDATORY)	Default 500; max 1000.
 *
 * Response:
 	[
	  {
	    "id": 28457,
	    "price": "4.00000100",
	    "qty": "12.00000000",
	    "time": 1499865549590,
	    "isBuyerMaker": true,
	    "isBestMatch": true
	  }
	]
 */
async function getRecentTrades(symbol, limit=500) {
	try {
		const params = generateParams(getArgs(getRecentTrades), [...arguments]);
		const { data } = await axios.get(RECENT_TRADES, params);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}


/*
 *
 * getHistoricalTrades
 * Get older trades.
 * Parameters:
 * 		symbol [STRING]  (MANDATORY)
 *		limit  [INT]	 (NOT MANDATORY)	Default 500; max 1000.
 *		fromId [LONG]    (NOT MANDATORY)	TradeId to fetch from. Default gets most recent trades.
 * 
 * Response:
 	[
	  {
	    "id": 28457,
	    "price": "4.00000100",
	    "qty": "12.00000000",
	    "time": 1499865549590,
	    "isBuyerMaker": true,
	    "isBestMatch": true
	  }
	]
 */
async function getHistoricalTrades(symbol, limit=500, fromId=null) {
	try {
		const params = generateParams(getArgs(getHistoricalTrades), [...arguments]);
		const { data } = await axios.get(HISTORICAL_TRADES, params);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}

/*
 *
 * getAggTrades
 * Get compressed, aggregate trades. 
 * Trades that fill at the time, from the same order, with the same price will have the quantity aggregated.
 * Parameters:
 * 		symbol    [STRING]  (MANDATORY)
 *		fromId    [LONG]    (NOT MANDATORY)	ID to get aggregate trades from INCLUSIVE.
 *		startTime [LONG]    (NOT MANDATORY)	Timestamp in ms to get aggregate trades from INCLUSIVE.
 *		endTime   [LONG]    (NOT MANDATORY)	Timestamp in ms to get aggregate trades until INCLUSIVE.
 *		limit     [INT]     (NOT MANDATORY)	Default 500; max 1000.
 * 
 * Response:
 	[
	  {
	    "a": 26129,         // Aggregate tradeId
	    "p": "0.01633102",  // Price
	    "q": "4.70443515",  // Quantity
	    "f": 27781,         // First tradeId
	    "l": 27781,         // Last tradeId
	    "T": 1498793709153, // Timestamp
	    "m": true,          // Was the buyer the maker?
	    "M": true           // Was the trade the best price match?
	  }
	]
 */
async function getAggTrades(symbol, fromId=null, startTime=null, endTime=null, limit=500) {
	try {
		const params = generateParams(getArgs(getAggTrades), [...arguments]);
		const { data } = await axios.get(AGG_TRADES, params);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}


/*
 *
 * getCandlestickData
 * Kline/candlestick bars for a symbol. Klines are uniquely identified by their open time. 
 * Parameters:
 * 		symbol    [STRING]  (MANDATORY)
 *		interval  [ENUM]    (MANDATORY)
 *		startTime [LONG]    (NOT MANDATORY)	Timestamp in ms to get aggregate trades from INCLUSIVE.
 *		endTime   [LONG]    (NOT MANDATORY)	Timestamp in ms to get aggregate trades until INCLUSIVE.
 *		limit     [INT]     (NOT MANDATORY)	Default 500; max 1000.
 * 
 * If startTime and endTime are not sent, the most recent klines are returned.
 *
 * Response:
 	[
	  [
	    1499040000000,      // Open time
	    "0.01634790",       // Open
	    "0.80000000",       // High
	    "0.01575800",       // Low
	    "0.01577100",       // Close
	    "148976.11427815",  // Volume
	    1499644799999,      // Close time
	    "2434.19055334",    // Quote asset volume
	    308,                // Number of trades
	    "1756.87402397",    // Taker buy base asset volume
	    "28.46694368",      // Taker buy quote asset volume
	    "17928899.62484339" // Ignore.
	  ]
	]
 */
async function getCandlestickData(symbol, interval=TWO_HOURS, startTime=null, endTime=null, limit=500) {
	try {
		const params = generateParams(getArgs(getCandlestickData), [...arguments]);
		const { data } = await axios.get(CANDLE_STICK, params);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}


/*
 *
 * getAvgPrice
 * Current average price for a symbol.
 * Parameters:
 * 		symbol [STRING]  (MANDATORY)
 * 
 * Response:
 	{
	  "mins": 5,
	  "price": "9.35751834"
	}
 */
async function getAvgPrice(symbol) {
	try {
		const params = generateParams(getArgs(getAvgPrice), [...arguments]);
		const { data } = await axios.get(AVG_PRICE, params);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}


/*
 *
 * getPriceChangeStats
 * 24 hour rolling window price change statistics. Careful when accessing this with no symbol.
 * Weight: 1 for a single symbol; 40 when the symbol parameter is omitted
 * Parameters:
 * 		symbol [STRING]  (NOT MANDATORY)
 * 
 * If the symbol is not sent, tickers for all symbols will be returned in an array.
 *
 * Response:
	{
	  "symbol": "BNBBTC",
	  "priceChange": "-94.99999800",
	  "priceChangePercent": "-95.960",
	  "weightedAvgPrice": "0.29628482",
	  "prevClosePrice": "0.10002000",
	  "lastPrice": "4.00000200",
	  "lastQty": "200.00000000",
	  "bidPrice": "4.00000000",
	  "askPrice": "4.00000200",
	  "openPrice": "99.00000000",
	  "highPrice": "100.00000000",
	  "lowPrice": "0.10000000",
	  "volume": "8913.30000000",
	  "quoteVolume": "15.30000000",
	  "openTime": 1499783499040,
	  "closeTime": 1499869899040,
	  "firstId": 28385,   // First tradeId
	  "lastId": 28460,    // Last tradeId
	  "count": 76         // Trade count
	}
 */
async function getPriceChangeStats(symbol=null) {
	try {
		const params = generateParams(getArgs(getPriceChangeStats), [...arguments]);
		const { data } = await axios.get(TICKER_PRICE_CHANGE, params);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}


/*
 *
 * getPrice
 * Latest price for a symbol or symbols.
 * Parameters:
 * 		symbol [STRING]  (NOT MANDATORY)
 * 
 * If the symbol is not sent, tickers for all symbols will be returned in an array.
 *
 * Response:
	{
	  "symbol": "LTCBTC",
	  "price": "4.00000200"
	}
 */
async function getPrice(symbol=null) {
	try {
		const params = generateParams(getArgs(getPrice), [...arguments]);
		const { data } = await axios.get(SYMBOL_TICKER, params);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}


/*
 *
 * getBookTicker
 * Best price/qty on the order book for a symbol or symbols.
 * Weight: 1 for a single symbol; 2 when the symbol parameter is omitted
 *
 * Parameters:
 * 		symbol [STRING]  (NOT MANDATORY)
 * 
 * If the symbol is not sent, bookTickers for all symbols will be returned in an array.
 *
 * Response:
	{
	  "symbol": "LTCBTC",
	  "bidPrice": "4.00000000",
	  "bidQty": "431.00000000",
	  "askPrice": "4.00000200",
	  "askQty": "9.00000000"
	}
 */
async function getBookTicker(symbol=null) {
	try {
		const params = generateParams(getArgs(getBookTicker), [...arguments]);
		const { data } = await axios.get(BOOK_TICKER, params);
		console.log("data", data);
	} catch (err) {
		console.error(err.message);
	}
}


module.exports = {
	getOrderBook,
	getRecentTrades,
	getHistoricalTrades,
	getAggTrades,
	getCandlestickData,
	getAvgPrice,
	getPriceChangeStats,
	getPrice,
	getBookTicker
}