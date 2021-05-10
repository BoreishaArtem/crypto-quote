export default {
  state: {
    chartPair: [],
  },
  mutations: {
    setChartPair(state, payload) {
      state.chartPair = payload;
    },
  },
  actions: {
    async defineChartPair({ commit }, payload) {
      try {
        const data = await fetch(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=${payload.FSYM}&tsym=${payload.TSYM}&limit=20`);
        const result = await data.json();
        const correctArr = result.Data.Data
          .map((item) => (
            { close: item.close, date: item.time, open: item.open }
          ));
        commit('setChartPair', correctArr);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
  getters: {
    getChartPair(state) {
      return state.chartPair;
    },
  },
};
