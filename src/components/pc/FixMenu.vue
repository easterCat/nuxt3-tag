<template>
    <div class="page-fix-menu">
        <button class="hover-anime-btn btn btn-sm btn-primary btn-circle" @click="linkButtonClick">
            <i-ep-link></i-ep-link>
        </button>

        <client-only>
            <el-drawer
                v-model="drawer"
                size="70%"
                title="常用网站"
                :direction="direction"
                :before-close="handleClose"
            >
                <div>
                    <pc-link-list></pc-link-list>
                </div>
            </el-drawer>
        </client-only>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// daa
const drawer = ref(false);
const direction = ref('ltr');

// methods
const linkButtonClick = () => {
    drawer.value = true;
};

const handleClose = (done: any) => {
    done();
};
</script>

<style lang="scss" scoped>
.page-fix-menu {
    position: fixed;
    bottom: 30px;
    right: 20px;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 40px;
}
</style>
