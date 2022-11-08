<template>
    <NuxtLayout>
        <div class="tags-page page">
            <AppHeader />
            <div class="content">
                <el-container>
                    <el-aside width="200px">
                        <el-menu active-text-color="#ffd04b" default-active="0">
                            <el-menu-item
                                v-for="(m, mIndex) in tagsMenus"
                                :index="mIndex + ''"
                                :key="mIndex"
                                @click="menuItemClick(mIndex)"
                            >
                                <el-icon><icon-menu /></el-icon>
                                <span>{{ m?.name }}</span>
                            </el-menu-item>
                        </el-menu>
                    </el-aside>
                    <el-main width="800px">
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
                                <el-card :body-style="{ padding: '0px' }">
                                    <img
                                        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                        class="image"
                                    />
                                    <div style="padding: 14px">
                                        <p>{{ o?.zh }}</p>
                                        <p>{{ o?.en }}</p>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-main>
                </el-container>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { tags } from "~/assets/json/tags";

const tagsMenus = ref(tags.class);
const tagsLists = ref(tagsMenus.value[0].data);

const menuItemClick = (key: number) => {
    tagsLists.value = tagsMenus.value[key].data;
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
