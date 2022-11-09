<template>
  <div class="default-layout">
    <slot />
    <PcFixMenu></PcFixMenu>
  </div>
</template>

<style scoped lang="scss">
  .default-layout {
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
