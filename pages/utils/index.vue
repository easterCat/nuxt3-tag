<template>
    <NuxtLayout>
        <div class="utils-page">
            <el-container>
                <el-header> <AppHeader /></el-header>
                <div class="max-width-limit">
                    <el-container>
                        <el-main width="1000px">
                            <el-row :gutter="12">
                                <el-col :span="8">
                                    <el-card shadow="always"> Always </el-card>
                                </el-col>
                                <el-col :span="8">
                                    <el-card shadow="hover"> Hover </el-card>
                                </el-col>
                                <el-col :span="8">
                                    <el-card shadow="never"> Never </el-card>
                                </el-col>
                            </el-row>
                        </el-main>
                    </el-container>
                </div>
            </el-container>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.utils-page {
    display: flex;
    justify-content: center;
}

.max-width-limit {
    max-width: 1000px;
    margin: 0 auto;
}

.image {
    width: 100%;
    height: 0;
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
