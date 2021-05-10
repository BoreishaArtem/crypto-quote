<template>
  <div id="app">
    <Header/>
    <Sidebar/>
    <Chart />
  </div>
</template>

<script>
import Sidebar from '@/components/layout/Sidebar.vue';
import Header from '@/components/layout/Header.vue';
import Chart from '@/components/Chart.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    Header,
    Chart,
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
@media all and (max-width: 1300px) {
  .sidebar {
    width: 100%;
    order: 3;
    flex: 0 0 100%;
    height: auto;
    margin-bottom: 50px;
  }
  .chart {
    order: 2;
    width: 100%;
  }
  .header {
    width: 100%;
    order: 1;
  }
}

</style>
