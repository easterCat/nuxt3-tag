<template>
    <NuxtLayout>
        <div class="design-page page" :class="{ white: radio === '2' }">
            <div class="header">
                <div class="back">
                    <i-ep-arrow-left-bold @click="goBack"></i-ep-arrow-left-bold>
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="返回首页"
                        placement="bottom"
                    >
                        <i-ep-home-filled @click="goHome"></i-ep-home-filled>
                    </el-tooltip>
                </div>
                <div class="header-center">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="导入标签"
                        placement="bottom"
                    >
                        <i-ep-shopping-trolley @click="importShop" />
                    </el-tooltip>
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="新建标签"
                        placement="bottom"
                    >
                        <i-ep-plus @click="createNewShopItem" />
                    </el-tooltip>
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="复制标签"
                        placement="bottom"
                    >
                        <i-ep-copy-document @click="copyShop" />
                    </el-tooltip>
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="翻译标签"
                        placement="bottom"
                    >
                        <i-ep-guide @click="translatePrompt" />
                    </el-tooltip>
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="清空标签"
                        placement="bottom"
                    >
                        <i-ep-delete @click="clearShop" />
                    </el-tooltip>
                </div>
                <div class="header-right">
                    <el-radio-group v-model="radio" class="ml-4">
                        <el-radio label="1" size="large">深色</el-radio>
                        <el-radio label="2" size="large">浅色</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="body">
                <div class="left">
                    <div class="left-layer1">
                        <div class="layer-top">数据来源</div>
                        <div class="layer-bottom">
                            <div
                                class="left-menu"
                                :class="{ 'item-active': itemActive === 1 }"
                                @click="changeItem(1)"
                            >
                                常规标签
                            </div>
                            <div
                                class="left-menu"
                                :class="{ 'item-active': itemActive === 2 }"
                                @click="changeItem(2)"
                            >
                                Gelbooru标签
                            </div>
                            <div
                                class="left-menu"
                                :class="{ 'item-active': itemActive === 3 }"
                                @click="changeItem(3)"
                            >
                                EH标签(500个)
                            </div>
                            <div
                                class="left-menu"
                                :class="{ 'item-active': itemActive === 4 }"
                                @click="changeItem(4)"
                            >
                                EH标签(31000个)
                            </div>
                        </div>
                        <div class="layer-top">标签类别</div>
                        <div class="type-list" v-if="itemActive === 1">
                            <div
                                v-for="(m, mIndex) in tagsMenus"
                                class="type-item"
                                :class="{
                                    'type-item-active ': mIndex === typeActive,
                                }"
                                :key="mIndex"
                                @click="changeTypeItem(mIndex)"
                            >
                                {{ m?.name }}
                            </div>
                        </div>
                        <div class="type-list" v-if="itemActive === 2">
                            <div
                                v-for="(m, mIndex) in category"
                                class="type-item"
                                :class="{
                                    'type-item-active ': mIndex === typeActive,
                                }"
                                :key="mIndex"
                                @click="changeTypeItem(mIndex, m?.id)"
                            >
                                {{ m?.name }}({{ m?.level }})
                            </div>
                        </div>
                    </div>
                </div>
                <div class="center">
                    <div class="shop-card-con">
                        <draggable
                            v-model="shopList"
                            :component-data="{ name: 'list' }"
                            :dragOptions="dragOptions"
                            :item-key="
                            (e:any) => {
                                createKey(e);
                            }
                        "
                        >
                            <template #item="{ element }">
                                <div class="shop-item">
                                    <div>
                                        <span>{{ element.text }}</span>
                                        <span class="tran-text">{{ element.translateText }}</span>
                                        <i-ep-plus
                                            class="add"
                                            @click="addOneCircle(element.text)"
                                        ></i-ep-plus>
                                        <i-ep-minus
                                            class="minus"
                                            @click="removeOneCircle(element.text)"
                                        ></i-ep-minus>
                                        <i-ep-edit-pen
                                            class="remove"
                                            @click="renameShopName(element.text)"
                                        ></i-ep-edit-pen>
                                        <i-ep-delete-filled
                                            class="remove"
                                            @click="removeShopByName(element.text)"
                                        ></i-ep-delete-filled>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
                <div class="right">
                    <div class="tag-list">
                        <template v-if="itemActive === 1">
                            <div class="tag-item" v-for="(o, oIndex) in tagsLists" :key="oIndex">
                                <div class="text-con">
                                    <p class="zh">{{ o?.zh }} {{ o?.en }}</p>
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
                        </template>
                        <template v-if="itemActive === 2">
                            <div class="tag-item" v-for="(o, oIndex) in gtags" :key="oIndex">
                                <div class="text-con">
                                    <p class="zh">{{ o?.t_name }} {{ o?.name }}</p>
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
                        </template>
                    </div>
                </div>
            </div>
            <app-animate>
                <div class="import-wrapper" v-if="showImport">
                    <div class="import-layer">
                        <textarea v-model="importText" type="text" />
                    </div>
                    <div class="import-button">
                        <button @click="() => (showImport = false)">取消</button>
                        <button @click="confirmImport">确定</button>
                    </div>
                </div>
            </app-animate>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import draggable from 'vuedraggable';
