<template>
  <header class="fix-header header">
    <div class="header-menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
      >
        <el-menu-item index="0">Stable Diffusion</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/pc/home" @click="handleNavClick('home')">首页</el-menu-item>
        <el-menu-item index="/pc/utils" @click="handleNavClick('utils')">工具</el-menu-item>
        <el-menu-item index="/pc/tags" @click="handleNavClick('tags')">标签</el-menu-item>
        <el-menu-item index="/pc/template" @click="handleNavClick('template')">模板</el-menu-item>
        <el-menu-item index="/pc/links" @click="handleNavClick('links')">收录</el-menu-item>
        <el-menu-item index="/pc/web" @click="handleNavClick('web')">Web</el-menu-item>
      </el-menu>
    </div>
    <div class="user-info">
      <div>
        <el-button size="small" type="success" circle>
          <slot name="icon">
            <i-ep-shopping-cart />
          </slot>
        </el-button>
      </div>
      <div>
        <el-badge :value="1">
          <el-button size="small" type="success" circle>
            <slot name="icon">
              <slot name="icon">
                <i-ep-shopping-cart-full />
              </slot>
            </slot>
          </el-button>
        </el-badge>
      </div>
      <div>
        <el-avatar src="https://image.lexica.art/md/26ef6676-a7e3-4560-8cb8-4355e017dc2b" />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';

//data
const router = useRouter();
const route = useRoute();
const path: Ref<string> = ref(route.path);
const activeIndex: Ref<string> = ref(path ?? '/home');
const shopStatus: Ref<boolean> = ref(false);

//methods
const handleNavClick = (link: string) => {
  router.push({ path: `/pc/${link}` });
};
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0px;
  z-index: 2001;
  display: flex;
  background: #fff;

  .header-menu {
    flex: 1;
  }

  .user-info {
    width: 140px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}

:deep(.el-menu) {
  height: 72px;
}
</style>
