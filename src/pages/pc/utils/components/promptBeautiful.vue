<template>
    <div class="tranfer-con">
        <app-animate name="fadeIn">
            <div class="button-con">
                <button class="btn btn-accent m-r-10 m-b-10" @click="promptFormat">格式化</button>
                <button class="btn btn-accent m-r-10 m-b-10" @click="clearPrompt">清空</button>
                <button class="btn btn-accent m-r-10 m-b-10" @click="mediumToCircle">
                    大括号转圆括号
                </button>
                <button class="btn btn-accent m-r-10 m-b-10" @click="circleToMedium">
                    圆括号转大括号
                </button>
                <button class="btn btn-accent m-r-10 m-b-10" @click="addHighQualityPrompt">
                    起手式
                </button>
                <button class="btn btn-accent m-r-10 m-b-10" @click="shopImport">购物车导入</button>
                <button class="btn btn-accent m-r-10 m-b-10" @click="exportShop">导出购物车</button>
                <button class="btn btn-secondary m-r-10 m-b-10" @click="tagsAddComma">
                    空格加逗号(用于danbooru)
                </button>
                <button class="btn btn-secondary m-b-10" @click="promotRemoveLine">
                    去除下划线(用于danbooru)
                </button>
            </div>
        </app-animate>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <app-animate name="fadeIn">
                    <el-input
                        v-model="textArea"
                        type="textarea"
                        placeholder="请输入promit"
                        :rows="12"
                        clearable
                        :autosize="{ minRows: 12 }"
                        show-word-limit
                        maxlength="3000"
                    />
                </app-animate>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <app-animate name="fadeIn">
                    <el-input
                        v-model="formatTextArea"
                        type="textarea"
                        placeholder="输出prompt"
                        :rows="12"
                        :autosize="{ minRows: 12 }"
                        readonly
                        show-word-limit
                        maxlength="3000"
                        @click="copyFormatPrompt"
                    />
                </app-animate>
            </el-col>
        </el-row>

        <pc-area-title title="Prompt列表"></pc-area-title>
        <div v-if="promptList && promptList?.length" class="tags-con">
            <div class="m-b-10">
                <button class="btn btn-md btn-accent" @click="tagsReplacePrompt">
                    当前tags替换prompt
                </button>
            </div>
            <template v-for="(tag, tIndex) in promptList" :key="tIndex">
                <app-animate name="fadeIn">
                    <button
                        class="btn btn-sm btn-secondary m-r-10 m-b-10"
                        @close="removeTag(tIndex)"
                    >
                        {{ tag }}
                    </button>
                </app-animate>
            </template>
        </div>

        <div v-else class="tags-con">
            <p class="no-data">暂无列表</p>
        </div>

        <pc-area-title title="Prompt记录">
            <template #titleSide>
                <span class="title-side">总数:{{ promptHistoryLength }}条</span>
            </template>
        </pc-area-title>

        <div v-if="promptHistory && promptHistory?.length" class="history-con">
            <app-animate name="fadeIn">
                <div class="button-con">
                    <button class="btn btn-md btn-accent m-b-15" @click="clearHistory">
                        清空历史
                    </button>
                </div>
            </app-animate>
            <template v-for="(history, hIndex) in promptHistory" :key="hIndex">
                <app-animate name="fadeIn">
                    <div class="history-item">
                        <p style="font-weight: bold; margin-bottom: 4px">
                            <i-ep-opportunity
                                v-if="hIndex === 0"
                                style="color: #67c23a; font-size: 12px"
                            ></i-ep-opportunity>
                            <span>{{ history?.time }}</span>
                        </p>
                        <p>{{ history?.prompt }}</p>
                        <div class="history-button">
                            <button
                                class="btn btn-sm btn-primary m-r-10"
                                @click="setHistory(history?.prompt)"
                            >
                                <slot name="icon"><i-ep-check class="m-r-4"></i-ep-check></slot>
                                选择
                            </button>
                            <button
                                class="btn btn-sm btn-accent m-r-10"
                                @click="copy(history?.prompt)"
                            >
                                <slot name="icon">
                                    <i-ep-document-copy class="m-r-4"></i-ep-document-copy>
                                </slot>
                                复制
                            </button>
                            <button class="btn btn-sm btn-secondary" @click="removeHistory(hIndex)">
                                <slot name="icon"><i-ep-delete class="m-r-4"></i-ep-delete></slot>
                                删除
                            </button>
                        </div>
                    </div>
                </app-animate>
            </template>
        </div>
        <div v-else class="tags-con">
            <p class="no-data">暂无记录</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref } from 'vue';
import dayjs from 'dayjs';

interface HistoryItem {
    prompt?: string | undefined;
    time?: string | undefined;
}

// data
const key = 'prompt_history';
const { $store } = useNuxtApp();
const textArea: Ref<string> = ref('');
const formatTextArea: Ref<string> = ref('');
const promptList: Ref<string[]> = ref<string[]>([]);
const promptHistory: Ref<HistoryItem[]> = ref<HistoryItem[]>([]);
const promptHistoryLength: Ref<number> = ref(0);
const { copy } = useCopy();
const { shop, setShop } = useShop();