import { uuid } from 'vue-uuid';

defineProps(['modelValue']);

// data
const { DefaultTagsApi } = useApi();
const result = await DefaultTagsApi.getTags();
const tags = JSON.parse(result);
const config = useRuntimeConfig();
const token = config.public.GELBOORU_TOKEN;
const dragOptions = reactive({
    animation: 400,
    group: 'people',
    disabled: false,
    ghostClass: 'ghost',
});
const { GelbooruApi, ShopApi } = useApi();
const router = useRouter();
const radio = ref('1');
const importText = ref('');
const showImport = ref(false);
const itemActive = ref(1);
const typeActive = ref(0);
const { copy } = useCopy();
const {
    addShop,
    renameShopName,
    shopList,
    onlySetShop,
    initShop,
    setShop,
    clearShop,
    removeShopByName,
    copyShop,
    addOneCircle,
    removeOneCircle,
    createNewShopItem,
} = useShop();
const tagsMenus = ref(tags.class);
const tagsLists = ref(tagsMenus.value[0].data);
const category: Ref<any[]> = ref<any[]>([]);
const gtags: Ref<any[]> = ref<any[]>([]);

watch(shopList, (newValue) => {
    onlySetShop(newValue.map((i: any) => i.text).join(', '));
});

const goBack = () => {
    router.go(-1);
};

const goHome = () => {
    router.replace('/pc/home');
};

const importShop = () => {
    showImport.value = true;
};

const confirmImport = () => {
    setShop(importText.value);
    showImport.value = false;
};

const translatePrompt = () => {
    shopList.value.forEach((item: any, index: number) => {
        setTimeout(async () => {
            const result = await ShopApi.translate({ text: item.text, type: 1 });
            shopList.value[index] = { text: item.text, translateText: result.data.translateText };
        }, index * 100);
    });
};

const initGelbooru = async () => {
    const result = await GelbooruApi.getList();
    category.value = result.data;
};

const changeItem = (active: number) => {
    itemActive.value = active;
    typeActive.value = 0;
    if (active === 2) {
        initGelbooru();
    }
};

const changeTypeItem = async (active: number, id?: number) => {
    if (itemActive.value === 1) {
        tagsLists.value = tagsMenus.value[active].data;
        typeActive.value = active;
    } else if (itemActive.value === 2) {
        const result = await GelbooruApi.getTagsById({
            token: token,
            page: 1,
            limit: 100,
            category_id: id,
        });
        typeActive.value = active;
        gtags.value = result.data;
    }
};

const createKey = (e: any) => {
    return `${e}-${uuid.v4()}`;
};

onMounted(() => {
    initShop();
});
</script>

