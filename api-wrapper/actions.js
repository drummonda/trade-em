const {
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
} = require('./query');

const {
	openOrder,
	openTestOrder,
	queryOpenOrder,
	cancelOpenOrder,
	queryAllOpenOrders,
	queryAllOrders
} = require('./order');

const {
	openAggTradeStream,
	openTradeStream,
	openKlineStream,
	openMiniTickerStream,
	openAllMarketMiniTickerStream,
	openTickerStream,
	openAllMarketTickerStream,
	openPartialBookDepthStream,
	openDiffDepthStream
} = require('./websocketStream');

const {
	startUserDataStream,
	keepaliveUserDataStream,
	closeUserDataStream
} = require('./userDataStream');

const {
	withdrawAsset,
	getDepositHistory,
	getWithdrawalHistory,
	getSystemStatus,
	getAccountStatus,
	getDepositAddress,
	getAPITradingStatus,
	getDustLog,
	getTradeFee
} = require('./withdraw');

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
	getBookTicker,
	openOrder,
	openTestOrder,
	queryOpenOrder,
	cancelOpenOrder,
	queryAllOpenOrders,
	queryAllOrders,
	openAggTradeStream,
	openTradeStream,
	openKlineStream,
	openMiniTickerStream,
	openAllMarketMiniTickerStream,
	openTickerStream,
	openAllMarketTickerStream,
	openPartialBookDepthStream,
	openDiffDepthStream,
	startUserDataStream,
	keepaliveUserDataStream,
	closeUserDataStream,
	withdrawAsset,
	getDepositHistory,
	getWithdrawalHistory,
	getSystemStatus,
	getAccountStatus,
	getDepositAddress,
	getAPITradingStatus,
	getDustLog,
	getTradeFee
}