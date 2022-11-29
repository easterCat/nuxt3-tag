<template>
    <NuxtLayout>
        <div class="links-page page">
            <AppHeader />
            <div class="content">
                <div class="link-con">
                    <template v-if="showAddBtn">
                        <PcAnimationButton
                            :buttonStyle="1"
                            buttonColor="245, 108, 108"
                            buttonAngel="145deg"
                            buttonWidth="90px"
                            buttonText="新增链接"
                            @submit="addNewLink"
                        ></PcAnimationButton>
                    </template>
                    <el-dialog
                        v-model="showDialog"
                        :title="operation === 'add' ? '新增' : '编辑'"
                        width="600px"
                        destroy-on-close
                        :before-close="handleDialogClose"
                    >
                        <div>
                            <el-form label-width="110px" ref="ruleFormRef">
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

                    <pc-link-list
                        ref="childRef"
                        @editEvent="(data:any)=>{setEditLinkForm(data)}"
                        @deleteEvent="(id:any)=>{deleteLink(id)}"
                    ></pc-link-list>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { Ref } from 'vue';

const { LinkApi } = useApi();
const showAddBtn = ref(false);
const showDialog = ref(false);
const operation = ref('');
const childRef: any = ref(null);
const ruleFormRef = ref<FormInstance>();

const name = ref('');
const href = ref('');
const type = ref('');
const hot = ref(false);
const id: Ref<number | null> = ref(null);

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

const setEditLinkForm = (data: any) => {
    name.value = data.name;
    href.value = data.href;
    type.value = data.link || data.link_type;
    hot.value = data.hot;
    id.value = data.id;
    showDialog.value = true;
    operation.value = 'edit';
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
            childRef.value.refresh();
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
            childRef.value.refresh();
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
            childRef.value.refresh();
        });
        return ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success',
        });
    }
};

onMounted(() => {
    const edit = localStorage.getItem('edit');
    if (edit) showAddBtn.value = true;
});
</script>

<style lang="scss" scoped>
.link-con {
    width: 100%;
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
}
</style>
