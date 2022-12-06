<template>
    <div class="link-con">
        <div class="link-left bg-base-100">
            <ul>
                <li
                    v-for="(item, index) in types"
                    :key="index"
                    v-scroll-to="{
                        target: `.part:nth-child(${index + 1}) > h2`,
                        container: '.link-right',
                        behavior: 'smooth',
                        cb: (findIndex:number) => changeType(findIndex||findIndex===0 ? findIndex : index),
                    }"
                    :class="{ active: typeActive === index }"
                >
                    {{ item }}
                </li>
                <template v-if="showAddBtn">
                    <button class="btn-primary btn-block btn" @click="addNewLink">新增链接</button>
                </template>
            </ul>
        </div>
        <div class="link-right">
            <div class="right-linear"></div>
            <div class="part-list">
                <template v-for="(typeItem, tIndex) in types" :key="typeItem">
                    <div id="media" class="part" :data-title="typeItem" :data-index="tIndex">
                        <h2 class="">
                            <strong>{{ typeItem }}</strong>
                        </h2>
                        <div class="row">
                            <div
                                v-for="(link, lIndex) in filterList(typeItem)"
                                :key="lIndex"
                                class="item bg-base-100"
                            >
                                <a :href="link?.href" target="_blank">
                                    <h3>
                                        <img :src="link?.icon ?? none" />
                                        <span>{{ link.name }}</span>
                                        <i v-if="link?.hot" class="hot-link">
                                            <el-icon color="red">
                                                <i-ep-flag></i-ep-flag>
                                            </el-icon>
                                        </i>
                                    </h3>
                                    <p>{{ link?.desc ? link?.desc : '暂无描述' }}</p>
                                </a>
                                <div class="opeartion">
                                    <span v-if="showEditBtn" class="icon">
                                        <i-ep-edit @click="editLink(link)"></i-ep-edit>
                                    </span>
                                    <span v-if="showEditBtn" class="icon">
                                        <i-ep-delete @click="deleteLink(link?.id)"></i-ep-delete>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <el-dialog
            v-model="showDialog"
            :title="operation === 'add' ? '新增' : '编辑'"
            width="600px"
            destroy-on-close
            :before-close="handleDialogClose"
        >
            <div>
                <el-form ref="ruleFormRef" label-width="110px">
                    <el-form-item label="链接名称">
                        <el-input v-model="name" />
                    </el-form-item>
                    <el-form-item label="链接">
                        <el-input v-model="href" />
                    </el-form-item>
                    <el-form-item label="类别">
                        <el-input v-model="type" />
                    </el-form-item>
                    <div style="float: right">(hot,prompt,online,other)</div>
                    <el-form-item label="热门">
                        <el-switch v-model="hot" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleDialogClose">取消</el-button>
                    <el-button type="primary" @click="confirm">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref } from 'vue';
import { ID_INJECTION_KEY } from 'element-plus';
import type { FormInstance } from 'element-plus';
import none from '~/assets/imgs/none.png';

export interface API {
    refresh: any;
}

const nuxtApp = useNuxtApp();
nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 1000),
    current: 0,
});

interface LinkItem {
    id?: any;
    name: string;
    href: string;
    hot?: boolean;
    desc?: string;
    link_type?: string;
    icon?: string;
}

defineEmits(['editEvent', 'deleteEvent']);
defineProps({
    filter: String,
});
const showEditBtn = ref(false);
const { LinkApi } = useApi();
const { links }: any = await LinkApi.getLinks();
const linkList: Ref<LinkItem[]> = ref([{ name: '', href: '' }]);
const types: Ref<any[]> = ref([]);
const typeActive = ref(0);

linkList.value = links;
types.value = [...new Set(links.map((i: any) => i.link_type))];

const showAddBtn = ref(false);
const showDialog = ref(false);
const operation = ref('');
const ruleFormRef = ref<FormInstance>();
const name = ref('');
const href = ref('');
const type = ref('');
const hot = ref(false);
const id: Ref<number | null> = ref(null);

const refresh = async () => {
    const { links }: any = await LinkApi.getLinks();
    linkList.value = links;
};

// defineExpose({
//     refresh,
// });

const changeType = (index: number) => {
    typeActive.value = index;
};

const addNewLink = () => {
    showDialog.value = true;
    operation.value = 'add';
};

const handleDialogClose = () => {
    showDialog.value = false;
    operation.value = '';
    nextTick(() => {
        ruleFormRef.value?.resetFields();
    });
};

const confirm = () => {
    if (operation.value === 'add') add();
    if (operation.value === 'edit') update();
};

