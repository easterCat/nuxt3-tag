<template>
    <div class="link-list">
        <div class="link-item" v-for="(link, lIndex) in linkList" :key="lIndex">
            <el-link :href="link?.href" target="_blank" type="primary">
                <span v-if="link?.hot" class="hot-link">
                    <el-icon color="red">
                        <i-ep-flag></i-ep-flag>
                    </el-icon>
                </span>
                {{ link.name }} ({{ link.href }})
            </el-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { links } from '@/assets/json/links.js';
import { onMounted, Ref } from 'vue';

interface LinkItem {
    name: string;
    href: string;
    hot?: boolean;
}

const props = defineProps({
    filter: String,
});

const linkList: Ref<LinkItem[]> = ref([{ name: '', href: '' }]);

onMounted(() => {
    if (props.filter) {
        linkList.value = [...links.filter((i) => i.type === props.filter)];
    } else {
        linkList.value = [...links];
    }
});
</script>

<style lang="scss" scoped>
.link-item {
    width: 100%;
    color: grey;
    line-height: 30px;
    cursor: pointer;
}

.hot-link {
    transform: translateY(2px);
    color: red;
    margin-right: 8px;
}
</style>