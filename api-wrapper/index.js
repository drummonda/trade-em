// const path = require('path');
// const fs = require('fs');
const binance_api_actions = require('./actions');

function binance_api() {
// 	const secrets = `process.env.BINANCE_API='${key}'
// process.env.BINANCE_SECRET='${secret}'`
// 	fs.writeFileSync('./secrets.js', secrets, 'utf8');
	require('../secrets');
}

Object.keys(binance_api_actions).forEach(action => {
	binance_api.prototype[action] = binance_api_actions[action];
});

module.exports = binance_api;
