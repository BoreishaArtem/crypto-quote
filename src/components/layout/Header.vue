<template>
  <header class="header">
    <Logo />
  </header>
</template>

<script>
import Logo from '@/components/svgs/Logo.vue';

export default {
  name: 'Header',
  components: { Logo },
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $darkGrey;
}
</style>
