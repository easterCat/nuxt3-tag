<template>
  <NuxtLayout>
    <div class="tags-page page">
      <AppHeader />
      <div class="content">
        <AppBanner />
        <PcAreaTitle title="标签类别"></PcAreaTitle>
        <div class="type-list">
          <PcAnimationButton
            v-for="(m, mIndex) in tagsMenus"
            v-animate="{ direction: 'fadeIn' }"
            :index="mIndex + ''"
            :key="mIndex"
            :buttonStyle="1"
            buttonSize="larger"
            :buttonColor="mIndex === tagActive ? '241, 119, 71' : '245, 190, 171'"
            buttonAngel="145deg"
            buttonWidth="130px"
            :buttonText="m?.name"
            @submit="menuItemClick(mIndex)"
          >
          </PcAnimationButton>
        </div>
        <PcAreaTitle title="标签列表"></PcAreaTitle>
        <el-row :gutter="20">
          <el-col
            v-for="(o, index) in tagsLists"
            :key="index"
            :xs="12"
            :sm="8"
            :md="6"
            :lg="4"
            :xl="4"
          >
            <el-card :body-style="{ padding: '0px' }" v-animate="{ direction: 'fadeIn' }">
              <!-- <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              /> -->
              <div style="padding: 14px">
                <p>{{ o?.zh }}</p>
                <p>{{ o?.en }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import { ref, Ref } from 'vue';
  import { tags } from '~/assets/json/tags';

  const tagsMenus = ref(tags.class);
  const tagsLists = ref(tagsMenus.value[0].data);
  const tagActive: Ref<number> = ref(0);

  const menuItemClick = (key: number) => {
    tagsLists.value = tagsMenus.value[key].data;
    tagActive.value = key;
  };
</script>

<style lang="scss" scoped>
  .type-list .animation-button {
    margin-bottom: 10px;
  }
  :deep(.el-col) {
    margin-bottom: 10px;
  }
</style>
