let state = {
	"BTCUSDT": null,
	"ETHBTC": null,
	"ETHUSDT": null
}

const updatePrice = (pair, price) => {
	state[pair] = price;
	calculateRates(pair, price);
}

const BASE = 1000;

const calculateRates = (pair, price) => {
	if(Object.values(state).includes(null)) return;
	let profit = calculate(state["BTCUSDT"], state["ETHBTC"], state["ETHUSDT"], BASE);
	console.log("profit?", profit);
	console.log("-------------------")
}

const calculate = (pair1, pair2, pair3, base) => {
	let profit1 = base / pair1;
	console.log("from buying btc with 1000 usdt -------------> ", profit1);
	let profit2 = profit1 / pair2;
	console.log("eth you can buy with that many btc -------->  ", profit2);
	let final = profit2 * pair3;
	console.log("final usdt from selling eth back to usdt ---> ", final);
	return final - base;
}

module.exports = updatePrice;