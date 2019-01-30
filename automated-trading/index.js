const binance_api_wrapper = require('../api-wrapper');
const binance_client = new binance_api_wrapper();
const marketDataEmitter = require('./events');

binance_client.openTickerStream(marketDataEmitter, "btcusdt");
binance_client.openTickerStream(marketDataEmitter, "ethbtc");
binance_client.openTickerStream(marketDataEmitter, "ethusdt");