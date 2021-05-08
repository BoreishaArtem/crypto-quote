// const API_KEY = '43329fe2306dd8b0d5351c7597b2724ffd1dbca1d540728ee2c59d37857bebe3';
// const TRADE_COINS = ['BTC', 'BCH', 'ETH', 'XRP', 'ALGO'];
//
// const state = {
//   firstValue: null,
//   secondValue: null,
// };
// const actions = {
//   handleOnMessage(data) {
//     if (data.TYPE === '0') {
//       if (!state.firstValue) {
//         state.firstValue = { [data.FSYM]: data };
//       } else {
//         state.secondValue = state.firstValue;
//         state.firstValue = { ...state.firstValue, [data.FSYM]: data };
//       }
//     }
//   },
// };
//
// const getters = {
//   getFirstValue() {
//     return state.firstValue;
//   },
//   getSecondValue() {
//     return state.secondValue;
//   },
// };
//
// const ccStreamer = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);
// ccStreamer.onopen = () => {
//   const subRequest = {
//     action: 'SubAdd',
//     subs: TRADE_COINS.map((coin) => `0~Coinbase~${coin}~USD`),
//   };
//   ccStreamer.send(JSON.stringify(subRequest));
// };
// ccStreamer.onmessage = (event) => {
//   const data = JSON.parse(event.data);
//   actions.handleOnMessage(data);
// };
//
// export default {
//   state,
//   actions,
//   getters,
//   // mutations,
// };
