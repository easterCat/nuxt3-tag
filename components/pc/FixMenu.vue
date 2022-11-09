<template>
  <div class="page-fix-menu">
    <!-- <el-icon size="20" color="#e6a23c">
                    <ShoppingCart />
                </el-icon> -->
    <!-- <el-badge :value="1">
      <el-button type="success" icon="ShoppingCartFull" circle @click="linkButtonClick"></el-button>
    </el-badge> -->

    <el-button type="success" icon="Link" circle @click="linkButtonClick"></el-button>

    <ClientOnly>
      <el-drawer
        v-model="drawer"
        title="常用网站"
        :direction="direction"
        :before-close="handleClose"
      >
        <div>
          <PcLinkList></PcLinkList>
        </div>
      </el-drawer>
    </ClientOnly>
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
