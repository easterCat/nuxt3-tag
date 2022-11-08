<template>
    <div class="tranfer-con">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <el-input v-model="textArea" type="textarea" placeholder="请输入promit,连词建议用下划线合并" :rows="10" clearable
                    show-word-limit maxlength="3000" />
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <el-input v-model="formatTextArea" type="textarea" placeholder="操作后的数据" :rows="10" />
            </el-col>
        </el-row>

        <div class="button-con">
            <el-button shadow="always" type="warning" size="large" @click="promptFormat">
                Prompt格式化
            </el-button>
            <el-button shadow="always" type="warning" size="large" @click="tagsAddComma">
                Prompt空格加逗号
            </el-button>
            <el-button shadow="always" type="warning" size="large" @click="mediumToCircle">
                Prompt中括号转圆括号
            </el-button>
            <el-button shadow="always" type="warning" size="large" @click="circleToMedium">
                Prompt圆括号转中括号
            </el-button>
            <el-button shadow="always" type="warning" size="large" @click="clearPrompt">
                一键清空
            </el-button>
        </div>

        <PcAreaTitle title="Prompt列表"></PcAreaTitle>

        <div class="tags-con" v-if="promptList && promptList?.length">
            <el-tag v-for="(tag, tIndex) in promptList" :key="tIndex" size="large" effect="dark" closable
                @close="removeTag(tIndex)" style="margin-right: 8px !important; margin-bottom: 8px !important">
                {{ tag }}
            </el-tag>
            <div>
                <el-button shadow="always" type="warning" size="large" @click="tagsReplacePrompt">
                    当前tag替换prompt
                </el-button>
            </div>
        </div>
        <div class="tags-con" v-else>
            <p class="no-data">暂无列表</p>
        </div>

        <PcAreaTitle title="Prompt记录"></PcAreaTitle>

        <div class="history-con" v-if="promptHistory && promptHistory?.length">
            <div class="history-item" v-for="(history, hIndex) in promptHistory" :key="hIndex">
                <p> {{ history }}</p>
                <div class="history-button">
                    <el-button type="info" icon="Check" @click="setHistory(history)">选择</el-button>
                    <el-button type="success" icon="DocumentCopy" @click="copyHistory(history)">复制</el-button>
                    <el-button type="danger" icon="Delete" @click="removeHistory(hIndex)">删除</el-button>
                </div>
            </div>
        </div>
        <div class="tags-con" v-else>
            <p class="no-data">暂无记录</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { onMounted, Ref } from "vue";
import { copyText } from 'vue3-clipboard'

// data
const key = "prompt_history";
const { $store } = useNuxtApp();
const textArea = ref("");
const formatTextArea = ref("");
const promptList: Ref<string[]> = ref<string[]>([]);
const promptHistory: Ref<string[]> = ref<string[]>([]);

// mounted
onMounted(() => {
    getData();
});

// methods
const promptFormat = () => {
    formatTextArea.value = textArea.value.replace(/\ /g, ", ");
    promptList.value = formatTextArea.value.split(",").map(i => i.trim());
    saveData(textArea.value);
};

const tagsAddComma = () => {
    formatTextArea.value = textArea.value.replace(/\ /g, ", ");
    promptList.value = formatTextArea.value.split(",").map(i => i.trim());
    saveData(textArea.value);
};

const mediumToCircle = () => {
    formatTextArea.value = textArea.value.replace(/\{/g, "(").replace(/\}/g, ")");
    promptList.value = formatTextArea.value.split(/\ /g).map(i => i.trim());
    saveData(textArea.value);
};

const circleToMedium = () => {
    formatTextArea.value = textArea.value.replace(/\(/g, "{").replace(/\)/g, "}");
    promptList.value = formatTextArea.value.split(/\ /g).map(i => i.trim());
    saveData(textArea.value);
};

const clearPrompt = () => {
    textArea.value = '';
    formatTextArea.value = '';
    promptList.value = []
};

const tagsReplacePrompt = () => {
    textArea.value = promptList.value.join(', ')
    formatTextArea.value = promptList.value.join(', ')
};

const saveData = (data: string) => {
    let arr = [];

    if (!data) {
        return ElMessage({
            showClose: true,
            message: '请输入prompt',
            type: 'warning'
        });
    }

    if ($store.get(key)) {
        arr = JSON.parse($store.get(key)) ?? [];
    }

    if (arr && arr.length && arr.length > 30) {
        return ElMessage({
            showClose: true,
            message: '数据超过30条',
            type: 'warning'
        });
    }

    if (!arr.includes(data)) {
        arr.push(data)
    }

    promptHistory.value = [...arr]
    $store.set("prompt_history", JSON.stringify(promptHistory.value));
};

const getData = () => {
    promptHistory.value = JSON.parse($store.get(key));
};

const removeTag = (index: number) => {
    promptList.value.splice(index, 1)
}

const setHistory = (data: string) => {
    textArea.value = data;
}

const removeHistory = (index: number) => {
    let arr = JSON.parse($store.get(key)) ?? [];
    arr.splice(index, 1);
    promptHistory.value = [...arr]
    $store.set("prompt_history", JSON.stringify(promptHistory.value));
}

const copyHistory = (data: string) => {
    copyText(data, undefined, (error: any, event: any) => {
        if (error) {
            alert('Can not copy')
            console.log(error)
        } else {
            alert('Copied')
            console.log(event)
        }
    })
}
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
}

:deep(.el-textarea) {
    border: 1px solid #f1f1f1;
    border-radius: 10px;

}

.history-item {
    padding: 20px;
    background-color: #fee4cb;
    color: gray;
    border-radius: 10px;
    margin-bottom: 10px;

    .history-button {
        margin-top: 10px;
    }
}

.no-data {
    color: gray;
}
</style>
