<template>
    <div class="eh-con">
        <pc-area-title title="EH超多标签列表">
            <template #titleSide>
                <el-switch
                    v-model="showHentai"
                    size="large"
                    inline-prompt
                    inactive-text="隐藏"
                    active-text="开启"
                    class="title-side"
                />
                <span class="eh-title-side-tip">(31813个标签版本,高h,慎重)</span>
            </template>
        </pc-area-title>
        <div v-if="showHentai" class="flex justify-between m-b-10">
            <el-select v-model="selectValue" class="m-2" placeholder="命名空间" size="large">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="`${item?.namespace} ${item?.frontMatters?.name} ${item?.count}条`"
                    :value="item.namespace"
                />
            </el-select>

            <div class="control-blur-btns">
                <button
                    class="btn btn-sm m-r-10"
                    :class="[imgShowType === 'hidden' ? 'btn-accent' : 'btn-secondary']"
                    @click="() => (imgShowType = 'hidden')"
                >
                    隐藏
                </button>
                <button
                    class="btn btn-sm m-r-10"
                    :class="[imgShowType === 'flur' ? 'btn-accent' : 'btn-secondary']"
                    @click="() => (imgShowType = 'flur')"
                >
                    模糊
                </button>
                <button
                    class="btn btn-sm m-r-10"
                    :class="[imgShowType === 'show' ? 'btn-accent' : 'btn-secondary']"
                    @click="() => (imgShowType = 'show')"
                >
                    缩小
                </button>
                <button
                    class="btn btn-sm"
                    :class="[imgShowType === 'default' ? 'btn-accent' : 'btn-secondary']"
                    @click="() => (imgShowType = 'default')"
                >
                    原图
                </button>
            </div>
        </div>
        <el-table
            v-if="showHentai"
            class="m-b-10"
            :data="tableData"
            border
            stripe
            size="large"
            style="width: 100%"
        >
            <el-table-column prop="namespace" label="命名空间" width="130" />
            <el-table-column prop="key" label="原始标签" width="270">
                <template #default="scope">
                    <span class="m-r-12">{{ scope.row?.key || '' }}</span>
                    <el-button size="small" circle @click="addShop(scope.row?.key || '')">
                        <slot name="icon"><i-ep-shopping-trolley></i-ep-shopping-trolley></slot>
                    </el-button>
                    <el-button size="small" circle @click="copy(scope.row?.key || '')">
                        <slot name="icon"><i-ep-document-copy></i-ep-document-copy></slot>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="value" label="名称" width="170">
                <template #default="scope">
                    {{ scope.row?.value?.name?.text || '' }}
                </template>
            </el-table-column>
            <el-table-column prop="value" label="描述">
                <template #default="scope">
                    <div
                        class="table-intro"
                        :class="{
                            'show-img': imgShowType === 'show',
                            'hidden-img': imgShowType === 'hidden',
                            'flur-img': imgShowType === 'flur',
                            'default-img': imgShowType === 'default',
                        }"
                        v-html="scope.row?.value?.intro?.html || ''"
                    ></div>
                </template>
            </el-table-column>
            <el-table-column prop="value" label="数据库页面" width="180">
                <template #default="scope">
                    <div
                        v-html="
                            scope.row?.value?.links?.html.replace(/(<a)/g, `<a target='_blank'`) ||
                            ''
                        "
                    ></div>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="showHentai" class="demo-pagination-block">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[20, 50, 100]"
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

const { EhttApi } = useApi();
const { copy } = useCopy();
const { addShop } = useShop();
const route = useRoute();
const showHentai: Ref<boolean> = ref(false);
const openHentai: Ref<boolean> = ref(false);
const currentPage: Ref<number> = ref(1);
const pageSize: Ref<number> = ref(20);
const total: Ref<number> = ref(0);
const imgShowType = ref('hidden');
const selectValue = ref('');
const options: Ref<any[]> = ref([]);
// 返回的未处理数据
let allEhttData = reactive([]);
// 处理后的数组
let allTableData = reactive([]);
let currentTableData = reactive([]);
let tableData = reactive([]);
let nameList = reactive({ data: [] });

const worker = new Worker('/stable-diffution-utils-nuxt/worker.js');

worker.onmessage = function (e) {
    const { type, data } = e.data;
    if (type === 'all') {
        allTableData = data;
        currentTableData = data;
        total.value = currentTableData.length;
        setTableData();
    }

    if (type === 'select') {
        currentTableData = data;
        total.value = currentTableData.length;
        setTableData();
    }

    if (type === 'search') {
        currentTableData = data;
        total.value = currentTableData.length;
        setTableData();
    }
};

worker.onerror = function (e) {
    console.log(['worker ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message].join(''));
};

watch(showHentai, (newValue) => {
    if (route.name !== 'pc-tags-eh') return;
    if (newValue && !openHentai.value) {
        openHentai.value = true;
        initData();
    }
});

watch(props, (newValue) => {
    if (route.name !== 'pc-tags-eh') return;
    searchTag(newValue.searchText);
});

watch(selectValue, async (newValue) => {
    if (route.name !== 'pc-tags-eh') return;
    worker.postMessage({ type: 'select', data: allTableData, select: newValue });
});

const initData = async () => {
    // 获取命令空间列表
    nameList = await EhttApi.getNameSpaceList();
    options.value = nameList.data;
    // 获取json数据,30000多条
    const result = await EhttApi.getAllJsonData();
    allEhttData = JSON.parse(result).data;
    // 大数据交给worker处理
    worker.postMessage({ type: 'all', data: allEhttData });
};

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
    tableData = currentTableData.slice(
        (currentPage.value - 1) * pageSize.value,
        currentPage.value * pageSize.value,
    );
    console.log('tableData :>> ', tableData);
};

const searchTag = debounce((val?: any) => {
    selectValue.value = '';
    worker.postMessage({ type: 'search', data: allTableData, search: val });
}, 1500);
</script>

<style lang="scss" scoped>
.title-side {
    margin-left: 10px;
    --el-switch-on-color: hsl(var(--a) / 1);
    --el-switch-off-color: hsl(var(--s) / 1);
}

.control-blur-btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.eh-title-side-tip {
    font-size: 12px;
    color: rgb(138, 138, 138);
    margin-left: 10px;
}

:deep(.hidden-img) {
    img {
        display: none !important;
    }
}

:deep(.show-img) {
    img {
        display: inline-block !important;
        max-height: 130px;
    }
}

:deep(.default-img) {
    img {
        display: inline-block !important;
    }
}

:deep(.flur-img) {
    img {
        display: inline-block !important;
        max-height: 130px;
        filter: blur(6px) !important;
    }
}
</style>