<style lang="scss" scoped>
.white {
    filter: invert(1);
}
.design-page {
    min-height: 100vh;

    .header {
        height: 50px;
        background: rgb(37, 46, 65);
        border-bottom: 2px solid rgb(24, 29, 40);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header-center {
        width: 180px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        svg {
            font-size: 18px;
            color: rgb(184, 194, 211);
            cursor: pointer;
        }
    }

    .header-right {
        padding-right: 10px;
        :deep(.el-radio__inner) {
            background: rgb(184, 194, 211);
        }

        :deep(.el-radio__label) {
            color: rgb(184, 194, 211);
        }

        :deep(.el-radio__inner::after) {
            background: rgb(51, 65, 86);
        }
    }

    .body {
        display: flex;
    }

    .left {
        width: 298px;
        height: calc(100vh - 51px);
        background: rgb(37, 46, 65);
        border-right: 2px solid rgb(24, 29, 40);
        overflow-x: hidden;
        overflow-y: auto;
    }
    .right {
        width: 380px;
        height: calc(100vh - 51px);
        background: rgb(37, 46, 65);
        border-left: 2px solid rgb(24, 29, 40);
        overflow-x: hidden;
        overflow-y: auto;
    }
    .center {
        flex: 1;
        height: calc(100vh - 51px);
        background: rgb(24, 29, 40);
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .back {
        width: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 10px;
        svg {
            font-size: 18px;
            color: rgb(135, 150, 179);
            cursor: pointer;
        }

        svg:last-child {
            font-size: 21px;
            transform: translateY(-1px);
        }
    }

    .shop-card-con {
        > div {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
        }
    }

    .shop-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        color: rgb(19, 24, 31);
        background: rgb(192, 199, 219);
        margin-right: 16px;
        margin-bottom: 20px;
        border-radius: 4px;
        box-shadow: rgba(17, 17, 26, 0.15) 0px 3px 8px;
        cursor: pointer;
        font-weight: bold;

        svg {
            font-size: 14px;
            margin-left: 8px;
            transform: translateY(3px);
        }

        .tran-text {
            position: absolute;
            left: 0;
            top: -18px;
            color: rgb(192, 199, 219);
            font-size: 10px;
            margin-left: 6px;
        }
    }

    .layer-top {
        height: 56px;
        line-height: 56px;
        background: rgb(33, 41, 56);
        color: rgb(135, 150, 179);
        padding: 0 10px;
        font-size: 18px;
        font-weight: bold;
    }
    .layer-bottom {
        background: rgb(30, 35, 51);
        padding: 10px 0;
    }

    .left-menu {
        font-size: 16px;
        height: 42px;
        line-height: 42px;
        color: rgb(135, 150, 179);
        font-weight: bold;
        cursor: pointer;
        padding: 0 10px;
    }

    .item-active {
        background: rgb(19, 24, 35);
    }
    .type-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 10px 0;
    }
    .type-item {
        color: rgb(192, 199, 219);
        padding: 8px;
        cursor: pointer;
        font-size: 14px;
    }

    .type-item-active {
        color: rgb(20, 132, 235);
    }

    .tag-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 20px;

        .tag-item {
            padding: 6px 12px;
            border-radius: 10px;
            margin-bottom: 15px;
            margin-right: 15px;
            cursor: pointer;
            color: rgb(19, 24, 35);
            background: rgb(192, 199, 219);

            button {
                background: rgb(51, 65, 86);
            }

            svg {
                font-size: 12px;
                color: rgb(188, 191, 211);
            }

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
        }
    }
}

.import-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(51, 65, 86, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .import-layer {
        width: 550px;
        height: 350px;
        background: rgb(188, 191, 211);
        border-radius: 4px;
        overflow-x: hidden;
        overflow-y: auto;
        box-shadow: rgba(188, 191, 211, 0.1) 0px 0px 3px 6px;
        box-sizing: border-box;
        padding: 10px;

        textarea {
            background: transparent;
            width: 530px;
            min-height: 330px;
            height: auto;
            box-sizing: border-box;
            padding: 5px;
        }
    }
    .import-button {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 10px;

        button {
            margin: 10px;
            background: rgb(188, 191, 211);
            color: rgb(24, 29, 40);
            padding: 8px 24px;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            box-shadow: rgba(188, 191, 211, 0.1) 0px 0px 3px 6px;
        }
    }
}
</style>
