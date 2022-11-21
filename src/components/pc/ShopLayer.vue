<template>
    <div>
        <app-animate name="fadeIn">
            <div v-if="modelValue" class="shop-card">
                <div class="shop-card-header">
                    <span>
                        <PcAnimationButton
                            :buttonStyle="1"
                            buttonColor="245, 108, 108"
                            buttonAngel="145deg"
                            buttonWidth="120px"
                            buttonText="清空购物车"
                            buttonSize="large"
                            @submit="clearShop"
                        ></PcAnimationButton>
                        <PcAnimationButton
                            :buttonStyle="1"
                            buttonColor="245, 108, 108"
                            buttonAngel="145deg"
                            buttonWidth="110px"
                            buttonText="复制标签"
                            buttonSize="large"
                            @submit="copyShop"
                        ></PcAnimationButton>
                        <PcAnimationButton
                            :buttonStyle="1"
                            buttonColor="245, 108, 108"
                            buttonAngel="145deg"
                            buttonWidth="110px"
                            buttonText="新增标签"
                            buttonSize="large"
                            @submit="createNewShopItem"
                        ></PcAnimationButton>
                    </span>
                    <i-ep-close-bold @click="shopEvent"></i-ep-close-bold>
                </div>
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
        </app-animate>
    </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import draggable from 'vuedraggable';
import { uuid } from 'vue-uuid';

defineProps(['modelValue']);
const $emit = defineEmits(['update:modelValue']);

// data
const dragOptions = reactive({
    animation: 400,
    group: 'people',
    disabled: false,
    ghostClass: 'ghost',
});
const {
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

watch(shopList, (newValue) => {
    onlySetShop(newValue.map((i: any) => i.text || '').join(', '));
});

const shopEvent = () => {
    $emit('update:modelValue', false);
};

const createKey = (e: any) => {
    return `${e}-${uuid.v4()}`;
};

onMounted(() => {
    initShop();
});
</script>

<style lang="scss" scoped>
header {
    position: sticky;
    top: 0px;
    z-index: 1001;
    display: flex;
    background: #fff;
    box-shadow: rgba(17, 17, 26, 0.15) 0px 3px 8px;

    .header-menu {
        flex: 1;
    }

    .user-info {
        width: 260px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 20px;
    }
}

:deep(.el-menu) {
    height: 72px;
}

.shop-card {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3001;
    background: #fff;
    padding: 30px 40px;
    overflow-y: auto;

    .shop-card-header {
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        color: rgb(97, 96, 96);

        svg {
            cursor: pointer;
        }
    }

    .shop-card-con {
        margin-top: 20px;

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
        color: #666;
        background: linear-gradient(145deg, rgb(233, 233, 233) 0%, rgba(233, 233, 233, 0.7) 100%);
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
}

:deep(.el-menu--horizontal) {
    border-bottom: none;
}
</style>
