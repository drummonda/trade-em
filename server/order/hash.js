const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', process.env.BINANCE_SECRET);

module.exports = params => {
	hmac.update(params);
	return hmac.digest('hex');
}