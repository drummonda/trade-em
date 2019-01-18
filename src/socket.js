import { updatePrice } from './store/data';
import store from './store';

const socket = new WebSocket("wss://stream.binance.com:9443/ws/ethbtc@ticker");


socket.onopen = () => {
  console.log('Connected!')
}

socket.onmessage = ({ data }) => {
	const parsed = JSON.parse(data);
	const price = Number(parsed["c"]);
	store.dispatch(updatePrice(price));
}

export default socket