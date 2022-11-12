<template>
  <div class="area-title">
    <span>{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.area-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 1px;
}
</style>
