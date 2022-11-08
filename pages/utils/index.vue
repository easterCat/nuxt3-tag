<template>
    <NuxtLayout>
        <el-drawer title="常用网站" visible.sync="true">
            <div>
                <PcLinkList></PcLinkList>
            </div>
        </el-drawer>
       
        <div class="utils-page page">
            <AppHeader />
            <div class="content">
                <AppBanner />
                <div class="max-width-limit">
                    <PcAreaTitle title="按类别浏览"></PcAreaTitle>
                    <div class="menu-list">
                        <div v-for="(menu, mIndex) in menuList" class="menu-item"
                            :class="{ 'menu-item-active': mIndex === menuActive }" :key="mIndex"
                            @click="menuClick(menu, mIndex)">
                            <img v-lazy="menu?.bg" alt="" /><span>{{ menu?.name }}</span>
                        </div>
                    </div>
                    <PcAreaTitle title="当前工具"></PcAreaTitle>
                    <PromptBeautiful></PromptBeautiful>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { utilMenus } from "~/assets/json/utils.js";
import PromptBeautiful from "~/pages/utils/components/promptBeautiful.vue";

const initActive = 0;
const menuActive = ref(initActive);
const menuList = ref(utilMenus);
const menuChilds = ref(menuList.value[initActive]?.childs);

const menuClick = (menu: any, index: number) => {
    menuActive.value = index;
    menuChilds.value = menu?.childs;
};
</script>

<style lang="scss" scoped>
.menu-list {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    margin-left: 2px;

    .menu-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100px;
        height: 100%;
        font-size: 14px;
        font-weight: bold;
        color: rgb(74, 71, 71);
        cursor: pointer;
        margin-right: 30px;

        >img {
            width: 100px;
            height: 100px;
            border-radius: 10px;
            margin-bottom: 4px;
            margin-right: 8px;
        }

        &-active {
            color: rgb(227, 29, 88);
        }
    }
}
</style>
