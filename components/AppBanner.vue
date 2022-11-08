<template>
    <div class="banner-con">
        <div class="banner-image">
            <img src="@/assets/imgs/banner/banner.jpeg" alt="" />
        </div>
        <div class="banner-message">完全基于Github Page的静态资源网站,记录使用</div>
        <div class="banner-search">
            <el-input
                class="input-style"
                v-model="input"
                size="large"
                placeholder="Please Input"
                :prefix-icon="Search"
                clearable
            />
        </div>
        <div class="banner-tips">基于nuxt3,vue3,element plus</div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const input = ref("");
</script>

<style lang="scss" scoped>
.banner-con {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 344px;
    z-index: 3;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    border-radius: 10px;

    .banner-image {
        width: 100%;
        height: 344px;
        object-fit: contain;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: -1;
    }

    .banner-message {
        height: 32px;
        font-size: 32px;
        margin: 16px;
        color: #fff;
    }
    .banner-search {
        margin: 16px;
    }
    .banner-tips {
        height: 32px;
        font-size: 16px;
        margin: 16px;
        color: #fff;
    }
}

.input-style {
    width: 500px;
}
</style>
