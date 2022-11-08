<template>
    <div class="page-fix-menu">
        <el-button type="success" icon="el-icon-link" circle @click="linkButtonClick"></el-button>

        <ClientOnly>
            <el-drawer
                title="常用网站"
                :visible.sync="drawer"
                :direction="direction"
                :before-close="handleClose"
            >
                <div>
                    <PcLinkList></PcLinkList>
                </div>
            </el-drawer>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(false);
const direction = ref("ltr");

const linkButtonClick = () => {
    drawer.value = true;
};

const handleClose = (done: any) => {
    done();
};
</script>

<style scoped>
.page-fix-menu {
    position: fixed;
    bottom: 30px;
    right: 20px;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
</style>
