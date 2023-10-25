<script setup>
import DirectLayout from './components/DirectLayout.vue';
</script>

<template>
  <DirectLayout>
    <RouterView />
  </DirectLayout>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
// @use "@layouts/styles/default-layout";
</style>
