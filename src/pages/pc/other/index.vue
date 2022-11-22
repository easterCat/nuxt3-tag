<template>
    <NuxtLayout>
        <div class="web-page page">
            <AppHeader />
            <div class="content">
                <div class="max-width-limit">
                    <app-animate name="fadeIn">
                        <pc-area-title title="导航类别"></pc-area-title>
                    </app-animate>
                    <div class="menu-list">
                        <template v-for="(menu, mIndex) in menuList" :key="mIndex">
                            <app-animate name="fadeIn">
                                <div
                                    class="menu-item"
                                    :class="{ 'menu-item-active': mIndex === menuActive }"
                                    :key="mIndex"
                                    @click="menuClick(mIndex)"
                                >
                                    <img v-lazy="menu?.bg" alt="" />
                                    <span>{{ menu?.name }}</span>
                                </div>
                            </app-animate>
                        </template>
                    </div>
                    <app-animate name="fadeIn">
                        <pc-area-title title="当前导航"></pc-area-title>
                    </app-animate>
                    <Navigate v-if="menuActive === 0"></Navigate>
                    <DesignSite v-if="menuActive === 1"></DesignSite>
                    <PdfSite v-if="menuActive === 2"></PdfSite>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import DesignSite from './designSite/index.vue';
import Navigate from './navigate/index.vue';
import PdfSite from './pdfSite/index.vue';

const menuList = ref([
    {
        name: 'web前端导航',
        childs: [],
        bg: 'https://image.lexica.art/md/8088e6f6-96fe-4e64-bfb2-b72fbb763d64',
    },
    {
        name: '设计师网站导航',
        childs: [],
        bg: 'https://image.lexica.art/md/8fe3855d-49ca-4d98-8c9a-787ff30ea24b',
    },
    {
        name: '电子书导航',
        childs: [],
        bg: 'https://image.lexica.art/md/cf829111-8217-44f9-aa9f-fa7e8aed7701',
    },
]);
const initActive = 0;
const menuActive = ref(initActive);

const menuClick = (index: number) => {
    menuActive.value = index;
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
