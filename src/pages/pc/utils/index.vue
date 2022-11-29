<template>
    <NuxtLayout>
        <div class="utils-page page">
            <AppHeader />
            <div class="content">
                <div class="max-width-limit">
                    <app-animate name="fadeIn">
                        <pc-area-title title="按类别浏览"></pc-area-title>
                    </app-animate>

                    <div class="menu-list">
                        <template v-for="(menu, mIndex) in menuList" :key="mIndex">
                            <app-animate name="fadeIn">
                                <div
                                    class="menu-item"
                                    :class="{ 'menu-item-active': mIndex === menuActive }"
                                    :key="mIndex"
                                    @click="menuClick(menu, mIndex)"
                                >
                                    <nuxt-img :src="menu?.bg" loading="lazy" />
                                    <span>{{ menu?.name }}</span>
                                </div>
                            </app-animate>
                        </template>
                    </div>
                    <app-animate name="fadeIn">
                        <pc-area-title title="当前工具"></pc-area-title>
                    </app-animate>
                    <PromptBeautiful></PromptBeautiful>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { utilMenus } from '~/assets/json/utils.js';
import PromptBeautiful from './components/promptBeautiful.vue';

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
        border-radius: 10px;

        > img {
            width: 100px;
            height: 100px;
            border-radius: 10px;
            margin-bottom: 4px;
            margin-right: 8px;
            background-color: rgb(122, 119, 119);
        }

        &-active {
            color: rgb(227, 29, 88);
        }
    }
}
</style>
