const binanceEndpoint = "https://api.binance.com";
const test = `${binanceEndpoint}/api/v3/order/test`;

let headerConfig = {
  headers: {
      "X-MBX-APIKEY": process.env.BINANCE_API
  }
};

module.exports = {
	binanceEndpoint,
	test,
	headerConfig
}