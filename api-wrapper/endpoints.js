// Generate an endpoint off of the main binance api url
const main = "https://api.binance.com";
const socket = "wss://stream.binance.com:9443";
const generateEndpoint = endPt => `${main}${endPt}`;

module.exports = {
	GET: {
		PING: generateEndpoint('/api/v1/ping'),
		TIME: generateEndpoint('/api/v1/time'),
		EXCHANGE_INFO: generateEndpoint('/api/v1/exchangeInfo'),
		SYMBOL_ORDER_BOOK: generateEndpoint('/api/v1/depth'),
		RECENT_TRADES: generateEndpoint('/api/v1/trades'),
		HISTORICAL_TRADES: generateEndpoint('/api/v1/historicalTrades'),
		AGG_TRADES: generateEndpoint('/api/v1/aggTrades'),
		CANDLE_STICK: generateEndpoint('/api/v1/klines'),
		AVG_PRICE: generateEndpoint('/api/v3/avgPrice'),
		TICKER_PRICE_CHANGE: generateEndpoint('/api/v1/ticker/24hr'),
		SYMBOL_TICKER: generateEndpoint('/api/v3/ticker/price'),
		BOOK_TICKER: generateEndpoint('/api/v3/ticker/bookTicker'),
		QUERY_ORDER: generateEndpoint('/api/v3/order'),
		OPEN_ORDERS: generateEndpoint('/api/v3/openOrders'),
		ALL_ORDERS: generateEndpoint('/api/v3/allOrders'),
		ACCOUNT_INFO: generateEndpoint('/api/v3/account'),
		ACCOUNT_TRADE_LIST: generateEndpoint('/api/v3/myTrades')
	},
	POST: {
		NEW_ORDER: generateEndpoint('/api/v3/order'),
		NEW_ORDER_TEST: generateEndpoint('/api/v3/order/test'),
		NEW_USER_DATA_STREAM: generateEndpoint('/api/v1/userDataStream')
	},
	PUT: {
		KEEPALIVE_USER_DATA_STREAM: generateEndpoint('/api/v1/userDataStream')
	},
	DELETE: {
		DELETE_ORDER: generateEndpoint('/api/v3/order'),
		CLOSE_USER_DATA_STREAM: generateEndpoint('/api/v1/userDataStream')
	}

}
