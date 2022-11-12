<template>
  <NuxtLayout>
    <div class="web-page page">
      <AppHeader />
      <div class="content">
        <el-row :gutter="20">
          <el-button type="primary" @click="cardClick('navigate')">web前端导航</el-button>
        </el-row>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const router = useRouter();

const cardClick = (p: String) => {
  router.push({
    path: `/pc/web/${p}`,
  });
};
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: 0;
  display: block;

  img {
    object-fit: contain;
  }
}

:deep(.el-col) {
  margin-bottom: 20px;
  border-radius: 8px;
}

:deep(.description-label) {
  width: 120px;
}
</style>
