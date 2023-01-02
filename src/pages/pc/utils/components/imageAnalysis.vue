<template>
    <div class="tranfer-con">
        <div class="button-con">
            <button class="btn btn-secondary m-r-10 m-b-10" @click="clearPrompt">
                清空
                <Icon class="m-l-6" name="ant-design:delete-filled"></Icon>
            </button>
            <button class="btn btn-accent m-r-10 m-b-10" @click="exportPrompt">
                导出购物车
                <Icon class="m-l-6" name="clarity:shopping-cart-solid-badged"></Icon>
            </button>
            <button class="btn btn-primary m-r-10 m-b-10" @click="analysisImage">
                {{ loading ? '图片解析中' : '解析图片' }}
                <Icon v-if="loading" class="m-l-6" name="line-md:loading-twotone-loop"></Icon>
                <Icon v-else class="m-l-6" name="mdi:comment-edit"></Icon>
            </button>
        </div>

        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-upload
                    v-model:file-list="fileList"
                    class="upload-demo"
                    drag
                    :action="uploadImageApi"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                    list-type="picture"
                    :on-success="uploadSuccess"
                >
                    <i class="el-icon el-icon--upload">
                        <i-ep-upload-filled></i-ep-upload-filled>
                    </i>
                    <div class="el-upload__text">
                        拖动图片到当前区域 或
                        <em>点击上传</em>
                    </div>
                    <template #file="{ file }">
                        <div class="upload-image-list-item">
                            <span @click="changeCurFile(file)">
                                <img
                                    class="el-upload-list__item-thumbnail"
                                    :src="file.url"
                                    alt=""
                                />
                                <span class="m-l-6">{{ file.name }}</span>
                                <input
                                    class="checkbox m-l-10"
                                    type="checkbox"
                                    :checked="curRawFile === file.name"
                                />
                            </span>
                            <span class="el-upload-list__item-actions">
                                <span>
                                    <Icon
                                        name="material-symbols:image"
                                        size="28"
                                        @click="handlePictureCardPreview(file)"
                                    ></Icon>
                                </span>
                                <span class="m-l-10">
                                    <Icon
                                        name="ic:baseline-delete"
                                        size="28"
                                        @click="handlePictureRemove(file)"
                                    />
                                </span>
                            </span>
                        </div>
                    </template>
                    <template #tip>
                        <div class="el-upload__tip">jpg/png文件格式</div>
                    </template>
                </el-upload>
            </el-col>
        </el-row>

        <pc-area-title title="解析标签 ">
            <template #titleSide>
                <span style="font-size: 12px">(基于deepdanbooru解析)</span>
            </template>
        </pc-area-title>
        <div class="tags-con">
            <template v-for="(tag, tIndex) in promptList" :key="tIndex">
                <button class="btn btn-sm btn-secondary m-r-10 m-b-10">
                    <span>{{ tag.key?.toLowerCase() }}</span>
                    <div class="badge m-l-8">{{ tag.value }}</div>
                </button>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref } from 'vue';

import type { UploadProps, UploadUserFile, UploadFile, UploadFiles } from 'element-plus';
import { errorNotification } from '@/utils/nitification';

interface Promptitem {
    key?: string;
    value?: string;
}

interface HistoryItem {
    prompt?: string | undefined;
    time?: string | undefined;
}

const $emit = defineEmits(['setPreview']);

const key = 'prompt_history';
const { DanbooruApi } = useApi();
const config = useRuntimeConfig();
const { $store } = useNuxtApp();
const { setShop } = useShop();
const uploadImageApi = ref(`${config.public.FLASK_BASE_API}/danbooru/upload`);
const promptHistory: Ref<HistoryItem[]> = ref<HistoryItem[]>([]);
const promptHistoryLength: Ref<number> = ref(0);
const fileList = ref<UploadUserFile[]>([]);
const curRawFile = ref<string>('');
const promptList: Ref<Promptitem[]> = ref<Promptitem[]>([]);
const loading: Ref<boolean> = ref(false);

onMounted(() => {
    getData();
});

const changeCurFile = (file: UploadFile) => {
    curRawFile.value = file.name;
};

const uploadSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    const { code, data } = response;
    const config = useRuntimeConfig();
    const ip = config.public.IP_ADDRESS;
    if (code === 200) {
        const { file_name, file_path } = data;
        const len = uploadFiles.length;
        uploadFiles[len - 1].name = file_name;
        uploadFiles[len - 1].url = ip + file_path;
        fileList.value = uploadFiles;
    }
};

const analysisImage = async () => {
    if (!curRawFile.value) {
        return errorNotification('请选择需要解析的图片');
    }
    if (loading.value) return;
    loading.value = true;

    const result = await DanbooruApi.analysisImage({
        name: curRawFile.value,
    });
    loading.value = false;
    const { code, data } = result;
    if (code === 200) {
        const { tags } = data;
        promptList.value = tags;
    }
};

const clearPrompt = () => {
    curRawFile.value = '';
    fileList.value = [];
    promptList.value = [];
};

const exportPrompt = () => {
    const s = promptList.value.map((i: any) => i.key).join(', ');
    setShop(s);
};

const getData = () => {
    if ($store.get(key)) {
        promptHistory.value = JSON.parse($store.get(key));
        promptHistoryLength.value = promptHistory.value.length;
    }
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    $emit('setPreview', uploadFile.url);
};

const handlePictureRemove = (uploadFile: UploadFile) => {
    console.log(uploadFile);
    const i = fileList.value.findIndex((i: any) => {
        return i.name === uploadFile.name;
    });
    if (i >= 0) {
        fileList.value.splice(i, 1);
    }
};
</script>

<style lang="scss" scoped>
.tranfer-con {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 20px;
    padding-bottom: 20px;

    .el-textarea {
        width: 100%;
        margin-bottom: 20px;
    }
}

.button-con {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .animation-button {
        margin-bottom: 12px;
    }
}

:deep(.el-textarea) {
    border: 1px solid #f1f1f1;
    border-radius: 10px;
}

.history-item {
    padding: 20px;
    --tw-bg-opacity: 0.15;
    background-color: hsl(var(--p) / var(--tw-bg-opacity));
    box-shadow: hsl(var(--p) / 0.05) 0px 7px 29px 0px;
    border-radius: 10px;
    margin-bottom: 12px;

    > p {
        display: flex;
        align-items: center;
    }

    .history-button {
        margin-top: 12px;
    }
}

.tag-style {
    margin: 0 8px 8px 0px;
}

.no-data {
    color: gray;
}

.title-side {
    font-size: 18px;
    color: gray;
    margin-left: 10px;
}

:deep(.el-textarea) {
    border: 1px solid hsl(var(--a) / 0.8);
}

.upload-image-list-item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;

    > span {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
    }
}
</style>
