<template>
  <div class="page-fix-menu">
    <el-button type="success" circle @click="linkButtonClick">
      <slot name="icon"><i-ep-link></i-ep-link></slot>
    </el-button>

    <el-drawer v-model="drawer" title="常用网站" :direction="direction" :before-close="handleClose">
      <div>
        <pc-link-list></pc-link-list>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// daa
const drawer = ref(false);
const direction = ref('ltr');

// methods
const linkButtonClick = () => {
  drawer.value = true;
};

const handleClose = (done: any) => {
  done();
};
</script>

<style lang="scss" scoped>
.page-fix-menu {
  position: fixed;
  bottom: 30px;
  right: 20px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70px;
}
</style>