const add = async () => {
    const result = await LinkApi.addLink({
        name: name.value,
        href: href.value,
        type: type.value,
        hot: hot.value,
    });
    if (result.code === 200) {
        handleDialogClose();
        nextTick(() => {
            refresh();
        });
        return ElMessage({
            showClose: true,
            message: '新建成功',
            type: 'success',
        });
    }
};

const update = async () => {
    const result = await LinkApi.updateLink({
        name: name.value,
        href: href.value,
        type: type.value,
        hot: hot.value,
        id: id.value,
    });
    if (result.code === 200) {
        handleDialogClose();
        nextTick(() => {
            refresh();
        });
        return ElMessage({
            showClose: true,
            message: '更新成功',
            type: 'success',
        });
    }
};

const deleteLink = async (id: any) => {
    const result = await LinkApi.deleteLink({ id });
    if (result.code === 200) {
        nextTick(() => {
            refresh();
        });
        return ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success',
        });
    }
};

const editLink = (data: any) => {
    name.value = data.name;
    href.value = data.href;
    type.value = data.link || data.link_type;
    hot.value = data.hot;
    id.value = data.id;
    showDialog.value = true;
    operation.value = 'edit';
};

const filterList = (fil: any) => {
    if (fil) {
        return [...linkList.value.filter((i: any) => i.link_type === fil)];
    } else {
        return [];
    }
};

onMounted(() => {
    const edit = localStorage.getItem('edit');
    if (edit) showEditBtn.value = true;
    if (edit) showAddBtn.value = true;
});
</script>

<style lang="scss" scoped>
.link-con {
    display: flex;
    justify-content: flex-end;

    .link-left {
        position: sticky;
        top: 102px;
        width: 290px;
        height: calc(100vh - 112px);
        border-radius: 10px;

        ul {
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow: auto;
            border-radius: 10px;
        }

        li {
            display: block;
            width: auto;
            padding: 0 14px;
            height: 36px;
            line-height: 36px;
            cursor: pointer;
            font-size: 15px;
            text-align: center;
        }

        li:hover {
            background-color: hsl(var(--p) / 0.4);
            color: hsl(var(--pc) / 1);
            transition: all 0.3s ease-in-out;
        }

        .active {
            background-color: hsl(var(--p) / 1);
            color: hsl(var(--pc) / 1);
            transition: all 0.3s ease-in-out;
        }
    }
    .link-right {
        position: relative;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0 30px 20px 0px;
        margin-left: 30px;
        height: calc(100vh - 112px);
        overflow-x: hidden;
        overflow-y: auto;
    }

    .part-list {
        width: 100%;
    }

    .content-sidebar {
        font-size: 14px;
        color: #3b3c3e;
        margin-top: 18px;
    }
    .part {
        width: 100%;
    }

    .part h2 {
        padding: 20px 10px 15px 10px;
        line-height: 16px;
    }

    .part h2:nth-child(1) {
        padding: 8px 10px 15px 10px;
    }

    .part h2 strong {
        color: #3c3c3c;
        font-size: 16px;
        position: relative;
    }
    .part h2 a {
        display: inline-block;
        margin-top: 4px;
        color: #1d96db;
        font-size: 12px;
    }

    .content .row {
        position: relative;
    }

    .row {
        width: 100%;
        margin-left: -10px;
        margin-right: -10px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .item {
        width: 260px;
        height: 110px;
        border-radius: 10px;
        margin: 10px;
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .item:hover {
        box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 20px;
        transform: translateY(-1px) scale(1.02);
        transition: all 0.3s ease-in-out;
    }

    .part .item a {
        display: inline-block;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .part .item a img {
        width: 21px;
        height: 21px;
        border-radius: 100%;
        margin-right: 10px;
    }

    .part .item a h3 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        height: 30px;
    }
    .part .item a h3 span {
        width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .part .item a p {
        margin-left: 32px;
        color: #8f8f8f;
        font-size: 12px;
        height: 32px;
        line-height: 16px;
        margin-top: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .opeartion {
        height: 32px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 6px;
    }

    .hot-link {
        position: relative;
        left: 4px;
        top: 2px;
        --tw-text-opacity: 1;
        color: hsl(var(--p) / var(--tw-text-opacity));
        animation: 1.5s heart ease-in-out infinite;
    }
}
.link-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    line-height: 30px;
    cursor: pointer;
}

.icon {
    display: inline-block;
    margin-left: 8px;
    font-size: 12px;
    --tw-text-opacity: 1;
    color: hsl(var(--p) / var(--tw-text-opacity));
}

@keyframes heart {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>
