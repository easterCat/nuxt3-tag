<template>
    <NuxtLayout>
        <div class="design-page page" :class="{ white: radio === '2' }">
            <div class="header">
                <div class="back">
                    <i-ep-arrow-left-bold @click="goBack"></i-ep-arrow-left-bold>
                    <i-ep-home-filled @click="goHome"></i-ep-home-filled>
                </div>
                <div class="header-center">
                    <i-ep-delete @click="clearShop" />
                    <i-ep-copy-document @click="copyShop" />
                    <i-ep-plus @click="createNewShopItem" />
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
                        <div class="type-list">
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
                                        <span>{{ element }}</span>
                                        <i-ep-plus
                                            class="add"
                                            @click="addOneCircle(element)"
                                        ></i-ep-plus>
                                        <i-ep-minus
                                            class="minus"
                                            @click="removeOneCircle(element)"
                                        ></i-ep-minus>
                                        <i-ep-delete-filled
                                            class="remove"
                                            @click="removeShopByName(element)"
                                        ></i-ep-delete-filled>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
                <div class="right">
                    <div class="tag-list">
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
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { tags } from '~/assets/json/tags';
import draggable from 'vuedraggable';
import { uuid } from 'vue-uuid';

defineProps(['modelValue']);

// data
const dragOptions = reactive({
    animation: 400,
    group: 'people',
    disabled: false,
    ghostClass: 'ghost',
});
const router = useRouter();
const radio = ref('1');
const itemActive = ref(1);
const typeActive = ref(0);
const { copy } = useCopy();
const {
    addShop,
    shopList,
    onlySetShop,
    initShop,
    clearShop,
    removeShopByName,
    copyShop,
    addOneCircle,
    removeOneCircle,
    createNewShopItem,
} = useShop();
const tagsMenus = ref(tags.class);
const tagsLists = ref(tagsMenus.value[0].data);

watch(shopList, (newValue) => {
    onlySetShop(newValue.join(', '));
});

const goBack = () => {
    router.go(-1);
};

const goHome = () => {
    router.replace('/pc/home');
};

const changeItem = (active: number) => {
    itemActive.value = active;
};

const changeTypeItem = (active: number) => {
    tagsLists.value = tagsMenus.value[active].data;
    typeActive.value = active;
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
        width: 100px;
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
        width: 300px;
        height: calc(100vh - 51px);
        background: rgb(37, 46, 65);
        border-right: 2px solid rgb(24, 29, 40);
        overflow-x: hidden;
        overflow-y: auto;
    }
    .right {
        width: 400px;
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
        width: 60px;
        display: flex;
        justify-content: space-between;
        margin-left: 20px;
        svg {
            color: rgb(135, 150, 179);
            cursor: pointer;
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
        margin-bottom: 16px;
        border-radius: 4px;
        box-shadow: rgba(17, 17, 26, 0.15) 0px 3px 8px;
        cursor: pointer;
        font-weight: bold;

        svg {
            font-size: 14px;
            margin-left: 8px;
            transform: translateY(3px);
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
        padding: 10px 10px;
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
</style>
