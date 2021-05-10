import Vue from 'vue';
import store from '@/store/index';
import App from './App.vue';
// Styles reset
import './styles/global.scss';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
