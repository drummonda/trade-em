const { getAccountInfo,
		getAccountTradeList } = require('./account');

const { pingServer,
		getServerTime,
		getExchangeInfo } = require('./general');

const { getOrderBook,
		getRecentTrades,
		getHistoricalTrades,
		getAggTrades,
		getCandlestickData,
		getAvgPrice,
		getPriceChangeStats,
		getPrice,
		getBookTicker } = require('./marketData');

module.exports = {
		getAccountInfo,
		getAccountTradeList,
		pingServer,
		getServerTime,
		getExchangeInfo,
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