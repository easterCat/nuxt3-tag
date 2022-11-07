<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
        <el-menu-item index="0">Stable Diffusion</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/home" @click="handleNavClick('home')">首页</el-menu-item>
        <el-menu-item index="/utils" @click="handleNavClick('utils')">工具</el-menu-item>
        <el-menu-item index="/tags" @click="handleNavClick('tags')">标签</el-menu-item>
        <el-menu-item index="/template" @click="handleNavClick('template')">模板</el-menu-item>
        <el-menu-item index="/web" @click="handleNavClick('web')">Web</el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const router = useRouter();
const route = useRoute();
const path = ref(route.path);
const activeIndex = ref(path ?? "/home");

const handleNavClick = (link: string) => {
    router.push({ path: `/${link}` });
};
</script>

<style>
.flex-grow {
    flex-grow: 1;
}
</style>
