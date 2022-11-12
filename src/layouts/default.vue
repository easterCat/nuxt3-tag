<template>
    <div class="default-layout">
        <slot />
        <PcFixMenu></PcFixMenu>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.default-layout {
    height: 100%;
    width: 100%;
    // overflow: hidden;
}
</style>
