<template>
    <div class="utils-page page">
        <ClientOnly><AppHeader /></ClientOnly>
        <ClientOnly>
            <div class="content" v-animate-css="{ direction: 'modifySlideInUp' }">
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
                <component
                    :is="menuView"
                    v-animate-css="{ direction: 'modifySlideInUp', delay: 100 }"
                    @setPreview="setPreview"
                ></component>
            </div>
        </ClientOnly>
        <ClientOnly>
            <el-dialog v-model="previewVisible" title="预览" width="50%">
                <img w-full :src="previewImageUrl" alt="Preview Image" />
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="previewVisible = false">关闭</el-button>
                    </span>
                </template>
            </el-dialog>
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import PromptBeautiful from './components/promptBeautiful.vue';
import ImageAnalysis from './components/imageAnalysis.vue';
import { utilMenus } from '~/assets/json/utils.js';

const components: any = { PromptBeautiful: PromptBeautiful, ImageAnalysis: ImageAnalysis };
const menuView = shallowRef(ImageAnalysis);
const initActive = 0;
const menuActive = ref(initActive);
const menuList = ref(utilMenus);
const menuChilds = ref(menuList.value[initActive]?.childs);
const previewVisible = ref(false);
const previewImageUrl = ref('');

const menuClick = (menu: any, index: number) => {
    menuActive.value = index;
    menuChilds.value = menu?.childs;
    menuView.value = components[menu?.component];
};

const setPreview = (v: any) => {
    previewImageUrl.value = v;
    previewVisible.value = true;
};
</script>

<style lang="scss" scoped>
.utils-page {
    height: 100vh;
    overflow-y: hidden;
    overflow-y: scroll;

    .content {
        width: 1280px;
        min-height: calc(100vh - 72px);
        margin: 0 auto;
    }

    .menu-list {
        width: 100%;
        height: auto;
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
}
</style>
