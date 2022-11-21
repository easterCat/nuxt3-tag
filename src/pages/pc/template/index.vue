<template>
    <NuxtLayout>
        <div class="template-page page">
            <AppHeader />
            <div class="content">
                <el-row :gutter="20">
                    <el-col
                        v-for="(tem, tIndex) in templatesList"
                        :key="tIndex"
                        :xs="24"
                        :sm="12"
                        :md="6"
                        :lg="4"
                        :xl="4"
                    >
                        <el-card :body-style="{ padding: '0px' }">
                            <nuxt-img class="image" :src="tem?.preview" loading="lazy" />
                            <div style="padding: 14px">
                                <span>{{ tem?.author }}</span>
                                <div class="bottom">
                                    <time class="time">{{ tem?.name }}</time>
                                    <div>
                                        <el-button type="success" @click="cardClick(tem)">
                                            模板详情
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <div class="demo-pagination-block">
                    <el-pagination
                        v-model:current-page="pageIndex"
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

            <PcTemplateDetail
                v-model="showPreview"
                :currentTemplate="currentTemplate"
            ></PcTemplateDetail>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';

const pageIndex = ref(1);
const pageSize = ref(50);
const total = ref(0);
const showPreview = ref(false);
const templatesList: Ref<any[] | null> = ref([]);
const currentTemplate: Ref<any | null> = ref(null);
const { copy } = useCopy();
const { setShop } = useShop();

const cardClick = (tem: any) => {
    currentTemplate.value = { ...tem };
    showPreview.value = true;
};

const loadData = async () => {
    const { TemplateApi } = useApi();
    const result: any = await TemplateApi.getTemplates({
        pageIndex: pageIndex.value,
        pageSize: pageSize.value,
    });
    templatesList.value = result?.templates;
    total.value = result.total;
};

loadData();

const handleSizeChange = async (val: number) => {
    pageIndex.value = 1;
    pageSize.value = val;
    loadData();
};

const handleCurrentChange = async (val: number) => {
    pageIndex.value = val;
    loadData();
};
</script>

<style lang="scss" scoped>
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    height: 280px;
    display: block;
    background: rgb(148, 148, 148);
    object-fit: cover;
    object-position: center center;
}

:deep(.el-col) {
    margin-bottom: 20px;
    border-radius: 8px;
}

:deep(.description-label) {
    width: 120px;
}

:deep(.el-card) {
    border-radius: 10px;
}

.demo-pagination-block {
    padding: 30px 0;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
