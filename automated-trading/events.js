const EventEmitter = require('events');

const marketDataEmitter = new EventEmitter();
// Only do this once so we don't loop forever
marketDataEmitter.once('newListener', (event, listener) => {
  console.log("listener added!");
});

marketDataEmitter.on('update', data => {
  console.log('data', data);
});

marketDataEmitter.on('TICKER', data => {
  console.log('data', data);
});



module.exports = marketDataEmitter;