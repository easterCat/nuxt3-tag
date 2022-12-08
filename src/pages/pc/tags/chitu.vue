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

            <template v-if="index">
                <div class="tag-list">
                    <div
                        v-for="(o, oIndex) in tagsLists"
                        class="tag-item-img ll-media bg-base-100"
                        :data-index="oIndex"
                        :key="oIndex"
                    >
                        <div
                            v-if="showImage && tagActive !== 5 && tagActive !== 6"
                            class="image-con"
                        >
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
                                        o?.title.length > 24
                                            ? o?.title.slice(0, 24) + '...'
                                            : o?.title
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
            </template>
            <template v-if="tagActive">
                <div class="tag-list">
                    <div
                        v-for="(o, oIndex) in tagsLists"
                        class="tag-item-img ll-media bg-base-100"
                        :data-index="oIndex"
                        :key="oIndex"
                    >
                        <div
                            v-if="showImage && tagActive !== 5 && tagActive !== 6"
                            class="image-con"
                        >
                            <nuxt-img
                                v-if="o?.fileUrl"
                                :src="o?.fileUrl"
                                loading="lazy"
                                @click="preview(o)"
                            />
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
                                        o?.title.length > 24
                                            ? o?.title.slice(0, 24) + '...'
                                            : o?.title
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
            </template>
            <template v-else>
                <div class="tag-list">
                    <div
                        v-for="(o, oIndex) in tagsLists"
                        class="tag-item-img ll-media bg-base-100"
                        :data-index="oIndex"
                        :key="oIndex"
                    >
                        <div
                            v-if="showImage && tagActive !== 5 && tagActive !== 6"
                            class="image-con"
                        >
                            <nuxt-img v-if="o?.file1" :src="o?.file1" @click="preview(o)" />
                        </div>
                        <div class="text-con">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="o?.prompt"
                                placement="top"
                            >
                                <p v-if="o?.title" class="en">
                                    {{
                                        o?.title.length > 24
                                            ? o?.title.slice(0, 24) + '...'
                                            : o?.title
                                    }}
                                </p>
                                <p v-else class="en">
                                    {{
                                        o?.prompt.length > 24
                                            ? o?.prompt.slice(0, 24) + '...'
                                            : o?.prompt
                                    }}
                                </p>
                            </el-tooltip>
                        </div>
                        <div class="button-con">
                            <button
                                class="btn btn-sm btn-circle btn-accent m-r-10"
                                @click="addShop(o?.prompt)"
                            >
                                <i-ep-shopping-trolley></i-ep-shopping-trolley>
                            </button>
                            <button
                                class="btn btn-sm btn-circle btn-secondary"
                                @click="copy(o?.prompt)"
                            >
                                <i-ep-document-copy></i-ep-document-copy>
                            </button>
                        </div>
                    </div>
                </div>
            </template>
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
const { TemplateApi } = useApi();

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
const pageIndex = ref(1);
const pageSize = ref(50);
const scrollContainer: Ref<HTMLElement> = ref(window.document.body);

let json: any[] = [];
let index = 0;

const loadTemplates = async () => {
    const result = await TemplateApi.getTemplatesChitu({
        pageIndex: pageIndex.value,
        pageSize: pageSize.value,
    });
    tagsLists.value = [...tagsLists.value, ...(result?.templates ? result.templates : [])];
};

const preview = (o: any) => {
    if (tagActive.value) {
        currentTemplate.value = {
            author: o.author,
            n_prompt: o.n_prompt,
            preview: o.file1,
            model: o.model,
            prompt: o.prompt,
            prompt_zh: o.prompt_zh,
            name: o.name,
            desc: o.desc,
        };
        showPreview.value = true;
    } else {
        currentTemplate.value = {
            author: o.author,
            n_prompt: o.detagEN,
            preview: o.file1,
            model: o.model,
            prompt: o.promptEN,
            prompt_zh: o.promptZH,
            name: o.title,
            desc: o.parameter,
        };
        showPreview.value = true;
    }
};

const menuItemClick = async (key: number) => {
    index = 0;
    pageIndex.value = 1;
    if (tagActive.value) {
        tagActive.value = key;
        tagsLists.value = [];
        json = (await tagsMenus[key].file).default;
        setList();
    } else {
        loadTemplates();
    }
};

const searchChange = (val: any) => {
    searchText.value = val;
};

const scrollLoading = () => {
    const scrollTop = scrollContainer.value.scrollTop;
    const scrollHeight = scrollContainer.value.scrollHeight;
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollHeight - (scrollTop + windowHeight) <= 100) {
        console.log('触底');
        if (tagActive.value) {
            index++;
            setList();
        } else {
            pageIndex.value++;
            loadTemplates();
        }
    }
};

const setList = () => {
    tagsLists.value = tagsLists.value.concat(json.slice(index * 50, (index + 1) * 50));
};

const throttleScrollLoading = throttle(scrollLoading, 1500);

onMounted(async () => {
    loadTemplates();
    scrollContainer.value = document.querySelector('.chitu-tags-page') as HTMLElement;
    scrollContainer.value.addEventListener('scroll', throttleScrollLoading);
});

onUnmounted(() => {
    scrollContainer.value.removeEventListener('scroll', throttleScrollLoading);
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
