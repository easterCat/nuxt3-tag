<template>
    <NuxtLayout>
        <div class="template-page">
            <el-container>
                <el-header> <AppHeader /></el-header>
                <div class="max-width-limit">
                    <el-container>
                        <el-main>
                            <el-row :gutter="20">
                                <el-col
                                    v-for="(tem, tIndex) in templatesList"
                                    :key="tIndex"
                                    :span="6"
                                >
                                    <el-card
                                        :body-style="{ padding: '0px' }"
                                        @click="cardClick(tem)"
                                    >
                                        <img v-lazy="tem?.preview" class="image" />
                                        <div style="padding: 14px">
                                            <span>{{ tem?.author }}</span>
                                            <div class="bottom">
                                                <time class="time">{{ tem?.name }}</time>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-main>
                    </el-container>
                </div>

                <ClientOnly>
                    <el-dialog v-model="dialogVisible" title="模板信息" width="800px">
                        <el-descriptions :column="1" border>
                            <el-descriptions-item
                                label="Username"
                                label-align="right"
                                align="center"
                                label-class-name="description-label"
                                >{{ currentTem?.name }}</el-descriptions-item
                            >

                            <el-descriptions-item
                                label="正向标签"
                                label-align="right"
                                align="center"
                                label-class-name="description-label"
                                >{{ currentTem?.prompt }}</el-descriptions-item
                            >

                            <el-descriptions-item
                                label="负面标签"
                                label-align="right"
                                align="center"
                                label-class-name="description-label"
                                >{{ currentTem?.nprompt }}</el-descriptions-item
                            >

                            <el-descriptions-item
                                label="step"
                                label-align="right"
                                align="center"
                                label-class-name="description-label"
                                >{{ currentTem?.step }}</el-descriptions-item
                            >

                            <el-descriptions-item
                                label="scale"
                                label-align="right"
                                align="center"
                                label-class-name="description-label"
                                >{{ currentTem?.scale }}</el-descriptions-item
                            >
                        </el-descriptions>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="dialogVisible = false">取消</el-button>
                                <el-button type="primary" @click="dialogVisible = false">
                                    确定
                                </el-button>
                            </span>
                        </template>
                    </el-dialog></ClientOnly
                >
            </el-container>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { templates } from "~~/assets/json/templates";

const templatesList = ref(templates);
const dialogVisible = ref(false);
let currentTem = ref({
    name: "",
    prompt: "",
    nprompt: "",
    step: "",
    scale: "",
    author: "",
    preview: "",
});

const cardClick = (tem: any) => {
    currentTem.value = { ...tem };
    dialogVisible.value = true;
    console.log(currentTem);
};
</script>

<style lang="scss" scoped>
.template-page {
    display: flex;
    justify-content: center;
}

.max-width-limit {
    max-width: 1000px;
    margin: 20px auto 0 auto;
}

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

    img {
        object-fit: contain;
    }
}

:deep(.el-col) {
    margin-bottom: 20px;
    border-radius: 8px;
}

:deep(.description-label) {
    width: 120px;
}
</style>
