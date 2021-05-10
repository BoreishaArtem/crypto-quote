<template>
  <div class="chart" ref="chartdiv">
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

export default {
  name: 'Chart',
  watch: {
    getChartData(val) {
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      if (val) {
        chart.paddingRight = 20;
        chart.data = val;
        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = 'date';
        series.dataFields.valueY = 'open';

        series.tooltipText = '{close}';
        chart.cursor = new am4charts.XYCursor();

        const scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;

        this.chart = chart;
      }
    },
  },
  data() {
    return {
      chartData: null,
    };
  },
  computed: {
    getChartData() {
      return this.$store.getters.getChartPair;
    },
  },
  mounted() {

  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style scoped>
.chart {
  margin-top: 10px;
  background-color: white;
  width: 69%;
  height: 100%;
  min-height: 856px;
}
</style>
