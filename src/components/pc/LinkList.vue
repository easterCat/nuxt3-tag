<template>
    <div>
        <app-animate name="fadeIn">
            <pc-area-title title="常用"></pc-area-title>
        </app-animate>
        <app-animate name="fadeIn">
            <div class="link-list">
                <div class="link-item" v-for="(link, lIndex) in filterList('hot')" :key="lIndex">
                    <el-link :href="link?.href" target="_blank" type="primary">
                        <span v-if="link?.hot" class="hot-link">
                            <el-icon color="red">
                                <i-ep-flag></i-ep-flag>
                            </el-icon>
                        </span>
                        <span>{{ link.name }}</span>
                    </el-link>
                    <span v-if="showEditBtn" class="icon">
                        <i-ep-edit @click="editLink(link)"></i-ep-edit>
                    </span>
                    <span v-if="showEditBtn" class="icon">
                        <i-ep-delete @click="deleteLink(link?.id)"></i-ep-delete>
                    </span>
                </div>
            </div>
        </app-animate>
        <app-animate name="fadeIn">
            <pc-area-title title="标签"></pc-area-title>
        </app-animate>
        <app-animate name="fadeIn">
            <div class="link-list">
                <div class="link-item" v-for="(link, lIndex) in filterList('prompt')" :key="lIndex">
                    <el-link :href="link?.href" target="_blank" type="primary">
                        <span v-if="link?.hot" class="hot-link">
                            <el-icon color="red">
                                <i-ep-flag></i-ep-flag>
                            </el-icon>
                        </span>
                        <span>{{ link.name }}</span>
                    </el-link>
                    <span v-if="showEditBtn" class="icon">
                        <i-ep-edit @click="editLink(link)"></i-ep-edit>
                    </span>
                    <span v-if="showEditBtn" class="icon">
                        <i-ep-delete @click="deleteLink(link?.id)"></i-ep-delete>
                    </span>
                </div>
            </div>
        </app-animate>
        <app-animate name="fadeIn">
            <pc-area-title title="在线AI"></pc-area-title>
        </app-animate>
        <app-animate name="fadeIn">
            <div class="link-list">
                <div class="link-item" v-for="(link, lIndex) in filterList('online')" :key="lIndex">
                    <el-link :href="link?.href" target="_blank" type="primary">
                        <span v-if="link?.hot" class="hot-link">
                            <el-icon color="red">
                                <i-ep-flag></i-ep-flag>
                            </el-icon>
                        </span>
                        <span>{{ link.name }}</span>
                    </el-link>
                    <span v-if="showEditBtn" class="icon">
                        <i-ep-edit @click="editLink(link)"></i-ep-edit>
                    </span>
                    <span v-if="showEditBtn" class="icon">
                        <i-ep-delete @click="deleteLink(link?.id)"></i-ep-delete>
                    </span>
                </div>
            </div>
        </app-animate>
        <app-animate name="fadeIn">
            <pc-area-title title="未分类"></pc-area-title>
        </app-animate>
        <app-animate name="fadeIn">
            <div class="link-list">
                <div class="link-item" v-for="(link, lIndex) in filterList('other')" :key="lIndex">
                    <el-link :href="link?.href" target="_blank" type="primary">
                        <span v-if="link?.hot" class="hot-link">
                            <el-icon color="red">
                                <i-ep-flag></i-ep-flag>
                            </el-icon>
                        </span>
                        <span>{{ link.name }}</span>
                    </el-link>
                    <span v-if="showEditBtn" class="icon">
                        <i-ep-edit @click="editLink(link)"></i-ep-edit>
                    </span>
                    <span v-if="showEditBtn" class="icon">
                        <i-ep-delete @click="deleteLink(link?.id)"></i-ep-delete>
                    </span>
                </div>
            </div>
        </app-animate>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref } from 'vue';

export interface API {
    refresh: any;
}

interface LinkItem {
    id?: any;
    name: string;
    href: string;
    hot?: boolean;
}

const emit = defineEmits(['editEvent', 'deleteEvent']);
const props = defineProps({
    filter: String,
});
const showEditBtn = ref(false);
const { LinkApi } = useApi();
const { links }: any = await LinkApi.getLinks();
const linkList: Ref<LinkItem[]> = ref([{ name: '', href: '' }]);

const editLink = (link: any) => {
    emit('editEvent', link);
};

const deleteLink = (id: any) => {
    emit('deleteEvent', id);
};

const refresh = async () => {
    const { links }: any = await LinkApi.getLinks();
    linkList.value = links;
};

const filterList = (fil: any) => {
    if (fil) {
        return [...linkList.value.filter((i: any) => (i.type || i.link_type) === fil)];
    } else {
        return [...linkList.value];
    }
};

onMounted(() => {
    linkList.value = links;
    const edit = localStorage.getItem('edit');
    if (edit) showEditBtn.value = true;
});

defineExpose({
    refresh,
});
</script>

<style lang="scss" scoped>
.link-item {
    width: 100%;
    color: grey;
    line-height: 30px;
    cursor: pointer;
}

.icon {
    display: inline-block;
    margin-left: 10px;
    font-size: 12px;
    transform: translateY(4px);
}

.hot-link {
    transform: translateY(2px);
    color: red;
    margin-right: 8px;
}
</style>
