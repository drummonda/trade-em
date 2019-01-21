const { binanceEndpoint, test, headerConfig } = require('./config');
const generateSignature = require('./hash');
const makeOrder = require('./order');

const params = `symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.008666&timestamp=${Date.now()}`;
const signature = generateSignature(params);
const paramsWithSignature = `${params}&signature=${signature}`;

makeOrder(test, paramsWithSignature, headerConfig);