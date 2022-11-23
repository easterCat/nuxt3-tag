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
                        :xl="3"
                    >
                        <el-card :body-style="{ padding: '0px' }">
                            <img v-lazy="tem?.preview" class="image" />
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
            </div>

            <el-dialog v-model="dialogVisible" title="模板信息" width="80%">
                <el-descriptions :column="1" border>
                    <el-descriptions-item
                        label="预览"
                        label-align="right"
                        align="center"
                        label-class-name="description-label"
                    >
                        <el-image :src="currentTem?.preview" lazy />
                    </el-descriptions-item>
                    <el-descriptions-item
                        label="正向标签"
                        label-align="right"
                        align="center"
                        label-class-name="description-label"
                    >
                        <div class="cp" @click="copy(currentTem?.prompt)">
                            {{ currentTem?.prompt }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item
                        label="负面标签"
                        label-align="right"
                        align="center"
                        label-class-name="description-label"
                    >
                        <div class="cp" @click="copy(currentTem?.nprompt)">
                            {{ currentTem?.nprompt }}
                        </div>
                    </el-descriptions-item>

                    <el-descriptions-item
                        label="step"
                        label-align="right"
                        align="center"
                        label-class-name="description-label"
                    >
                        {{ currentTem?.step }}
                    </el-descriptions-item>

                    <el-descriptions-item
                        label="scale"
                        label-align="right"
                        align="center"
                        label-class-name="description-label"
                    >
                        {{ currentTem?.scale }}
                    </el-descriptions-item>
                </el-descriptions>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="success" @click="dialogVisible = false">确定</el-button>
                        <el-button type="warning" @click="setShop(currentTem?.prompt)">
                            加入购物车
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { templates } from '@/assets/json/templates';

const templatesList = ref(templates);
const dialogVisible = ref(false);
const { copy } = useCopy();
let currentTem = ref({
    name: '',
    prompt: '',
    nprompt: '',
    step: '',
    scale: '',
    author: '',
    preview: '',
});

const { setShop } = useShop();

const cardClick = (tem: any) => {
    currentTem.value = { ...tem };
    dialogVisible.value = true;
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
    object-position: center top;
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
</style>
