<template>
  <div class="sidebar">
    <h1 class="sidebar-header">Панель котировок</h1>
    <div class="sidebar-body">
      <ul class="sidebar-body--headings">
        <li>Валютные пары</li>
        <li>Изменение</li>
        <li>Цена</li>
      </ul>
      <ul class="sidebar-body--currencies">
        <li v-for="(value, key) in firstValue" :key="key" @click="setChartValue(value)">
            <span class="pair">{{ value.TSYM }} | {{ value.FSYM }}</span>
            <div class="change">
              <ArrowUp
                v-if="value.P.toFixed(1) > secondValue[key].P.toFixed(1)
              && calculatePercentage(key, value) !== '0.00'"
              />
              <template v-else>
                <ArrowDown v-if="calculatePercentage(key, value) !== '0.00'"/>
              </template>
              {{ calculatePercentage(key, value) }}%
            </div>
            <span class="price">{{ value.P }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ArrowUp from '@/components/svgs/ArrowUp.vue';
import ArrowDown from '@/components/svgs/ArrowDown.vue';

export default {
  name: 'Sidebar',
  components: { ArrowDown, ArrowUp },
  data() {
    return {
      firstValue: null,
      secondValue: null,
      tradeCoins: ['BTC', 'BCH', 'ETH', 'XRP', 'ALGO'],
      apiKey: '43329fe2306dd8b0d5351c7597b2724ffd1dbca1d540728ee2c59d37857bebe3',
    };
  },
  created() {
    const ccStreamer = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${this.apiKey}`);
    ccStreamer.onopen = () => {
      const subRequest = {
        action: 'SubAdd',
        subs: this.tradeCoins.map((coin) => `0~Coinbase~${coin}~USD`),
      };
      ccStreamer.send(JSON.stringify(subRequest));
    };
    ccStreamer.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.TYPE === '0') {
        if (!this.firstValue) {
          this.firstValue = { [data.FSYM]: data };
          this.$store.dispatch('defineChartPair', data);
        } else {
          if (this.firstValue[data.FSYM] && data.P === this.firstValue[data.FSYM].P) {
            return;
          }
          this.secondValue = this.firstValue;
          this.firstValue = { ...this.firstValue, [data.FSYM]: data };
        }
      }
    };
  },
  methods: {
    calculatePercentage(key, value) {
      if (this.secondValue && this.secondValue[key] && value) {
        const firstValue = value.P;
        const secondValue = this.secondValue[key].P;
        let min;
        let max;
        if (firstValue === secondValue) {
          return '0.00';
        }
        if (firstValue > secondValue) {
          max = firstValue;
          min = secondValue;
        } else {
          max = secondValue;
          min = firstValue;
        }
        return (100 - (100 * min) / max).toFixed(2);
      }
      return null;
    },
    setChartValue(data) {
      this.$store.dispatch('defineChartPair', data);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  flex: 0 0 30%;
  margin-right: 10px;
  height: 80vh;
  &-header {
    margin-top: 10px;
    margin-bottom: 3px;
    padding: 22px 0 22px 35px;
    background: $darkGrey;
    color: $white;
    text-transform: uppercase;
  }
  &-body {
    background: $darkGrey;
    height: 100%;
    &--headings {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 35px 7px 35px;
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-weight: 400;
      color: $lightGrey;
      line-height: 36px;
    }
    &--headings li:not(:last-child) {
      width: 30%;
    }
    &--headings li:last-child {
      width: 13%;
    }
    &--currencies {
      font-family: 'Montserrat', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: $white;
      line-height: 30px;
    }
    &--currencies li {
      padding: 7px 35px 7px 35px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover {
        background: $gradientTwo;
      }
      .pair {
        width: 30%;
      }
      .change {
        width: 20%;
      }
      .price {
        width: 26%;
        text-align: right;
      }
      .change span {
        margin-left: 10px;
      }
    }
  }
}

@media all and (max-width: 1580px) {
  .sidebar-body--currencies li .pair {
    width: 35%;
  }
  .sidebar-body--headings li:not(:last-child) {
    width: 44%;
  }
}
@media all and(max-width: 565px) {
  .sidebar-body--headings li:not(:last-child) {
    font-size: 12px;
  }
  .sidebar-header {
    font-size: 18px;
  }
  .sidebar-body--currencies li {
    .pair {
      font-size: 14px;
    }
    .change {
      font-size: 14px;
    }
    .price {
      font-size: 14px;
    }

  }
}
</style>
