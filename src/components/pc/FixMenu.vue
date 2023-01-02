<template>
    <div class="page-fix-menu">
        <button class="hover-anime-btn btn btn-sm btn-accent btn-circle" @click="draw">
            <Icon name="entypo:brush"></Icon>
        </button>
        <button class="hover-anime-btn btn btn-sm btn-primary btn-circle" @click="linkButtonClick">
            <i-ep-link></i-ep-link>
        </button>

        <ClientOnly>
            <el-drawer
                v-model="drawer"
                size="60%"
                title="常用网站"
                direction="ltr"
                :before-close="handleClose"
            >
                <div>
                    <pc-link-list :show-left-menu="false"></pc-link-list>
                </div>
            </el-drawer>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(false);

const linkButtonClick = () => {
    drawer.value = true;
};

const draw = () => {
    const router = useRouter();
    router.push('/pc/draw');
};

const handleClose = (done: any) => {
    done();
};
</script>

<style lang="scss" scoped>
.page-fix-menu {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 76px;
}
:deep(.el-overlay) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: all 0.5s linear;

    .el-drawer {
        background: hsl(var(--b2) / 1);
    }
}
</style>
