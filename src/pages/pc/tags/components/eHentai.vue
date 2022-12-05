<template>
    <div class="eh-con">
        <pc-area-title title="EH标签列表">
            <template #titleSide>
                <el-switch
                    v-model="showHentai"
                    size="large"
                    inline-prompt
                    inactive-text="隐藏"
                    active-text="开启"
                    class="title-side"
                />
                <span class="eh-title-side-tip">(577个标签版本,高h,慎重)</span>
            </template>
        </pc-area-title>
        <div v-if="showHentai" class="tag-list">
            <div v-for="(e, eIndex) in ehLists" :key="eIndex" class="tag-item" @click="copy(e?.v)">
                <div class="text-con">
                    <p class="zh">{{ e?.k }}</p>
                    <p class="en">{{ e?.v }}</p>
                </div>
                <div>
                    <el-button size="small" circle @click="addShop(e?.v)">
                        <slot name="icon"><i-ep-shopping-trolley></i-ep-shopping-trolley></slot>
                    </el-button>
                    <el-button size="small" circle @click="copy(e?.v)">
                        <slot name="icon"><i-ep-document-copy></i-ep-document-copy></slot>
                    </el-button>
                </div>
            </div>
        </div>
        <div v-if="showHentai" class="demo-pagination-block">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[50, 100]"
                :background="true"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { debounce } from '~/utils/index';

interface EhListItem {
    k?: string;
    v?: string;
}

const props = defineProps({
    searchText: { type: String, default: '' },
});
const { EhtagsApi } = useApi();
const data = await EhtagsApi.getEhtags();
const ehResult = JSON.parse(data);
const showHentai: Ref<boolean> = ref(false);
const ehLists: Ref<EhListItem[]> = ref<EhListItem[]>([]);
const currentPage: Ref<number> = ref(1);
const pageSize: Ref<number> = ref(50);
const total: Ref<number> = ref(0);
const { copy } = useCopy();
const { addShop } = useShop();

watch(
    () => props.searchText,
    (newValue) => {
        searchTag(newValue);
    },
);

const handleSizeChange = (val: number) => {
    pageSize.value = val;
    currentPage.value = 1;
    setEhData();
};

const handleCurrentChange = (val: number) => {
    currentPage.value = val;
    setEhData();
};

const setEhData = () => {
    ehLists.value = ehResult.slice((currentPage.value - 1) * 50, currentPage.value * 50);
};

const searchTag = debounce((val?: any) => {
    const findEhList = ehResult.filter((i: any) => {
        return i.k.includes(val);
    });
    if (findEhList) {
        currentPage.value = 1;
        ehLists.value = findEhList.slice((currentPage.value - 1) * 50, currentPage.value * 50);
        total.value = findEhList.length;
    }
}, 1000);

onMounted(() => {
    total.value = ehResult.length;
    setEhData();
});
</script>

<style lang="scss" scoped>
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
        background: white;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 2px 8px;
        border-radius: 10px;
        margin-bottom: 15px;
        margin-right: 15px;
        cursor: pointer;

        .text-con {
            margin-bottom: 8px;
        }

        .zh {
            color: rgb(49, 49, 49);
            margin-bottom: 4px;
        }
    }
}
</style>
