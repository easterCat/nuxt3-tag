<template>
  <NuxtLayout>
    <div class="links-page page">
      <AppHeader />
      <div class="content">
        <div class="link-con">
          <pc-link-list></pc-link-list>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.link-con {
  width: 100%;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
