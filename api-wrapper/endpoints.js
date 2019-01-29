// Generate an endpoint off of the main binance api url
const main = "https://api.binance.com";
const stream = "wss://stream.binance.com:9443/ws";
const generateEndpoint = endPt => `${main}${endPt}`;
const generateTradeStream = symbol => `${stream}/${symbol}@trade`;
const generateAggTradeStream = symbol => `${stream}/${symbol}@aggTrade`;
const generateKlineStream = (symbol, interval) => `${stream}/${symbol}@kline_${interval}`;
const generateMiniTickerStream = symbol => `${stream}/${symbol}@miniTicker`;
const generateAllMarketMiniTickerStream = () => `${stream}/!miniTicker@arr`;
const generateTickerStream = symbol => `${stream}/${symbol}@ticker`;
const generateAllMarketTickerStream = () => `${stream}/!ticker@arr`;
const generatePartialBookDepthStream = (symbol, levels) => `${stream}/${symbol}@depth${levels}`;
const generateDiffDepthStream = symbol => `${stream}/${symbol}@depth`;

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
		ACCOUNT_TRADE_LIST: generateEndpoint('/api/v3/myTrades'),
		DEPOSIT_HISTORY: generateEndpoint('/wapi/v3/depositHistory.html'),
		WITHDRAW_HISTORY: generateEndpoint('/wapi/v3/withdrawHistory.html'),
		DEPOSIT_ADDRESS: generateEndpoint('/wapi/v3/depositAddress.html'),
		ACCOUNT_STATUS: generateEndpoint('/wapi/v3/depositAddress.html'),
		SYSTEM_STATUS: generateEndpoint('/wapi/v3/depositAddress.html'),
		API_TRADING_STATUS: generateEndpoint('/wapi/v3/depositAddress.html'),
		DUST_LOG: generateEndpoint('/wapi/v3/userAssetDribbletLog.html'),
		TRADE_FEE: generateEndpoint('/wapi/v3/userAssetDribbletLog.html'),
		ASSET_DETAIL: generateEndpoint('/wapi/v3/userAssetDribbletLog.html'),
		SUB_ACCOUNT_LIST: generateEndpoint('/wapi/v3/userAssetDribbletLog.html'),
		SUB_ACCOUNT_TRANSFER_HISTORY: generateEndpoint('/wapi/v3/userAssetDribbletLog.html'),
	},
	POST: {
		NEW_ORDER: generateEndpoint('/api/v3/order'),
		NEW_ORDER_TEST: generateEndpoint('/api/v3/order/test'),
		NEW_USER_DATA_STREAM: generateEndpoint('/api/v1/userDataStream'),
		WITHDRAW: generateEndpoint('/wapi/v3/withdraw.html'),
		SUB_ACCOUNT_TRANSFER: generateEndpoint('/wapi/v3/sub-account/transfer.html')
	},
	PUT: {
		KEEPALIVE_USER_DATA_STREAM: generateEndpoint('/api/v1/userDataStream')
	},
	DELETE: {
		DELETE_ORDER: generateEndpoint('/api/v3/order'),
		CLOSE_USER_DATA_STREAM: generateEndpoint('/api/v1/userDataStream')
	},
	STREAM: {
		BASE: stream,
		AGG_TRADE: generateAggTradeStream,
		TRADE: generateTradeStream,
		KLINE: generateKlineStream,
		MINI: generateMiniTickerStream,
		ALL_MINI: generateAllMarketMiniTickerStream,
		TICKER: generateTickerStream,
		ALL_TICKER: generateAllMarketTickerStream,
		PARTIAL_BOOK_DEPTH: generatePartialBookDepthStream,
		DIFF_DEPTH: generateDiffDepthStream
	},
	STREAM_TYPE: {
		BASE_TYPE: 'BASE',
		AGG_TRADE_TYPE: 'AGG_TRADE',
		TRADE_TYPE: 'TRADE',
		KLINE_TYPE: 'KLINE',
		MINI_TYPE: 'MINI',
		ALL_MINI_TYPE: 'ALL_MINI',
		TICKER_TYPE: 'TICKER',
		ALL_TICKER_TYPE: 'ALL_TICKER',
		PARTIAL_BOOK_DEPTH_TYPE: 'PARTIAL_BOOK_DEPTH',
		DIFF_DEPTH_TYPE: 'DIFF_DEPTH'
	}
}
