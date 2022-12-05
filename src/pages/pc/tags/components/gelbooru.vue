<template>
    <div class="eh-con">
        <pc-area-title title="Gelbooru标签列表">
            <template #titleSide>
                <span class="eh-title-side-tip">(分类不好用,用搜索)</span>
            </template>
        </pc-area-title>
        <div class="flex justify-between m-b-10">
            <el-select v-model="selectValue" placeholder="类别" size="large">
                <el-option
                    v-for="item in category"
                    :key="item.value"
                    :label="`${item?.name}-${item?.level}`"
                    :value="item?.id"
                />
            </el-select>
        </div>
        <el-table class="m-b-10" :data="tableTags" border stripe size="large" style="width: 100%">
            <el-table-column prop="name" label="原始标签" width="320">
                <template #default="scope">
                    <span class="m-r-12">{{ scope.row?.name || '' }}</span>
                    <el-button size="small" circle @click="addShop(scope.row?.name || '')">
                        <slot name="icon"><i-ep-shopping-trolley></i-ep-shopping-trolley></slot>
                    </el-button>
                    <el-button size="small" circle @click="copy(scope.row?.name || '')">
                        <slot name="icon"><i-ep-document-copy></i-ep-document-copy></slot>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="t_name" label="名称" width="250"></el-table-column>
            <el-table-column prop="t_name" label="NSFW" width="100">
                <template #default="scope">
                    {{ scope.row.is_nsfw ? '是' : '否' }}
                </template>
            </el-table-column>
            <el-table-column prop="desc" label="描述"></el-table-column>
            <el-table-column prop="remarks" label="详细"></el-table-column>
        </el-table>
        <div class="demo-pagination-block">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]"
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

const props = defineProps({
    searchText: { type: String, default: '' },
});
// data
const config = useRuntimeConfig();
const token = config.public.GELBOORU_TOKEN;
const { GelbooruApi } = useApi();
const { copy } = useCopy();
const { addShop } = useShop();
const category: Ref<any[]> = ref<any[]>([]);
const tags: Ref<any[]> = ref<any[]>([]);
const tableTags: Ref<any[]> = ref<any[]>([]);
const selectValue: Ref<any> = ref(1100);
const currentPage: Ref<number> = ref(1);
const pageSize: Ref<number> = ref(100);
const total: Ref<number> = ref(0);

const result = await GelbooruApi.getList();
category.value = result.data;

watch(
    () => {
        return props.searchText;
    },
    (newValue) => {
        searchTag(newValue);
    },
);

watch(selectValue, async (newValue) => {
    if (newValue) {
        const result = await GelbooruApi.getTagsById({
            token,
            page: 1,
            limit: 100,
            category_id: newValue,
        });
        tags.value = result.data;
        total.value = result?.data?.length;
        setTableData();
    }
});

const handleSizeChange = (val: number) => {
    pageSize.value = val;
    currentPage.value = 1;
    setTableData();
};

const handleCurrentChange = (val: number) => {
    currentPage.value = val;
    setTableData();
};

const setTableData = () => {
    tableTags.value = tags.value.slice(
        (currentPage.value - 1) * pageSize.value,
        currentPage.value * pageSize.value,
    );
};

const searchTag = debounce(async (val?: any) => {
    selectValue.value = null;
    const result = await GelbooruApi.searchTags({
        token: 'b8d9e7d1fa1dcc3e5116760c093be229',
        keyword: val,
        page: 2,
        limit: 100,
    });
    tags.value = result.data;
    if (result.data.length == 100) {
        total.value = result.data.length + 1;
    } else {
        total.value = result.data.length;
    }

    setTableData();
}, 1500);

onMounted(() => {
    setTableData();
});
</script>

<style lang="scss" scoped>
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
</style>
