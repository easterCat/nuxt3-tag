<template>
    <div class="link-list">
        <div class="link-item" v-for="(link, lIndex) in linkList" :key="lIndex">
            <el-link :href="link?.href" target="_blank" type="primary">{{ link.name }} ({{ link.href }})
            </el-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { links, } from "@/assets/json/links.js"
import { onMounted, Ref } from 'vue'

interface LinkItem {
    name: string,
    href: string
}

const linkList: Ref<LinkItem[]> = ref([{ name: '', href: '' }])


onMounted(() => {
    linkList.value = [...links]
})
</script>

<style scoped>
.link-item {
    width: 100%;
    color: grey;
    line-height: 30px;
    cursor: pointer;
}
</style>
