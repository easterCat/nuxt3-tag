<template>
    <div class="chitu-tags-page page">
        <AppHeader />
        <div class="content">
            <AppBanner placeholder="搜索标签" @search-change="searchChange" />
            <pc-area-title title="标签类别"></pc-area-title>
            <div class="type-list">
                <PcAnimationButton
                    v-for="(m, mIndex) in tagsMenus"
                    :key="mIndex"
                    :index="mIndex + ''"
                    :button-style="1"
                    button-size="larger"
                    :class="[mIndex === tagActive ? 'btn-accent' : 'btn-secondary']"
                    :button-text="m?.name"
                    @submit="menuItemClick(mIndex)"
                ></PcAnimationButton>
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
                <div
                    v-for="(o, oIndex) in tagsLists"
                    :key="oIndex"
                    class="tag-item-img ll-media bg-base-100"
                    :data-index="oIndex"
                >
                    <div v-if="showImage && tagActive !== 5 && tagActive !== 6" class="image-con">
                        <nuxt-img :src="o?.fileUrl ?? ''" loading="lazy" @click="preview(o)" />
                    </div>
                    <div class="text-con">
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="o?.promptEN"
                            placement="top"
                        >
                            <p v-if="o?.title" class="en">
                                {{
                                    o?.title.length > 24 ? o?.title.slice(0, 24) + '...' : o?.title
                                }}
                            </p>
                            <p v-else class="en">
                                {{
                                    o?.promptEN.length > 24
                                        ? o?.promptEN.slice(0, 24) + '...'
                                        : o?.promptEN
                                }}
                            </p>
                        </el-tooltip>
                    </div>
                    <div class="button-con">
                        <button
                            class="btn btn-sm btn-circle btn-accent m-r-10"
                            @click="addShop(o?.promptEN)"
                        >
                            <i-ep-shopping-trolley></i-ep-shopping-trolley>
                        </button>
                        <button
                            class="btn btn-sm btn-circle btn-secondary"
                            @click="copy(o?.promptEN)"
                        >
                            <i-ep-document-copy></i-ep-document-copy>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <PcTemplateDetail
            v-model="showPreview"
            :current-template="currentTemplate"
        ></PcTemplateDetail>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { throttle } from 'lodash';

const { copy } = useCopy();
const { addShop } = useShop();

const tagsMenus = reactive([
    { name: '参考图', file: import('@/assets/json/NovelAI_cankaotu.json') },
    { name: '人物', file: import('@/assets/json/NovelAI_huageren.json') },
    { name: '物体', file: import('@/assets/json/NovelAI_huagewuti.json') },
    { name: '构图', file: import('@/assets/json/NovelAI_goutu.json') },
    { name: '画风', file: import('@/assets/json/NovelAI_huafeng.json') },
    { name: '正面词组', file: import('@/assets/json/NovelAI_zhengmiantag.json') },
    { name: '负面词组', file: import('@/assets/json/NovelAI_fumiantag.json') },
]);
const tagsLists: Ref<any[]> = ref<any[]>([]);
const tagActive: Ref<number> = ref<number>(0);
const showImage: Ref<boolean> = ref<boolean>(true);
const searchText: Ref<string> = ref<string>('');
const currentTemplate: any = ref({});
const showPreview = ref(false);

let json: any[] = [];
let index = 0;
const pageSize = 50;

const preview = (o: any) => {
    currentTemplate.value = {
        author: o.author,
        n_prompt: o.detagEN,
        preview: o.fileUrl2,
        model: o.model,
        prompt: o.promptEN,
        prompt_zh: o.promptZH,
        name: o.title,
        desc: o.parameter,
    };
    showPreview.value = true;
};

const menuItemClick = async (key: number) => {
    index = 0;
    tagActive.value = key;
    tagsLists.value = [];
    json = (await tagsMenus[key].file).default;
    setList();
};

const searchChange = (val: any) => {
    searchText.value = val;
};

const scrollLoading = async () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollHeight - (scrollTop + windowHeight) <= 100) {
        console.log('触底');
        index++;
        setList();
    }
};

const setList = () => {
    tagsLists.value = tagsLists.value.concat(json.slice(index * pageSize, (index + 1) * pageSize));
};

const throttleScrollLoading = throttle(scrollLoading, 1500);

onMounted(async () => {
    index = 0;
    json = (await tagsMenus[0].file).default;
    setList();
    window.addEventListener('scroll', throttleScrollLoading);
});

onUnmounted(() => {
    window.removeEventListener('scroll', throttleScrollLoading);
});
</script>

<style lang="scss" scoped>
.chitu-tags-page {
    height: 100vh;
    overflow-y: hidden;
    overflow-y: scroll;
}

.type-list .animation-button {
    margin-bottom: 10px;
}

.title-side {
    margin-left: 10px;
    --el-switch-on-color: #13ce66;
    --el-switch-off-color: #ff4949;
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

    .tag-item-img {
        box-shadow: rgba(17, 17, 26, 0.1) 0px 2px 8px;
        border-radius: 10px;
        margin-bottom: 15px;
        box-sizing: border-box;
        cursor: pointer;

        .text-con {
            padding: 10px 10px 10px 10px;
        }

        .button-con {
            padding: 0 10px 10px 10px;
        }

        .image-con {
            width: 100%;
            height: auto;
            object-fit: cover;
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
