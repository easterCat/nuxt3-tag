<template>
    <div class="eh-tags-page page">
        <ClientOnly><AppHeader /></ClientOnly>
        <div class="content">
            <AppBanner placeholder="搜索标签" @search-change="searchChange" />
            <EHentai :search-text="searchText1"></EHentai>
            <EHentaiMore :search-text="searchText2"></EHentaiMore>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import EHentai from './components/eHentai.vue';
import EHentaiMore from './components/eHentaiMore.vue';

const searchText1: Ref<string> = ref('');
const searchText2: Ref<string> = ref('');

const searchChange = (val: any) => {
    searchText1.value = val;
    searchText2.value = val;
};
</script>

<style lang="scss" scoped>
.eh-tags-page {
    height: 100vh;
    overflow-y: hidden;
    overflow-y: scroll;
}

.type-list .animation-button {
    margin-bottom: 10px;
}

.title-side {
    margin-left: 10px;
    --el-switch-on-color: hsl(var(--a) / 1);
    --el-switch-off-color: hsl(var(--s) / 1);
}

.eh-title-side-tip {
    font-size: 12px;
    color: rgb(138, 138, 138);
    margin-left: 10px;
}

.tag-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .tag-item {
        padding: 8px 20px;
        background: #fafaf8;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 2px 8px;
        border-radius: 10px;
        margin-bottom: 15px;
        margin-right: 15px;
        cursor: pointer;

        .text-con {
            margin-bottom: 8px;
        }

        .image-con {
            width: 100%;
            height: 200px;
            object-fit: cover;
            margin-bottom: 8px;
            border-radius: 10px;
            overflow: hidden;
        }

        img {
            width: 100%;
            height: 100%;
        }

        .zh {
            color: rgb(49, 49, 49);
            margin-bottom: 4px;
        }
    }
}
</style>
