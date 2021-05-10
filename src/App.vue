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
</style>
