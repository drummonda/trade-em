const binance_api_wrapper = require('../api-wrapper');
const binance_client = new binance_api_wrapper();

// binance_client.openKlineStream('ETHBTC', '1m');
// binance_client.openKlineStream('LTCBTC', '1m');
// binance_client.openKlineStream('XRPBTC', '1m')
binance_client.openAllMarketMiniTickerStream();