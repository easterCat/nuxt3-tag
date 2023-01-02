<template>
    <div class="tags-page page">
        <ClientOnly><AppHeader /></ClientOnly>
        <div class="content">
            <AppBanner placeholder="搜索标签" @search-change="searchChange" />
            <pc-area-title title="标签类别"></pc-area-title>
            <div class="type-list">
                <ClientOnly>
                    <PcAnimationButton
                        v-for="(m, mIndex) in tagsMenus"
                        :key="mIndex"
                        v-animate-css="{
                            direction: 'modifySlideInUp',
                            delay: mIndex * 40,
                        }"
                        :index="mIndex + ''"
                        :button-style="1"
                        button-size="larger"
                        :class="[mIndex === tagActive ? 'btn-accent' : 'btn-secondary']"
                        :button-text="m?.name"
                        @submit="menuItemClick(mIndex)"
                    ></PcAnimationButton>
                </ClientOnly>
            </div>
            <pc-area-title title="标签列表">
                <template #titleSide>
                    <el-switch
                        v-model="showImage"
                        size="large"
                        inline-prompt
                        inactive-text="隐藏Image"
                        active-text="开启Image"
                        class="title-side"
                    />
                </template>
            </pc-area-title>

            <div class="tag-list">
                <ClientOnly>
                    <div
                        v-for="(o, oIndex) in tagsLists"
                        :key="oIndex"
                        v-animate-css="{
                            direction: 'modifySlideInUp',
                            delay: oIndex * 40,
                        }"
                        class="tag-item"
                    >
                        <div v-if="showImage" class="image-con">
                            <img
                                src="https://image.lexica.art/md/6612175d-e172-4ae2-87a1-da2d4e7d2f6b"
                            />
                        </div>

                        <div class="text-con">
                            <p class="zh">{{ o?.zh }}</p>
                            <p class="en">{{ o?.en }}</p>
                        </div>
                        <div>
                            <el-button size="small" circle @click="addShop(o?.en)">
                                <slot name="icon">
                                    <i-ep-shopping-trolley></i-ep-shopping-trolley>
                                </slot>
                            </el-button>
                            <el-button size="small" circle @click="copy(o?.en)">
                                <slot name="icon">
                                    <i-ep-document-copy></i-ep-document-copy>
                                </slot>
                            </el-button>
                        </div>
                    </div>
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';

const { DefaultTagsApi } = useApi();
const result = await DefaultTagsApi.getTags();
const tags = JSON.parse(result);
const tagsMenus = ref(tags.class);
const tagsLists = ref(tagsMenus.value[0].data);
const tagActive: Ref<number> = ref(0);
const showImage: Ref<boolean> = ref(false);
const searchText: Ref<string> = ref('');
const { copy } = useCopy();
const { addShop } = useShop();

const menuItemClick = (key: number) => {
    tagsLists.value = tagsMenus.value[key].data;
    tagActive.value = key;
};

const searchChange = (val: any) => {
    searchText.value = val;
};
</script>

<style lang="scss" scoped>
.tags-page {
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
