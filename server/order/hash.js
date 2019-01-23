const CryptoJS = require('crypto-js');
module.exports = (params) => CryptoJS.HmacSHA256(params, process.env.BINANCE_SECRET).toString();