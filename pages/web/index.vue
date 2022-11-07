<template>
    <NuxtLayout>
        <div class="web-page">
            <el-container>
                <el-header> <AppHeader /></el-header>
                <div class="max-width-limit">
                    <el-container>
                        <el-main width="1000px">
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <el-button type="primary" @click="cardClick('navigate')">
                                        web前端导航
                                    </el-button>
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
const router = useRouter();
const cardClick = (p: String) => {
    router.push({
        path: `/web/${p}`,
    });
};
</script>

<style lang="scss" scoped>
.web-page {
    display: flex;
    justify-content: center;
}

.max-width-limit {
    max-width: 1000px;
    margin: 20px auto 0 auto;
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
