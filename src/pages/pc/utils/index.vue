<template>
    <div class="utils-page page">
        <AppHeader />
        <AppAnimate>
            <div class="content">
                <div class="max-width-limit">
                    <pc-area-title title="按类别浏览"></pc-area-title>

                    <div class="menu-list">
                        <div
                            v-for="(menu, mIndex) in menuList"
                            :key="mIndex"
                            class="menu-item"
                            :class="{ 'menu-item-active': mIndex === menuActive }"
                            @click="menuClick(menu, mIndex)"
                        >
                            <nuxt-img :src="menu?.bg" loading="lazy" />
                            <span>{{ menu?.name }}</span>
                        </div>
                    </div>
                    <pc-area-title title="当前工具"></pc-area-title>
                    <PromptBeautiful></PromptBeautiful>
                </div>
            </div>
        </AppAnimate>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PromptBeautiful from './components/promptBeautiful.vue';
import { utilMenus } from '~/assets/json/utils.js';

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
.utils-page {
    height: 100vh;
    overflow-y: hidden;
    overflow-y: scroll;
}
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
        cursor: pointer;
        margin-right: 30px;
        border-radius: 10px;
        --tw-text-opacity: 0.5;
        --tab-color: hsla(var(--bc) / var(--tw-text-opacity));
        color: var(--tab-color);

        > img {
            width: 100px;
            height: 100px;
            border-radius: 10px;
            margin-bottom: 4px;
            margin-right: 8px;
        }

        &-active {
            --tw-text-opacity: 1;
            --tab-color: hsla(var(--bc) / var(--tw-text-opacity));
            color: var(--tab-color);
        }
    }
}
</style>
