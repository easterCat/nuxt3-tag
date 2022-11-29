<template>
    <NuxtLayout>
        <div class="tags-page page">
            <AppHeader />
            <div class="content">
                <AppBanner placeholder="搜索标签" @searchChange="searchChange" />
                <pc-area-title title="标签类别"></pc-area-title>
                <div class="type-list">
                    <PcAnimationButton
                        v-for="(m, mIndex) in tagsMenus"
                        :index="mIndex + ''"
                        :key="mIndex"
                        :buttonStyle="1"
                        buttonSize="larger"
                        :buttonColor="mIndex === tagActive ? '241, 119, 71' : '245, 190, 171'"
                        buttonAngel="145deg"
                        buttonWidth="130px"
                        :buttonText="m?.name"
                        @submit="menuItemClick(mIndex)"
                    ></PcAnimationButton>
                </div>
                <pc-area-title title="标签列表">
                    <template v-slot:titleSide>
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
                        class="tag-item ll-media"
                        v-for="(o, oIndex) in tagsLists"
                        :key="oIndex"
                        :data-index="oIndex"
                    >
                        <div
                            class="image-con"
                            v-if="showImage && tagActive !== 5 && tagActive !== 6"
                        >
                            <nuxt-img :src="o?.fileUrl ?? ''" loading="lazy" @click="preview(o)" />
                        </div>
                        <div class="text-con">
                            <!-- <p class="zh">
                                {{
                                    o?.promptZH.length > 12
                                        ? o?.promptZH.slice(0, 12) + '...'
                                        : o?.promptZH
                                }}
                            </p> -->
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="o?.promptEN"
                                placement="top"
                            >
                                <p class="en" v-if="o?.title">
                                    {{
                                        o?.title.length > 24
                                            ? o?.title.slice(0, 24) + '...'
                                            : o?.title
                                    }}
                                </p>
                                <p class="en" v-else>
                                    {{
                                        o?.promptEN.length > 24
                                            ? o?.promptEN.slice(0, 24) + '...'
                                            : o?.promptEN
                                    }}
                                </p>
                            </el-tooltip>
                        </div>
                        <div class="button-con">
                            <el-button size="small" circle @click="addShop(o?.promptEN)">
                                <slot name="icon">
                                    <i-ep-shopping-trolley></i-ep-shopping-trolley>
                                </slot>
                            </el-button>
                            <el-button size="small" circle @click="copy(o?.promptEN)">
                                <slot name="icon"><i-ep-document-copy></i-ep-document-copy></slot>
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <PcTemplateDetail
                v-model="showPreview"
                :currentTemplate="currentTemplate"
            ></PcTemplateDetail>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { debounce, throttle } from 'lodash';
import { ref, Ref } from 'vue';

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
const { copy } = useCopy();
const { addShop } = useShop();
let json: any[] = [];
let index: number = 0;
let pageSize: number = 50;

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
    const max = Math.ceil(json.length / 30);
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
    console.log('tagsLists.value :>> ', tagsLists.value);
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
.tags-page {
    padding-bottom: 130px;
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

    .tag-item {
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