// mounted
onMounted(() => {
    getData();
});

// methods
const promptFormat = () => {
    formatTextArea.value = textArea.value.replace(/\s*(，+|,+)\s*/g, ', ');
    promptList.value = formatTextArea.value
        .split(',')
        .filter((i: any) => !!i)
        .map((i: any) => i.trim());
    saveData(textArea.value);
};

const tagsAddComma = () => {
    formatTextArea.value = textArea.value.replace(/\s+/g, ', ');
    promptList.value = formatTextArea.value
        .split(',')
        .filter((i: any) => !!i)
        .map((i: any) => i.trim());
    saveData(textArea.value);
};

const promotRemoveLine = () => {
    formatTextArea.value = textArea.value.replace(/[-_]+/g, ' ');
    promptList.value = formatTextArea.value
        .split(',')
        .filter((i: any) => !!i)
        .map((i: any) => i.trim());
    saveData(textArea.value);
};

const mediumToCircle = () => {
    formatTextArea.value = textArea.value.replace(/\{/g, '(').replace(/\}/g, ')');
    promptList.value = formatTextArea.value
        .split(/,/g)
        .filter((i: any) => !!i)
        .map((i: any) => i.trim());
    saveData(textArea.value);
};

const circleToMedium = () => {
    formatTextArea.value = textArea.value.replace(/\(/g, '{').replace(/\)/g, '}');
    promptList.value = formatTextArea.value
        .split(/,/g)
        .filter((i: any) => !!i)
        .map((i: any) => i.trim());
    saveData(textArea.value);
};

const shopImport = () => {
    textArea.value = shop.value;
    formatTextArea.value = textArea.value.replace(/\s*(，+|,+)\s*/g, ',');
    promptList.value = formatTextArea.value
        .split(',')
        .filter((i: any) => !!i)
        .map((i: any) => i.trim());
    saveData(textArea.value);
};

const exportShop = () => {
    setShop(formatTextArea.value);
};

const clearHistory = () => {
    removeAllHistory();
    promptHistory.value = [];
};

const addHighQualityPrompt = () => {
    if (textArea.value.includes('masterpiece')) {
        return ElMessage({
            showClose: true,
            message: '请不要重复添加',
            type: 'warning',
        });
    } else {
        textArea.value = `masterpiece, best quality, ${textArea.value}`;
        formatTextArea.value = textArea.value.replace(/\s*(，+|,+)\s*/g, ',');
        promptList.value = formatTextArea.value
            .split(',')
            .filter((i: any) => !!i)
            .map((i: any) => i.trim());
        saveData(textArea.value);
    }
};

const clearPrompt = () => {
    textArea.value = '';
    formatTextArea.value = '';
    promptList.value = [];
};

const tagsReplacePrompt = () => {
    textArea.value = promptList.value.join(', ');
    formatTextArea.value = promptList.value.join(', ');
};

const copyFormatPrompt = () => {
    copy(formatTextArea.value);
};

const saveData = (data: string) => {
    let arr = [];

    if (!data) {
        return ElMessage({
            showClose: true,
            message: '请输入prompt',
            type: 'warning',
        });
    }

    if ($store.get(key)) {
        arr = JSON.parse($store.get(key)) ?? [];
    }

    const find = arr.find((i: any) => i.prompt === data);

    if (find) {
        return;
    }

    if (arr && arr.length && arr.length > 100) {
        return ElMessage({
            showClose: true,
            message: '数据超过100条',
            type: 'warning',
        });
    }

    if (!arr.includes(data)) {
        arr.unshift({ prompt: data, time: dayjs().format('YYYY年MM月DD日 HH时mm分ss秒') });
    }

    promptHistory.value = [...arr];
    promptHistoryLength.value = promptHistory.value.length;
    $store.set(key, JSON.stringify(promptHistory.value));
};

const getData = () => {
    if ($store.get(key)) {
        promptHistory.value = JSON.parse($store.get(key));
        promptHistoryLength.value = promptHistory.value.length;
    }
};

const removeTag = (index: number) => {
    promptList.value.splice(index, 1);
};

const setHistory = (data: any) => {
    textArea.value = data;
};

const removeHistory = (index: number) => {
    const arr = JSON.parse($store.get(key)) ?? [];
    arr.splice(index, 1);
    promptHistory.value = [...arr];
    promptHistoryLength.value = 0;
    $store.set(key, JSON.stringify(promptHistory.value));
};

const removeAllHistory = () => {
    $store.set(key, '');
};
</script>

<style lang="scss" scoped>
.tranfer-con {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 20px;

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
    --tw-bg-opacity: 0.7;
    background-color: hsl(var(--b3, var(--b2)) / var(--tw-bg-opacity));
    color: gray;
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
</style>
