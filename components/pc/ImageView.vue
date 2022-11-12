<template>
  <photo-provider>
    <photo-consumer v-for="src in sourceImageURLs" :intro="src" :key="src" :src="src">
      <img :src="src" class="view-box" />
    </photo-consumer>
  </photo-provider>
</template>

<script setup lang="ts">
const sourceImageURLs = ref([]);
</script>
